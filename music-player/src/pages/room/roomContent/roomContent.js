import React from 'react';
import img5 from "../../../assets/image/5.png";
import "../roomPage.scss";
import "../../sideBar/SideBar.scss";
import {Layout, List, Avatar} from 'antd';
import { FastBackwardOutlined, PlayCircleOutlined, FastForwardOutlined} from '@ant-design/icons';
import Radio from "./Radio";

function RoomContent(){
    const { Sider, Content } = Layout;
    const songList = [
        {song:'tgsrg rfgsrt',singer:"rgrhbajbhawrhbg",img:img5},
        {song:'stgs sthtrj',singer:"hsrthstg",img:img5},
        {song:'yjdy sthrtwjy',singer:"strraehhg",img:img5},
        {song:'dryjh srthyrjj',singer:"hrtydysrhaeth",img:img5}
    ]
    const joinedUsers = [
        { title: 'fjhagbgarg'},
        { title: 'aethath'},
        { title: 'aereahr'},
        {title: 'aerhsthta'}
    ];
    const curPlaying = null;
    return(
        <div>
            <Layout>
                <Content className='play-function-wrapper'>
                    <div className='play-function-bar'>
                        <div className='new-album'>
                            <div className='new-album-item'>
                                <div className='music-content'>
                                    <div className='box'>
                                        <img src={img5} alt=""/>
                                    </div>
                                    <div className="iconfont">
                                        <Radio />
                                        <div className='play-button-groups'>
                                            <FastBackwardOutlined className='play-button'/>
                                            <PlayCircleOutlined className='play-button'/>
                                            <FastForwardOutlined className='play-button'/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Content>
                <Layout className='content-wrapper'>
                    <Content className='playlist-content-container'>
                        {/* <div className="playlist-side-bar">
                                <h1>Playlist:</h1>
                                {songList.map((item,index)=>{
                                    return(
                                    <div className="side-bar-content" key={index}>
                                        <div className="side-bar-item" >
                                        <div className="box">
                                            <img src={item.img} alt=""/>
                                        </div>
                                        <div className="side-text">
                                            <p><b>{item.name}</b></p>
                                            <p>{item.name1}</p>
                                        </div>
                                        </div>
                                    </div>
                                    )
                                }
                                )}
                            </div> */}
                          <List
                                itemLayout="horizontal"
                                dataSource={songList}
                                renderItem={item => (
                                    <List.Item className='playlist-item'>
                                        <List.Item.Meta
                                        avatar={<img className='song-img' src={item.img} alt="" />}
                                        title={<a>{item.song} - {item.singer}</a>}
                                        />
                                    </List.Item>
                                )}
                            />
                    </Content>
                    <Sider className='user-list-container'>
                        <h1>Online Users:</h1>
                        <List
                            itemLaysout="horizontal"
                            dataSource={joinedUsers}
                            renderItem={item => (
                            <List.Item className='user-item'>
                                <List.Item.Meta
                                avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                                title={<a>{item.title}</a>}
                                />
                            </List.Item>
                            )}
                        />
                    </Sider>
                </Layout>
            </Layout>
        </div>
    );
}
export default RoomContent;
