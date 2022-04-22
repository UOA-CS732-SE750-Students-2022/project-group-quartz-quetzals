import React from 'react';
import MainContent from "../pages/mainContent/MainContent";
import TopNav from "../pages/topNav/TopNav";
import CarouselBar from "../pages/carouselBar/CarouselBar";
import Footer from "../pages/footer/Footer";


function Page1(){
    return(
        <div>
            <TopNav/>
            <CarouselBar/>
            <MainContent/>
            <Footer/>
        </div>
    );
}
export default Page1;
