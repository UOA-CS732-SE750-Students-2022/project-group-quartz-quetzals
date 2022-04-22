import "./Title.scss"

function Title(props){
  const {
    title,
    navList,
    changeTab
  } = props
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
        <div className="more-btn">
          More
        </div>
      </div>
  )
}
Title.defaultProps={
  navList:[]
}
export default Title
