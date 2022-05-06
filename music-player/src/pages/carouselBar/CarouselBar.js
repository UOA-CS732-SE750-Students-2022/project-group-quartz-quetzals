
import {Carousel} from 'antd'
import './CarouselBar.scss'
import banner1 from '../../assets/image/banner1.svg'
import banner2 from '../../assets/image/banner1.svg'

function CarouselBar(props){
  const contentStyle = {
    height: '285px',
    width:'100%',
    color: '#fff',
    lineHeight: '285px',
    textAlign: 'center',
    background: '#364d79',
  };
  return(
      <div className="carousel-bar-wrapper">
        <Carousel autoplay>
          <div>
            <img src={banner1} style={contentStyle} alt=""/>
          </div>
          <div>
            <img src={banner2} style={contentStyle} alt=""/>
          </div>
          <div>
            <h3 style={contentStyle}>3</h3>
          </div>
          <div>
            <h3 style={contentStyle}>4</h3>
          </div>
        </Carousel>
        {/*<div className="rightBtn" onClick={next}/>*/}
      </div>
  )
}

export default CarouselBar
