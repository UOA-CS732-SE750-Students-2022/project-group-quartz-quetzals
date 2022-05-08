import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import {getArtistSimilar, getArtistDescription, getArtistAlbum} from "../../common/service/artist";
import  "../singerPage/singer.scss"
import tag1 from "../../assets/image/hot.svg"
import {CaretRightOutlined} from "@ant-design/icons";
import Title from "../albumPage/components/Title";
import {getSongPlay, getSongUrl} from "../../common/service/album";
import {changeSongListAction} from "../mainContent/store/actionCreator";
import {useDispatch} from "react-redux";

function Singer(){
  const [singer_info,setsinger_info]= useState([]);
  const [singer_name,setsinger_name]= useState([]);
  const [singer_album,setsinger_album]= useState([]);
  const [singer_similar,setsinger_similar]= useState([]);
  const [simi1] = useState([])
  let { id } = useParams();
  async function getData12(){
    let artist = await getArtistDescription(id)
    setsinger_info(artist&&artist.data.artist.cover)
    setsinger_name(artist&&artist.data.artist.name)

    let artist1 = await getArtistAlbum(id)
    setsinger_album(artist1&&artist1.songs)

    let artist2 = await getArtistSimilar(id)
    setsinger_similar(artist2&&artist2.artists)
  }
  const dispatch = useDispatch()
  async function playMusic(id){
    const res = await getSongPlay(id)
    const {name} = res.songs[0]
    const {picUrl} = res.songs[0].al
    const url = await getSongUrl(res.songs[0].id)
    dispatch(changeSongListAction({...url.data[0],name,picUrl}))
  }
  function getData1(){
    let simi = []
    for (var i=0;i<5;i++){
      simi[i] = singer_similar[i];
    }
  }
  useEffect(()=>{
    getData12().then(()=>{
      getData1()
    })
  }, [id])

  return(
    <div>
      <div className="singerWrap">
        <div className='singer_info'>
          <div className='singer_name'>
            <img src={tag1} alt=""/> -{singer_name}-
          </div>

          <div className='singer_image'>
            <img src={singer_info} alt=""/>
          </div>
        </div>

        <div className='album-playlist'>
          <Title title="TOP 20 SONGS"/>
          <div className='playlist'>
            {simi1}
            {singer_album && singer_album.slice(0,20).map((item,index)=>{
              return(
                  <div className="playlist-item" key={index}>
                    <div className="no">{index+1}</div>
                    <div className="name">{item.name}</div>
                    <div className="singer">-{singer_name}-</div>

                    <div className="play" onClick={()=>playMusic(item.id)}>
                        <CaretRightOutlined />
                    </div>
                  </div>
              )
            })}
          </div>
        </div>

        <div className='singer-simi'>
          <Title title="You Might Also Like"/>
          <div>
            {singer_similar&&singer_similar.slice(0,5).map((item,index)=>{
              return(
                  <div className='singer-item' key={index}><Link to={"/singer/"+item.id} style={{color:'#fff'}}><img width="100" height="100" src={item.img1v1Url} alt=""/></Link> {item.name}</div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Singer;
