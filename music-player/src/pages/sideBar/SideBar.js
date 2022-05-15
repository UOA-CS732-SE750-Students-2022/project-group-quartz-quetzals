import "./SideBar.scss"
import img5 from "../../assets/image/5.png";
import img1 from "../../assets/image/1.png";
import {useEffect, useState} from "react";
import {getArtistAlbum, getArtistDescription, getArtistFansNumber, getArtistSimilar} from "../../common/service/artist";
import {getAlbumListAnother} from "../../common/service/album";
import {Link} from "react-router-dom";

function SideBar(){
  const radioContent=[
    {name:'Release', name1:"New Album",img:img1},
    {name:'Charlie Puth',name1:"dscfdsacadsdsc",img:img5},
    {name:'Charlie Puth',name1:"dsccddsc",img:img1},
    {name:'Charlie Puth',name1:"dsccdfedsc",img:img5},
    {name:'Charlie Puth',name1:"dsccdfecfdsc",img:img1},
  ]
  const [album_li,setalbum_li]= useState([]);
  async function getData121(){
    let album = await getAlbumListAnother()
    setalbum_li(album.albums)
  }
  useEffect(()=>{
    getData121()
  }, [])

  return(
    <div className="side-bar">
        Music Radio Room
      <hr></hr>
      {album_li.slice(6,11).map((item,index)=>{
        return(
          <div className="side-bar-content" key={index}>
            <div className="side-bar-item" >
              <div className="box">
                <img src={item.picUrl} alt=""/>
              </div>

              <Link to='/room' style={{color:'#fff'}}>
                <div className="side-text">
                  <div><b>{item.name}</b></div>
                  <p>{item.company}</p>
                </div>
              </Link>
            </div>
          </div>
        )
        }
      )}

      <div className="in-line">
        <hr></hr>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;More
      </div>
    </div>
  )
}

export default SideBar;
