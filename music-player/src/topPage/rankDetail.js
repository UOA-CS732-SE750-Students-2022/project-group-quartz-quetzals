import React from 'react';
import Footer from "../pages/footer/Footer";

import {useParams} from "react-router-dom";

function RankDetail(){
    let { typeid } = useParams();
    return(
        <div>

            <Footer/>
        </div>
    );
}
export default RankDetail;
