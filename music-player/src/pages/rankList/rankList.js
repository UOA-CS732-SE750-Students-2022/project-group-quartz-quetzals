import "./rankList.scss"
import React from 'react';
import {getRankingList} from "../../common/service/ranking";
import {useEffect, useState} from "react";
import SideBar from "../sideBar/SideBar";
import {useDispatch} from "react-redux";
import {getSongPlay, getSongUrl} from "../../common/service/album";
import {changeSongListAction, changeSongListNextAction} from "../mainContent/store/actionCreator";

function RankList(prop){
  let typeid  = prop.typeid;
  const [rank,setRank] = useState([])
  async function getData(){
    let _rank = await getRankingList(typeid)
    setRank(_rank && _rank.playlist.tracks)
  }
  const list = {
    180106:'UK',
    60198:'Billboard',
    3812895:'Beatport'
  }

  let dispatch;
  dispatch = useDispatch();
    async function playSong(id){
      const res = await getSongPlay(id)
      const {name} = res.songs[0]
      const {picUrl} = res.songs[0].al
      const url = await getSongUrl(id)
      dispatch(changeSongListAction({...url.data[0],name,picUrl}))
    }
    async function addSong(id){
      const res = await getSongPlay(id)
      const {name} = res.songs[0]
      const {picUrl} = res.songs[0].al
      const url = await getSongUrl(id)
      dispatch(changeSongListNextAction({...url.data[0],name,picUrl}))
    }
    useEffect(()=>{
      getData();
    },[typeid])


    return(
        <div className="main-content-wrapper">
            <div className="list">
              <div className="title-box">
                <div className="title-img"/>
                <div className="title-name">
                  {list[typeid]}
                  <div className="iconfont">
                    <span className="play-icon">&#xe624;</span>
                    <span className="play-icon">&#xe600;</span>
                  </div>
                </div>
              </div>
              <div className="rank-list-box">
                {rank?.map((item,index)=>{
                  return(
                      <div className="rank-item" key={index}>
                        <div className="rank">{index+1}</div>
                        <div className="song" onClick={()=>playSong(item.id)}>{item.name}</div>
                        <div className="icon iconfont">
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
        </div>
    );
}
export default RankList;
