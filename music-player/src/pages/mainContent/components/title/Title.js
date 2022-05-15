import "./Title.scss"
import {useNavigate} from "react-router-dom";

function Title(props){
  const {
    title,
    navList,
    changeTab,
    more,
    moreLink,
    moreFunction
  } = props
  const navigate = useNavigate();
  return(
      <div className="title-bar">
        <div className="title">{title}</div>
        <div className="nav-box">
          {navList && navList.map((item,index)=>{
            return(
                <div className="nav-item" key={index} onClick={()=>changeTab(index+1)}>{item.name}</div>
            )
          })}
        </div>
        <div className={moreLink?'more-btn':'more-btn-false'}
             onClick={()=>{
               navigate(moreLink)
             }}
        >
          More
        </div>
        <div className={more?'more-btn':'more-btn-false'} onClick={moreFunction}>More</div>
      </div>
  )
}
Title.defaultProps={
  navList:[],
  more:false
}
export default Title
