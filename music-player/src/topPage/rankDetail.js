import React from 'react';
import Footer from "../pages/footer/Footer";
import RankList from "../pages/rankList/rankList"
import {useParams} from "react-router-dom";

function RankDetail(){
    let { typeid } = useParams();
    return(
        <div>
           <RankList typeid={typeid}/>
            <Footer/>
        </div>
    );
}
export default RankDetail;
