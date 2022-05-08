import React from 'react';
import {useEffect, useState} from "react";

import "./MyMusic.scss";
import "../sideBar/SideBar.scss";
import "axios";
import {Layout, List, Avatar} from 'antd';
import { FastForwardFilled, CaretRightFilled, FastBackwardFilled } from '@ant-design/icons';
import {getRankingList} from "../../common/service/ranking";
import { getSongUrl } from '../../common/service/album';

function MyMusic(){
    // var i = 0;
    const { Content } = Layout;
    // const songList = [];
    // const songListID = 180106;
    // axios.get('https://netease-cloud-music-bn6p2obor-adamliu327.vercel.app/playlist/detail?id='+songListID)
    // .then(function(response){
    //     console.log(response.playlist.tracks);
    //     songList = response.playlist.tracks;
    // })
    // const curPlaying = curPlaying;
    const [songList,setSongList] = useState([])
    const [loading,setLoading] = useState([])
    async function getData(){
        setLoading(true)
        let songList = await getRankingList(180106)
        setSongList(songList && songList.playlist.tracks.slice(0, 10))
    }
    useEffect(()=>{
        getData().then(()=>{
          setLoading(false)
        })
      },[])
    // const curPlaying = getSongUrl(songList[i].id)
    // function changeSong(songID) {
    //     curPlaying = getSongUrl(songID)
    // }
    // function nextSong() {
    //     i++
    //     curPlaying = getSongUrl(songList[i].id)
    // }
    // function previousSong() {
    //     i--
    //     curPlaying = getSongUrl(songList[i].id)
    // }
    // function play() {
    //     return null
    // }
    return(
        <div>
            <Layout className='main-wrapper'>
                {/* <Content className='play-function-wrapper'>
                    <div className='play-function-bar'>
                        <div className='new-album'>
                            <div className='new-album-item'>
                                <div className='music-content'>
                                    <div className='box'>
                                        <img src={curPlaying.id} alt=""/>
                                    </div>
                                    <div className="iconfont">
                                        <h1>{curPlaying.name}</h1>
                                        <div className='play-button-groups'>
                                            <FastBackwardFilled className='play-button' onClick={previousSong}/>
                                            <CaretRightFilled className='play-button' onClick={play}/>
                                            <FastForwardFilled className='play-button' onClick={nextSong}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Content> */}

                <Content className='playlist-content-container'>
                    <h1 style={{fontSize:30}}>Favourite</h1>
                    <p style={{fontSize:15}}>10 songs in your playlist:</p>
                        <List
                            itemLayout="horizontal"
                            dataSource={songList}
                            renderItem={item => (
                                <List.Item className='playlist-item'>
                                    <List.Item.Meta
                                    avatar={<img className='song-img' src={item.al.picUrl} alt="" />}
                                    title={<a>{item.name} - {item.ar.map((value, key) => [ key > 0 && ", ", value.name ])}</a>}
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
