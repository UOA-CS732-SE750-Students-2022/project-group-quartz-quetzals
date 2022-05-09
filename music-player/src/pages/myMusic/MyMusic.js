import React from 'react';
import {useEffect} from "react";
import "./MyMusic.scss";
import {Button, Layout, List} from 'antd';
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {deleteSongAction} from "../mainContent/store/actionCreator";
import Title from "../mainContent/components/title/Title"


function MyMusic(){
    const { Content } = Layout;
    const { songList } = useSelector(
        (state) => ({
          songList: state.getIn(["mainContent", "songList"]),
        }),
        shallowEqual
    );

    const dispatch = useDispatch()
    function deleteMusic(index){
      dispatch(deleteSongAction(index))
    }
    useEffect(()=>{
      window.scrollTo(0, 0);
    },[])
    return(
        <div className="my-music-wrapper">
            <Layout className='main-wrapper'>
                <Content className='playlist-content-container'>
                    <Title title={<h2 style={{color:'#666'}}>My music</h2>}/>
                        <List
                            itemLayout="horizontal"
                            dataSource={songList}
                            renderItem={(item,index) => (
                                <List.Item
                                    actions={[<Button disabled={index === 0} onClick={()=>deleteMusic(index)} danger type="text">Delete</Button>]}
                                    className='playlist-item'>
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
