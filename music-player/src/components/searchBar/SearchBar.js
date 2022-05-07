import React, {useEffect, useState} from 'react';
import 'antd/dist/antd.min.css';
import { Select } from 'antd';
import axios from "axios";
import { getSongPlay, getSongUrl } from "../../common/service/album";
import { changeSongListAction } from "../../pages/mainContent/store/actionCreator";
import { useDispatch } from "react-redux";

const Option = Select;
let timeout;

export default function SearchBar(info) {
    const [value, setValue] = useState(undefined);
    const [data, setData] = useState([]);
    const dispatch = useDispatch();

    function handleFilter(value, callback) {
        if (timeout) {
            clearTimeout(timeout);
            timeout = null;
        }

        function getValue() {
            // Get search result from netease search API.
            axios.get('https://netease-cloud-music-bn6p2obor-adamliu327.vercel.app/search', {
                params: {
                    keywords: value,
                }
            }).then(function (response) {
                let data = []
                if (response.data.result.songCount > 0) {
                    // Songs found
                    data = response.data.result.songs;
                } else {
                    // If no song found set result to empty array.
                    data = [];
                }
                // Set result.
                setData(data);
            });
        }
        // Debounce
        timeout = setTimeout(getValue, 300);
    }

    function handleSearch(value) {
        setValue(value);
        if (value) {
            // If entered value is not empty, search for result.
            handleFilter(value, data => this.setState({ data }));
        } else {
            // No entered value so result set empty.
            setData([]);
        }
    }


    async function handleChange (value) {
        // Push selected songs into top of playlist.
        const res = await getSongPlay(value)
        const {name} = res.songs[0]
        const {picUrl} = res.songs[0].al
        const url = await getSongUrl(res.songs[0].id)
        dispatch(changeSongListAction({...url.data[0],name,picUrl}))
    }


    return(
        <div className="SearchBar">
            <Select
                showSearch
                value={value}
                placeholder={info.placeholder}
                style={info.style}
                defaultActiveFirstOption={false}
                showArrow={false}
                filterOption={false}
                onSearch={handleSearch}
                onChange={handleChange}
                notFoundContent={null}
            >
                {data.map(d =>
                    <Option value={d.id}>
                        {d.name} - {d.artists.map((value, key) => [
                        key > 0 && ", ",
                        value.name
                    ])}
                    </Option>)}
            </Select>
        </div>
    )
}

