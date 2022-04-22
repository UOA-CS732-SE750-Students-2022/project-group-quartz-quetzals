import "./MainContent.scss"
import Title from "./components/title/Title";
import SideBar from "../sideBar/SideBar";
import {useEffect, useState} from "react";

import {getAlbumListAction, getArtistListAction,getRankingAction} from "./store/actionCreator"

import { useDispatch, useSelector, shallowEqual } from "react-redux";


function MainContent(){
  const {
    albumList,
    artistList,
    ranking1,
    ranking2,
    ranking3,
  } = useSelector(
      (state) => ({
        albumList: state.getIn(["mainContent", "albumList"]),
        artistList:state.getIn(["mainContent", "artistList"]),
        ranking1:state.getIn(["mainContent", "ranking1"]),
        ranking2:state.getIn(["mainContent", "ranking2"]),
        ranking3:state.getIn(["mainContent", "ranking3"]),
      }),
      shallowEqual
  );
  const album = albumList || [];
  const artist = artistList || [];
  const rank1 = ranking1.tracks || [];
  const rank2 = ranking2.tracks || [];
  const rank3 = ranking3.tracks || [];
  const dispatch = useDispatch();

  function changeTab(index){
    dispatch(getArtistListAction(index,6))
  }
  useEffect(() => {
    dispatch(getAlbumListAction());
    dispatch(getArtistListAction(1,6))
    dispatch(getRankingAction(3778678));
    dispatch(getRankingAction(3779629));
    dispatch(getRankingAction(19723756));
  }, [dispatch]);


  const navList= [
    {name:'Male Singer',type: 1,to:''},
    {name:'Female Singer',type: 2,to:''},
    {name:'Band',type: 3, to:''},
  ]
  // const artist = [
  //   {name:'Charlie Puth',img:img5},
  //   {name:'Charlie Puth',img:img1},
  //   {name:'Charlie Puth',img:img1},
  //   {name:'Charlie Puth',img:img5},
  //   {name:'Charlie Puth',img:img5},
  //   {name:'Charlie Puth',img:img5},
  // ]
  // const albumList=[
  //   {name:'Charlie Puth',img:img5},
  //   {name:'Charlie Puth',img:img1},
  //   {name:'Charlie Puth',img:img1},
  //   {name:'Charlie Puth',img:img5},
  //   {name:'Charlie Puth',img:img5},
  // ]
  const rankList =[
    {rank:1,song:'Charlie Puth Charlie Puth 11111111'},
    {rank:2,song:'Charlie Puth Charlie Puth'},
    {rank:3,song:'Charlie Puth Charlie Puth'},
    {rank:4,song:'Charlie Puth Charlie Puth'},
    {rank:5,song:'Charlie Puth Charlie Puth'},
    {rank:6,song:'Charlie Puth Charlie Puth'},
    {rank:7,song:'Charlie Puth Charlie Puth'},
    {rank:8,song:'Charlie Puth Charlie Puth'},
    {rank:9,song:'Charlie Puth Charlie Puth'},
    {rank:10,song:'Charlie Puth Charlie Puth'},
  ]
  return(
      <div className="main-content-wrapper">
        <div className="left-side">
          <Title navList={navList}  changeTab={changeTab}  title="Popular Singer"/>
          <div className="recommend-album">
            {artist && artist.map((item,index)=>{
              return(
                  <div className="album-box" key={index}>
                    <div className="box">
                      <img src={item.picUrl} alt=""/>
                    </div>
                    {item.name}
                  </div>
              )
            })}
          </div>
          <Title title="New Album"/>
          <div className="new-album">
            {album && album.map((item,index)=>{
              return(
                  <div className="new-album-item" key={index}>
                    <div className="box">
                      <img src={item.picUrl} alt=""/>
                    </div>
                    {item.id}
                  </div>
              )
            })}
          </div>
          <Title title="Ranking"/>
          <div className="rank-list">
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
                {rank1&&rank1.slice(0, 10).map((item,index)=>{
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
              <div className="more">More></div>
            </div>
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
                {rank2&&rank2.slice(0, 10).map((item,index)=>{
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
              <div className="more">More></div>
            </div>
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
                {rank3&&rank3.slice(0, 10).map((item,index)=>{
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
              <div className="more">More></div>
            </div>
          </div>
        </div>
        <div className="right-side">
          <SideBar/>
        </div>
      </div>
  )
}

export default MainContent;
