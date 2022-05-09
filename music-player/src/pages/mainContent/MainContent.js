import "./MainContent.scss"
import Title from "./components/title/Title";
import SideBar from "../sideBar/SideBar";
import React, {useEffect, useState} from "react";

import {getArtistList} from "../../common/service/artist";
import {getAlbumList, getSongPlay, getSongUrl} from "../../common/service/album";
import {getRankingList} from "../../common/service/ranking";
import {useNavigate} from "react-router-dom";
import {changeSongListAction, changeSongListNextAction} from "./store/actionCreator";
import {useDispatch} from "react-redux";
import {Avatar, BackTop, notification, Spin} from "antd";

import p_3812895 from "../../assets/rank_pic/3812895.jpg";
import p_60198 from "../../assets/rank_pic/60198.jpg";
import p_2809577409 from "../../assets/rank_pic/2809577409.jpg";
import p_180106 from "../../assets/rank_pic/180106.jpg";




function MainContent(){
  const [num,setNum] =useState(6);
  const [singerType,setSingerType] = useState(1)
  const [artistList,setArtistList] = useState([])
  const [albumList,setAlbumLIst] = useState([])
  const album = albumList || [];
  const artist = artistList || [];
  const [rank1,setRank1] = useState([])
  const [rank2,setRank2] = useState([])
  const [rank3,setRank3] = useState([])
  const [loading,setLoading] =useState(false)
  const navigate = useNavigate();
  function handleSinger(id){
    navigate('/user/'+id)
  }
  function handleSinger1(id){
    navigate('/singer/'+id)
  }
  function changeTab(index){
    setLoading(true)
    setSingerType(index)
    setNum(6)
    getArtistList(index,num).then((res)=>{
      setArtistList(res && res.artists);
      setLoading(false)
    })
  }
  function moreSinger(){
    setLoading(true)
    if(num >=30){
      setNum(6)
    }else {
      setNum(num+6)
    }
    getArtistList(singerType,num+6).then((res)=>{
      setArtistList(res && res.artists);
      setLoading(false)
    })
  }
  async function getData(){
    let artists = await getArtistList(singerType,num)
    setArtistList(artists && artists.artists);
    let album = await getAlbumList()
    setAlbumLIst(album && album.albums)
    let rank1 = await getRankingList(180106)
    setRank1(rank1 && rank1.playlist.tracks)
    let rank2 = await getRankingList(60198)
    setRank2(rank2 && rank2.playlist.tracks)
    let rank3 = await getRankingList(3812895)
    setRank3(rank3 && rank3.playlist.tracks)
  }
  useEffect(()=>{
    getData().then(()=>{
    })
  },[])
  const navList= [
    {name:'Male Singer',type: 1,to:''},
    {name:'Female Singer',type: 2,to:''},
    {name:'Band',type: 3, to:''},
  ]
  const openNotification = (name,picUrl,ar) => {
    const img = (
        <div >
          {name} <br/>by {ar.map((value, key) =>  [key > 0 && ", ", value.name])}<br/>
          <Avatar shape="square" size={64} src={picUrl}/>
        </div>
    );
    notification.open({
      message: `Add song to playlist`,
      description:
      img,
    });
  }
  const dispatch = useDispatch()
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
      <div>
        {<div className="main-content-wrapper">
          <div className="left-side">
            <Title navList={navList}
                   changeTab={changeTab}
                   title="Popular Singer"
                   more={true}
                   moreFunction={moreSinger}
            />
            <Spin spinning={loading || artist.length===0}>
            <div className="recommend-album">
              {artist && artist.slice(num-6,num).map((item,index)=>{
                return(
                    <div className="album-box" key={index} onClick={()=>handleSinger1(item.id)}>
                      <div className="box">
                        <img src={item.picUrl+'?param=130y130'} alt=""/>
                      </div>
                      {item.name}
                    </div>
                )
              })}
            </div>
            </Spin>
            <Title title="New Album"/>
            <Spin spinning={album.length===0}>
            <div className="new-album">
              {album && album.map((item,index)=>{
                return(
                    <div className="new-album-item" key={index} onClick={()=>handleSinger(item.id)}>
                      <div className="box">
                        <img src={item.picUrl+'?param=130y130'} alt=""/>
                      </div>
                      {item.name}
                    </div>
                )
              })}
            </div>
            </Spin>
            <Title title="Ranking" moreLink="/rankDetail/2809577409"/>
            <div className="rank-list">
              <div className="list">
                <div className="title-box">
                  <div className="title-img"><img width='80' height='80' src={p_180106} alt=""/></div>
                  <div className="title-name">
                    -UK-
                    <div className="iconfont">
                      {/*<span className="play-icon">&#xe624;</span>*/}
                      {/*<span className="play-icon">&#xe600;</span>*/}
                    </div>
                  </div>
                </div>
                <Spin spinning={rank1.length===0}>
                <div className="rank-list-box">
                  {rank1&&rank1.slice(0, 10).map((item,index)=>{
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
                </Spin>
                <div className="more"
                     onClick={()=>{
                       navigate("/rankDetail/180106")
                     }}
                >More></div>
              </div>
              <div className="list">
                <div className="title-box">
                  <div className="title-img"><img width='80' height='80' src={p_60198} alt=""/></div>
                  <div className="title-name">
                    -Billboard-
                    <div className="iconfont">
                      {/*<span className="play-icon">&#xe624;</span>*/}
                      {/*<span className="play-icon">&#xe600;</span>*/}
                    </div>
                  </div>
                </div>
                <Spin spinning={rank2.length===0}>
                <div className="rank-list-box">
                  {rank2&&rank2.slice(0, 10).map((item,index)=>{
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
                </Spin>
                <div className="more"
                     onClick={()=>{
                       navigate("/rankDetail/60198")
                     }}
                >More></div>
              </div>
              <div className="list">
                <div className="title-box">
                  <div className="title-img"><img width='80' height='80' src={p_3812895} alt=""/></div>
                  <div className="title-name">
                    -Beatport-
                    <div className="iconfont">
                      {/*<span className="play-icon">&#xe624;</span>*/}
                      {/*<span className="play-icon">&#xe600;</span>*/}
                    </div>
                  </div>
                </div>
                <Spin spinning={rank3.length === 0} >
                <div className="rank-list-box">
                  {rank3&&rank3.slice(0, 10).map((item,index)=>{
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
                </Spin>
                <div className="more"
                     onClick={()=>{
                       navigate("/rankDetail/3812895")
                     }}
                >More></div>
              </div>
            </div>
          </div>
          <div className="right-side">
            <SideBar/>
          </div>
        </div>}
        <BackTop>
          <div className="iconfont" style={style}>&#xe664;</div>
        </BackTop>
      </div>
  )
}

export default MainContent;
