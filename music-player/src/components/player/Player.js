import './Player.scss'
import {useEffect, useRef, useState} from "react";
import {useLocation} from "react-router-dom";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {getSongUrl} from "../../common/service/album";
import {
  changeSongListAction,
  changeSongListNextAction,
  changeSongListPrevAction
} from "../../pages/mainContent/store/actionCreator";


function Player(){
  const [loading,setLoading]= useState(false)
  const [active,setActive] = useState(false)
  const [name,setName] = useState('')
  const [picUrl,setPicUrl] = useState('');
  const [singer,setSinger] = useState('')
  const audioRef = useRef();
  const dispatch = useDispatch()

  const { songList } = useSelector(
      (state) => ({
        songList: state.getIn(["mainContent", "songList"]),
      }),
      shallowEqual
  );
  useEffect(()=>{

    setLoading(true)
  },[loading])

  useEffect(()=>{
    var audio = document.getElementById("audio")
    audio.loop = true
    audioRef.current.onended = function (){
      dispatch(changeSongListNextAction(songList.shift()))
    }
    if(songList[0].url!==audioRef.current.src){
      audioRef.current.src = songList[0].url
      setName(songList[0].name)
      setPicUrl(songList[0].picUrl)
      let singer = songList[0].ar.map((value, key) =>  [key > 0 && ", ", value.name] )
      setSinger(singer)
      if(loading){
        playState()
      }
    }
    console.log(songList)
  },[songList])

  function playMusic(){
    if(!active){
      setActive(!active)
      audioRef.current.play()
    }else{
      setActive(!active)
      audioRef.current.pause()
    }
  }
  function playState(){
    audioRef.current.play()
    if(audioRef.current.paused === true){
      setActive(false)
    }else{
      setActive(true)
    }
  }


  function nextSong(){
    dispatch(changeSongListNextAction(songList.shift()))
    audioRef.current.play()
    setActive(true)
  }
  function prevSong(){
    dispatch(changeSongListPrevAction(songList.pop()))
    audioRef.current.play()
    setActive(true)
  }

  return(
      <div className="player" id="player">
        <div id="info" className={[active ? 'info active':'info']}>
          <span className="artist">{name}</span>
          <span>{singer}</span>
        </div>
        <div id="control-panel" className={[active ? 'control-panel active':'control-panel']} >
          <img src={picUrl} className="album-art"></img>
          <div className="controls">
            <div className="prev iconfont" onClick={prevSong}></div>
            <div id="play" className="play iconfont" onClick={playMusic}></div>
            <div className="next iconfont" onClick={nextSong}></div>
          </div>
        </div>
        <audio
            ref={audioRef}
            id="audio"
            // preload="auto"
        />
      </div>
  )
}

export default Player;
