import React from 'react';
import 'antd/dist/antd.min.css';
import { Select } from 'antd';
import axios from "axios";

const { Option } = Select;

let timeout;

function handleFilter(value, callback) {
    if (timeout) {
        clearTimeout(timeout);
        timeout = null;
    }

    function getValue() {
        axios.get('https://netease-cloud-music-bn6p2obor-adamliu327.vercel.app/search', {
            params: {
                keywords: value,
            }
        }).then(function (response) {
            let data = []
            if (response.data.result.songCount > 0) {
                // Songs found
                console.log(response.data.result.songs);
                data = response.data.result.songs;
            } else {
                data = [];
            }
            callback(data);
        });
    }
    timeout = setTimeout(getValue, 300);
}

class AntSearchBar extends React.Component {
    state = {
        data: [],
        value: undefined,
    };

    handleSearch = value => {
        if (value) {
            handleFilter(value, data => this.setState({ data }));
        } else {
            this.setState({ data: [] });
        }
    };

    handleChange = value => {
        this.setState({ value });
        // 加你想要的操作

        // window.location.replace(value);
        this.setState({value: ""})
    };

    render() {
        const options = this.state.data.map(d =>
            <Option key={"https://music.163.com/#/song?id=" + d.id}>
                {d.name} - {d.artists.map((value, key) => [
                    key > 0 && ", ",
                    value.name
                ])}
            </Option>);
        return (
            <Select
                showSearch
                value={this.state.value}
                placeholder={this.props.placeholder}
                style={this.props.style}
                defaultActiveFirstOption={false}
                showArrow={false}
                filterOption={false}
                onSearch={this.handleSearch}
                onChange={this.handleChange}
                notFoundContent={null}
            >
                {options}
            </Select>
        );
    }
}

export default () => <AntSearchBar placeholder="input search text" style={{ width: 300 }} />;
