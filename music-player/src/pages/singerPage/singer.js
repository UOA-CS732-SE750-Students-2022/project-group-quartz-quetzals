import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import {getArtistList, getArtistDescription, getArtistAlbum, getArtistSimilar} from "../../common/service/artist";
import  "../singerPage/singer.scss"
import tag1 from "../../assets/image/hot.svg"
import {CaretRightOutlined} from "@ant-design/icons";
import Title from "../albumPage/components/Title";
import {getAlbumList} from "../../common/service/album";
import {getRankingList} from "../../common/service/ranking";

function Singer(){
  const [singer_info,setsinger_info]= useState([]);
  const [singer_name,setsinger_name]= useState([]);
  const [singer_album,setsinger_album]= useState([]);
  const [singer_similar,setsinger_similar]= useState([]);
  const [simi1,setsimi1] = useState([])
  const [simi2,setsimi2] = useState([])
  const [simi3,setsimi3] = useState([])
  const [simi4,setsimi4] = useState([])
  const [simi5,setsimi5] = useState([])
  const [simi1_pic,setsimi1_pic] = useState([])
  const [simi2_pic,setsimi2_pic] = useState([])
  const [simi3_pic,setsimi3_pic] = useState([])
  const [simi4_pic,setsimi4_pic] = useState([])
  const [simi5_pic,setsimi5_pic] = useState([])
  const [loading,setLoading] =useState(false)
  let { id } = useParams();
  async function getData12(){
    let artist = await getArtistDescription(id)
    setsinger_info(artist&&artist.data.artist.cover)
    setsinger_name(artist&&artist.data.artist.name)

    let artist1 = await getArtistAlbum(id)
    setsinger_album(artist1&&artist1.songs)

    let artist2 = await getArtistSimilar(id)
    setsinger_similar(artist2&&artist2.artists)
    console.log(singer_similar)
  }


  useEffect(()=>{
    getData12().then(()=>{
      getData1()
    })
  }, [id])


  function getData1(){
    let simi = []
    for (var i=0,len=singer_similar;i<5;i++){
      simi[i] = singer_similar[i];
    }
    console.log('sssssss',singer_similar)


    let simi1 = getArtistDescription(simi[0].id)
    setsimi1(simi1 && simi1.data.artist.name);

    let simi1_pic = getArtistDescription(simi[0].id)
    setsimi1_pic(simi1_pic && simi1_pic.data.artist.cover);

    let simi2 = getArtistDescription(simi[1].id)
    setsimi2(simi2 && simi2.data.artist.name);

    let simi2_pic = getArtistDescription(simi[1].id)
    setsimi2_pic(simi2_pic && simi2_pic.data.artist.cover);

    let simi3 = getArtistDescription(simi[2].id)
    setsimi3(simi3 && simi3.data.artist.name);

    let simi3_pic = getArtistDescription(simi[2].id)
    setsimi3_pic(simi3_pic && simi3_pic.data.artist.cover);

    let simi4 = getArtistDescription(simi[3].id)
    setsimi4(simi4 && simi4.data.artist.name);

    let simi4_pic = getArtistDescription(simi[3].id)
    setsimi4_pic(simi4_pic && simi4_pic.data.artist.cover);


    let simi5 = getArtistDescription(simi[4].id)
    setsimi5(simi5 && simi5.data.artist.name);

    let simi5_pic = getArtistDescription(simi[4].id)
    setsimi5_pic(simi5_pic && simi5_pic.data.artist.cover);
  }




  return(
    <div>
            <div className="singerWrap">
              <div className='singer_info'>
                <div className='singer_name'>
                  <img src={tag1}/> -{singer_name}-
                </div>

                <div className='singer_image'>
                  <img src={singer_info}/>
                </div>


              </div>

              <div className='album-playlist'>
                <Title title="TOP 20 SONGS"/>
                <div className='playlist'>
                  {simi1}
                {singer_album.slice(0,20).map((item,index)=>{
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
                  {singer_similar.slice(0,5).map((item,index)=>{
                    return(
                      <div className='singer-item'><Link to={"/singer/"+item.id} style={{color:'#fff'}}><img width="100" height="100" src={item.img1v1Url}/></Link> {item.name}</div>
                    )
                  })}
                </div>
              </div>


          </div>



    </div>
  );
}
export default Singer;
