import React from 'react';
import {useEffect} from "react";
import "./MyMusic.scss";
import {Layout, List} from 'antd';
import {shallowEqual, useSelector} from "react-redux";

function MyMusic(){
    const { Content } = Layout;
    const { songList } = useSelector(
        (state) => ({
          songList: state.getIn(["mainContent", "songList"]),
        }),
        shallowEqual
    );
    useEffect(()=>{
        // getData().then(()=>{
        //   setLoading(false)
        // })
    },[])
    return(
        <div className="my-music-wrapper">
            <Layout className='main-wrapper'>
                <Content className='playlist-content-container'>
                    <h1 style={{fontSize:30}}>My Music</h1>
                    <p style={{fontSize:15}}>My playlist:</p>
                        <List
                            itemLayout="horizontal"
                            dataSource={songList}
                            renderItem={(item,index) => (
                                <List.Item className='playlist-item'>
                                    <List.Item.Meta
                                    avatar={<img className='song-img' src={item.picUrl} alt="" />}
                                    title={<a>{item.name} - {item.ar.map((value, key) => [ key > 0 && ", ", value.name ])}</a>}
                                    key={index}
                                    />
                                </List.Item>
                            )}
                        />
                </Content>
            </Layout>
        </div>
    );
}
export default MyMusic;
