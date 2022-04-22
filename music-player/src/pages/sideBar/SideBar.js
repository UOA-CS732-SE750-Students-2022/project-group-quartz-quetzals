import "./SideBar.scss"
import img5 from "../../assets/image/5.png";
import img1 from "../../assets/image/1.png";

function SideBar(){
  const radioContent=[
    {name:'Release', name1:"New Album",img:img1},
    {name:'Charlie Puth',name1:"dscfdsacadsdsc",img:img5},
    {name:'Charlie Puth',name1:"dsccddsc",img:img1},
    {name:'Charlie Puth',name1:"dsccdfedsc",img:img5},
    {name:'Charlie Puth',name1:"dsccdfecfdsc",img:img1},
  ]
  return(
    <div className="side-bar">
        Music Radio Room
      <hr></hr>
      {radioContent.map((item,index)=>{
        return(
          <div className="side-bar-content" key={index}>
            <div className="side-bar-item" >
              <div className="box">
                <img src={item.img} alt=""/>
              </div>
              <div className="side-text">
                <p><b>{item.name}</b></p>

                <p>{item.name1}</p>
              </div>
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
