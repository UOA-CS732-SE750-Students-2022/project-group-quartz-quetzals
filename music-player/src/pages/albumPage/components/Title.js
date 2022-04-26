import "./Title.scss"

function Title(props){
  const {
    title,
    num
  } = props
  return(
      <div className="album-title">
        <div className="title">{title}</div>
        {/*<div className="num">{num}</div>*/}
      </div>
  )
}
Title.defaultProps={
  num:0
}
export default Title
