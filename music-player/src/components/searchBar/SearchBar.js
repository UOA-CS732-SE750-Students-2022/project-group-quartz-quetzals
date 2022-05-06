import React, {useCallback, useState} from "react";
import "./SearchBar.css"
import {SearchOutlined} from '@ant-design/icons';
import debounce from 'lodash.debounce';
import axios from "axios";
import {Input} from "antd";

function SearchBar({placeholder}) {
    const [filteredData, setFilteredData] = useState([]);
    const [wordEntered, setWordEntered] = useState("");

    const HandleFilter = (event) => {
        const input = event.target.value;
        setWordEntered(input);

        if (input === "") {
            // If searchWord is empty don't show result.
            setFilteredData([]);
        } else {
            const response = axios.get('/search', {
                params: {
                    keywords: input,
                }
            }).then(function (response) {
                if (response.data.result.songCount > 0) {
                    // Songs found
                    console.log(response.data.result.songs);
                    setFilteredData(response.data.result.songs);
                } else {
                    setFilteredData([]);
                }
            });

        }
    }

    const debounceHandleFilter = useCallback(
        debounce(HandleFilter, 300)
        , []);

    return (
        <div className="search">
            <div className="searchInputs">
                <Input placeholder={placeholder}
                       onChange={debounceHandleFilter}
                />
                <div className="searchIcon">
                    <SearchOutlined/>
                </div>
            </div>
            {filteredData.length !== 0 && (
                <div className="dataResult">
                    {filteredData.map((value, key) => {
                        return (
                            <a className="dataItem" href={"https://music.163.com/#/song?id=" + value.id} key={key}>
                                <p> {value.name} </p>
                                <p> {value.artists.map((value, key) => [
                                    key > 0 && ", ",
                                    value.name
                                ])} </p>
                                <p> {value.album.name} </p>
                            </a>
                        );
                    })
                    }
                </div>
            )}
        </div>
    );
}

export default SearchBar;
