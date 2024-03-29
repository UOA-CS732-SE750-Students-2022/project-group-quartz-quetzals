import "./rankList.scss"
import React from 'react';
import {getRankingList} from "../../common/service/ranking";
import {useEffect, useState} from "react";
import SideBar from "../sideBar/SideBar";
import {useDispatch} from "react-redux";
import {getSongPlay, getSongUrl} from "../../common/service/album";
import {changeSongListAction, changeSongListNextAction} from "../mainContent/store/actionCreator";
import {Avatar, BackTop, notification, Spin} from "antd";

import p_3812895 from "../../assets/rank_pic/3812895.jpg";
import p_60198 from "../../assets/rank_pic/60198.jpg";
import p_2809577409 from "../../assets/rank_pic/2809577409.jpg";
import p_180106 from "../../assets/rank_pic/180106.jpg"


function RankList(prop){
  let typeid  = prop.typeid;
  const [rank,setRank] = useState([])
  async function getData(){
    let _rank = await getRankingList(typeid)
    setRank(_rank && _rank.playlist.tracks)
  }
  const [loading,setLoading] = useState(true)
  const list = {
    2809577409:'New!',
    180106:'UK',
    60198:'Billboard',
    3812895:'Beatport'
  }

  const img = {
    2809577409:p_2809577409,
    180106:p_180106,
    60198:p_60198,
    3812895:p_3812895
  }


  let dispatch;
  dispatch = useDispatch();
    async function playSong(id){
      const res = await getSongPlay(id)
      const {name,ar} = res.songs[0]
      const {picUrl} = res.songs[0].al
      const url = await getSongUrl(id)
      dispatch(changeSongListAction({...url.data[0],name,picUrl,ar}))
    }
    async function addSong(id){
      const res = await getSongPlay(id)
      const {name,ar} = res.songs[0]
      const {picUrl} = res.songs[0].al
      const url = await getSongUrl(id)
      dispatch(changeSongListNextAction({...url.data[0],name,picUrl,ar}))
      openNotification(name,picUrl,ar)
    }
  const openNotification = (name,picUrl,ar) => {
    const img = (
        <div >
          {name} <br/>by {ar.map((value, key) =>  [key > 0 && ", ", value.name])}<br/>
          <Avatar shape="square" size={64} src={picUrl}/>
        </div>
    );
    notification.open({
      message: `Add songs to playlist`,
      description:
      img,
    });
  };
    useEffect(()=>{
      getData();
      window.scrollTo(0, 0);
    },[typeid])
  const style = {
    height: 40,
    width: 40,
    lineHeight: '40px',
    borderRadius: '50%',
    border: '1px solid #666',
    color: '#666',
    backgroundColor:'#fff',
    textAlign: 'center',
    fontSize: 30,
    fontWeight:'bold'
  };


    return(
        <Spin spinning={rank.length===0}>
        <div className="main-content-wrapper">
            <div className="list">
              <div className="title-box">
                <div className="title-img"><img width='80' height='80' src={img[typeid]}/></div>

                <div className="title-name">
                  {list[typeid]}
                  <div className="iconfont">
                    {/*<span className="play-icon">&#xe624;</span>*/}
                    {/*<span className="play-icon">&#xe600;</span>*/}
                  </div>
                </div>
              </div>
              <div className="rank-list-box">
                {rank?.map((item,index)=>{
                  return(
                      <div className="rank-item" key={index}>
                        <div className="rank">{index+1}</div>
                        <div className="song1" onClick={()=>playSong(item.id)}>{item.name}</div>
                        <div className="icon1 iconfont">
                          <div onClick={()=>playSong(item.id)}>&#xe624;</div>
                          <div onClick={()=>addSong(item.id)}>&#xe600;</div>
                        </div>
                      </div>
                  )
                })}
              </div>
            </div>
            <div className="right-side">
              <SideBar/>
            </div>
          <BackTop>
            <div className="iconfont" style={style}>&#xe664;</div>
          </BackTop>
        </div>
        </Spin>
    );
}
export default RankList;
