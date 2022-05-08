import "./Footer.scss"
import people1 from '../../assets/Footer_icon/people1.svg'
import people2 from '../../assets/Footer_icon/people2.svg'
import people3 from '../../assets/Footer_icon/people3.svg'
import people4 from '../../assets/Footer_icon/people4.svg'
import people5 from '../../assets/Footer_icon/people5.svg'

function Footer(){

  return(
      <div className="Footer-wrapper">
        <div className='Footer-title'>
            -  CopyRight By  -
          </div>
        <div className='Footer-info-whole'>


          <div className="Footer-info" >
            / SiYu Zhang /
            <div>
              <img width='60' height='60' src={people1}/>
            </div>
          </div>

        <div className="Footer-info" >
          / YaWei Zhou /
          <div>
            <img width='60' height='60' src={people2}/>
          </div>
        </div>

        <div className="Footer-info" >
          / GongYu Sun /
          <div>
            <img width='60' height='60' src={people3}/>
          </div>
        </div>

        <div className="Footer-info" >
          / Adam Liu /
          <div>
            <img width='60' height='60' src={people4}/>
          </div>
        </div>
        <div className="Footer-info" >
         / ZhongRan Ou /
          <div>
            <img width='60' height='60' src={people5}/>
          </div>
        </div>

          <div className="Footer-info" >
            <div> - To User - </div>
            We hope you enjoy the music world.
          </div>


        </div>
      </div>
  )
}

export default Footer;
