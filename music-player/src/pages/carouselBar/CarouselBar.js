
import {Carousel} from 'antd'
import './CarouselBar.scss'

function CarouselBar(props){
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
            <h3 style={contentStyle}>1</h3>
          </div>
          <div>
            <h3 style={contentStyle}>2</h3>
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
