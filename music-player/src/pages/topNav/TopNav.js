import {useEffect, useState} from "react";
import "./TopNav.scss"
import {Button,Input} from 'antd';
import {useNavigate, useLocation} from "react-router-dom";
// import {getTopBanners} from "../common/service";
function TopNav(){
  const [navList] = useState([
    {title:'Discover', path: '/'},
    {title:'My Music', path: '/my_music'},
    {title:'Forum',path: '/forum'},
    {title:'Radio',path: '/radio'},
  ])
  const navigate = useNavigate();
  const [isNav,setNav] = useState(0)
  const [path,setPath] = useState(0)
  const {pathname} = useLocation();
  const routeMap = {
    0: '/',
    1: '/my_music',
    2: '/forum'
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
            <Input placeholder="Basic usage"/>
          </div>
          <Button type="primary">Search</Button>
        </div>
        <div className="sub-nav-container">
          <div className="sub-item">New!</div>
          <div className="sub-item">UK</div>
          <div className="sub-item">Billboard</div>
          <div className="sub-item">Beatport</div>
        </div>
      </div>
  )
}

export default TopNav;
