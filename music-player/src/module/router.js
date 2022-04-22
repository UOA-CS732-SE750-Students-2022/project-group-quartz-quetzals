import MainContent from "../mainContent/MainContent";
import TopNav from "../topNav/TopNav";
import CarouselBar from "../carouselBar/CarouselBar";
import SideBar from "../sideBar/SideBar";
import page1 from "../topPage/page1";

const routes = [

  {
    path:"/",
    component:page1,
    exact:true
  },
  {
    path:"/page1",
    component:page1,
    exact: true
  },

]

export default routes
