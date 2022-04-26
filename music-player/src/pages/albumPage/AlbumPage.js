import './AlbumPage.scss'
import Title from "./components/Title";
import {useEffect, useRef, useState} from "react";
import {useParams} from "react-router-dom";
import {getSongInfo, getSongPlay, getSongUrl} from "../../common/service/album";



function AlbumPage(){
  // const [id,setId] = useState('')
  const [music,setMusic] = useState('');
  const [songList,setSongList] = useState([])
  const [albumInfo,setAlbumInfo]= useState({})
  async function playMusic(id){
    const res = await getSongPlay(id)
    const url = await getSongUrl(res.songs[0].id)
    setMusic(url.data[0].url)
  }
  let { id } = useParams();

  const audioRef = useRef();

  useEffect(()=>{
    audioRef.current.src = music;
    audioRef.current.play()
  },[music])

  useEffect(()=>{
    getSongInfo(id).then((res)=>{
      console.log(res)
      setSongList(res&&res.songs)
      setAlbumInfo(res&&res.album)
    })
  },[id])

  return(
      <div className="album-page-wrapper">
        <div className="album-info">
          <div className="name">{albumInfo.name}</div>
          <img className="img" src={albumInfo.picUrl+"?param=200y200"} alt=""/>
          <div className="info">
            <audio
                controls
                ref={audioRef}
                id="audio"
                preload="auto"
            />
          </div>
        </div>
        <div className="album-playlist">
          <Title title="Album Playlist"/>
          <div className="playlist">
            {songList.map((item,index)=>{
              return(
                  <div onClick={()=>playMusic(item.id)}
                       key={index}
                       className="playlist-item"
                  >
                    <div className="no">{index+1}</div>
                    <div className="name">{item.name}</div>
                    <div className="singer">{item.al.name}</div>
                    <div className="play">Play</div>
                  </div>
              )
            })}
          </div>
        </div>

      </div>
  )
}
export default AlbumPage;
