import "./MainContent.scss"
import Title from "./components/title/Title";
import SideBar from "../sideBar/SideBar";
import {useEffect, useState} from "react";

import {getArtistList} from "../../common/service/artist";
import {getAlbumList, getSongPlay, getSongUrl} from "../../common/service/album";
import {getRankingList} from "../../common/service/ranking";
import {useNavigate} from "react-router-dom";
import {changeSongListAction, changeSongListNextAction} from "./store/actionCreator";
import {useDispatch} from "react-redux";
import {Avatar, notification} from "antd";



function MainContent(){
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
    getArtistList(index,6).then((res)=>{
      setArtistList(res && res.artists);
    })
  }
  async function getData(){
    setLoading(true)
    let artists = await getArtistList(1,6)
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
      setLoading(false)
    })
  },[])
  const navList= [
    {name:'Male Singer',type: 1,to:''},
    {name:'Female Singer',type: 2,to:''},
    {name:'Band',type: 3, to:''},
  ]
  const openNotification = (name,picUrl) => {
    const img = (
        <div >
          Name:{name}<br/>
          <Avatar shape="square" size={64} src={picUrl}/>
        </div>
    );
    notification.open({
      message: `Add song to playlist`,
      description:
      img,
    });
  };

  const dispatch = useDispatch()
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
    openNotification(name,picUrl)
  }
  return(
      <div>
        {<div className="main-content-wrapper">
          <div className="left-side">
            <Title navList={navList}  changeTab={changeTab}  title="Popular Singer"/>
            <div className="recommend-album">
              {artist && artist.map((item,index)=>{
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
            <Title title="New Album"/>
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
            <Title title="Ranking"/>
            <div className="rank-list">
              <div className="list">
                <div className="title-box">
                  <div className="title-img"/>
                  <div className="title-name">
                    -UK-
                    <div className="iconfont">
                      {/*<span className="play-icon">&#xe624;</span>*/}
                      {/*<span className="play-icon">&#xe600;</span>*/}
                    </div>
                  </div>
                </div>
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
                <div className="more"
                     onClick={()=>{
                       navigate("/rankDetail/180106")
                     }}
                >More></div>
              </div>
              <div className="list">
                <div className="title-box">
                  <div className="title-img"/>
                  <div className="title-name">
                    -Billboard-
                    <div className="iconfont">
                      {/*<span className="play-icon">&#xe624;</span>*/}
                      {/*<span className="play-icon">&#xe600;</span>*/}
                    </div>
                  </div>
                </div>
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
                <div className="more"
                     onClick={()=>{
                       navigate("/rankDetail/60198")
                     }}
                >More></div>
              </div>
              <div className="list">
                <div className="title-box">
                  <div className="title-img"/>
                  <div className="title-name">
                    -Beatport-
                    <div className="iconfont">
                      {/*<span className="play-icon">&#xe624;</span>*/}
                      {/*<span className="play-icon">&#xe600;</span>*/}
                    </div>
                  </div>
                </div>
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
      </div>
  )
}

export default MainContent;
