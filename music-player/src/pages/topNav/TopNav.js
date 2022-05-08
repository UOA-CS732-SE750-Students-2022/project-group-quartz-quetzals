import {useEffect, useState} from "react";
import "./TopNav.scss"
import {Button,Input} from 'antd';
import {useNavigate, useLocation, Link} from "react-router-dom";
import SearchBar from '../../components/searchBar/SearchBar'
// import {getTopBanners} from "../common/service";
function TopNav(){
  const [navList] = useState([
    {title:'Discover', path: '/'},
    {title:'My Music', path: '/my_music'},
    {title:'Forum',path: '/forum'},
    {title:'Radio',path: '/room'},
  ])
  const navigate = useNavigate();
  const [isNav,setNav] = useState(0)
  const [path,setPath] = useState(0)
  const {pathname} = useLocation();
  const routeMap = {
    0: '/',
    1: '/my_music',
    2: '/forum',
    3:'/room',
    8:'/rankDetail/180106',
    9: '/rankDetail/60198',
    10:'/rankDetail/3812895'
  }
  const onNavClick = (index) => {
    navigate(routeMap[index])
    setNav(index)
  }

  useEffect(() => {
    setPath(pathname)
  }, [pathname])
  // getTopBanners().then((res)=>{
  //   console.log(res.banners)
  // })
  return(
      <div className="top-nav">
        <div className="container">
          <div className="iconfont logo">
            <div className="logo-img">
              &#xe66b;
            </div>
          </div>
          <div className="nav-area">
              {navList.map((item,index)=>{
                return(
                    <div className={[path===item.path?"nav-item nav-item-active":"nav-item"]}
                         key={index}
                         onClick={()=>onNavClick(index)}
                    >
                      {item.title}
                    </div>
                )
              })}
          </div>
          <div className="search-box">
            {/*<Input placeholder="Basic usage"/>*/}
            <SearchBar placeholder="Enter the song name..." style={{ width: 300 }}/>
          </div>
          {/*<Button type="primary">Search</Button>*/}
        </div>
        <div className="sub-nav-container">
          <div className="sub-item"><Link to="/rankDetail/2809577409" style={{color:'#fff'}}>New!</Link></div>
          <div className="sub-item"><Link to="/rankDetail/180106" style={{color:'#fff'}}>UK</Link></div>
          <div className="sub-item"><Link to="/rankDetail/60198" style={{color:'#fff'}}>Billboard</Link></div>
          <div className="sub-item"><Link to="/rankDetail/3812895" style={{color:'#fff'}}>Beatport</Link></div>
        </div>
      </div>
  )
}

export default TopNav;
