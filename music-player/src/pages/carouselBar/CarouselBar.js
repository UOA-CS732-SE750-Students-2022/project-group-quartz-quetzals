import {Carousel} from 'antd'
import './CarouselBar.scss'
import car1 from "../../assets/carousel-img/carousel-1.svg";
import car2 from "../../assets/carousel-img/carousel-21.svg";
import car3 from "../../assets/carousel-img/carousel-3.svg";
import car4 from "../../assets/carousel-img/carousel-4.svg";
import {Link} from "react-router-dom";

function CarouselBar(){
  const contentStyle = {
    height: '285px',
    color: '#fff',
    lineHeight: '285px',
    textAlign: 'center',
    background: '#364d79',
  };
  return(
      <div className="carousel-bar-wrapper">
        <Carousel autoplay>
          <div>
            <Link to="/rankDetail/180106" style={{color:'#fff'}}><h3 style={contentStyle}>< img style={contentStyle} src={car2} alt=""/></h3></Link>
          </div>
          <div>
            <Link to="/rankDetail/180106" style={{color:'#fff'}}><h3 style={contentStyle}>< img style={contentStyle} src={car1} alt=""/></h3></Link>
          </div>
          <div>
            <Link to="/rankDetail/3812895" style={{color:'#fff'}}><h3 style={contentStyle}>< img style={contentStyle} src={car3} alt=""/></h3></Link>
          </div>
          <div>
            <Link to="/rankDetail/60198" style={{color:'#fff'}}><h3 style={contentStyle}>< img style={contentStyle} src={car4} alt=""/></h3></Link>
          </div>
        </Carousel>
        {/*<div className="rightBtn" onClick={next}/>*/}
      </div>
  )
}

export default CarouselBar
