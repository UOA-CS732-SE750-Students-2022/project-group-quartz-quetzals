import './AlbumPage.scss'
import Title from "./components/Title";
import {useEffect, useRef, useState} from "react";
import {useParams} from "react-router-dom";
import {getSongInfo, getSongPlay, getSongUrl} from "../../common/service/album";
import { CaretRightOutlined, CaretDownOutlined,CustomerServiceOutlined} from '@ant-design/icons';
import tag1 from "../../assets/image/hot.svg"
import {changeSongListAction} from "../mainContent/store/actionCreator";
import {useDispatch} from "react-redux";

function AlbumPage(){
  // const [id,setId] = useState('')
  const [loading,setLoading] = useState(true)
  const [music,setMusic] = useState('');
  const [songList,setSongList] = useState([])
  const [albumInfo,setAlbumInfo]= useState({})
  const dispatch = useDispatch()
  async function playMusic(id){
    const res = await getSongPlay(id)
    const {name,ar} = res.songs[0]
    const {picUrl} = res.songs[0].al
    const url = await getSongUrl(res.songs[0].id)
    dispatch(changeSongListAction({...url.data[0],name,picUrl,ar}))
  }
  let { id } = useParams();

  const audioRef = useRef();

  // useEffect(()=>{
  //   audioRef.current.src = music;
  //   audioRef.current.play()
  // },[music])

  useEffect(()=>{
    getSongInfo(id).then((res)=>{
      // console.log(res)
      setSongList(res&&res.songs)
      setAlbumInfo(res&&res.album)
    })
    window.scrollTo(0, 0);
  },[id])

  return(
      <div className="album-page-wrapper">
        <div className="album-info">
          <div className="name"> <img src={tag1}/> -{albumInfo.name}-</div>
          <div className="box_image">
            <img className="img" src={albumInfo.picUrl+"?param=200y200"} alt=""/>
          </div>

          {/*<div className="info">*/}
          {/*  <audio*/}
          {/*      controls*/}
          {/*      ref={audioRef}*/}
          {/*      id="audio"*/}
          {/*      preload="auto"*/}
          {/*  />*/}
          {/*</div>*/}
        </div>

        <div className="album-playlist">
          <Title title="Album Playlist"/>
          <div className="playlist">
            {songList.map((item,index)=>{
              return(
                  <div
                       key={index}
                       className="playlist-item"
                  >
                    <div className="no">{index+1}</div>
                    <div className="name">{item.name}</div>
                    <div className="singer">{item.al.name}</div>
                    <div className="play" onClick={()=>playMusic(item.id)}>
                      <CaretRightOutlined /></div>
                  </div>
              )
            })}
          </div>
        </div>

      </div>
  )
}
export default AlbumPage;
