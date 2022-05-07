import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import {getArtistList, getArtistSimilar,getArtistDescription} from "../../common/service/artist";
import  "../singerPage/singer.scss"
import tag1 from "../../assets/image/hot.svg"
import {CaretRightOutlined} from "@ant-design/icons";
import Title from "../albumPage/components/Title";

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

    let artist1 = await getArtistList(id)
    setsinger_album(artist1&&artist1.songs)

    let artist2 = await getArtistSimilar(id)
    setsinger_similar(artist2&&artist2.artists)
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
                  <div className="playlist-item">
                    <div className="no">{index+1}</div>
                    <div className="name">{item.name}</div>
                    <div className="singer">-{singer_name}-</div>

                    <div className="play">
                        <CaretRightOutlined /></div>
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
                  <div className='singer-item'><Link to={"/singer/"+item.id} style={{color:'#fff'}}><img width="100" height="100" src={item.img1v1Url} alt=""/></Link> {item.name}</div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Singer;
