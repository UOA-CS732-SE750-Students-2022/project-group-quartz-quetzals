import "./rankList.scss"
import React from 'react';
import {getRankingList} from "../../common/service/ranking";
import {useEffect, useState} from "react";
import SideBar from "../sideBar/SideBar";

function RankList(prop){
    let typeid  = prop.typeid;
    const [rank,setRank] = useState([])
    async function getData(){
      let _rank = await getRankingList(typeid)
      console.log(_rank)
      setRank(_rank && _rank.playlist.tracks)
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
                  UK
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
                        <div className="song">{item.name}</div>
                        <div className="icon iconfont">
                          <div>&#xe624;</div>
                          <div>&#xe600;</div>
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
