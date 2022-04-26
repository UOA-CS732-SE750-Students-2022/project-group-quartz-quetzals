import React from 'react';
import './App.css';
import Page1 from './topPage/page1'
import Page2 from './topPage/page2'
import Page3 from './topPage/page3'
import {Provider} from 'react-redux'
import store from './store'
import {Routes,Route} from "react-router-dom";
import RankList1 from "./topPage/rank1";
import AlbumPage from "./pages/albumPage/AlbumPage";
// import {Route,Redirect,Switch} from 'react-router-dom'
import TopNav from "./pages/topNav/TopNav";

function App() {
  return (
      <Provider store={store}>
        <TopNav/>
        <Routes>
          <Route path='/' exact element={<Page1/>}/>
          <Route path='/my_music' exact element={<Page2/>}/>
          <Route path='/forum' exact element={<Page3/>}/>
          <Route path='/rank1' exact element={<RankList1/>}/>
          <Route path='/user/:id' exact element={<AlbumPage/>}/>
        </Routes>
        {/*<Switch>*/}
        {/*  <Route path='/'  component={<Page1/>}*/}
        {/*  <Route path="/findScore" component={Message}/>*/}
        {/*  <Route path="/getAllScore" component={AllStudent}/>*/}
        {/*  /!* 一般写在所有路由注册的最下方，当所有路由都无法匹配时，跳转到Redirect指定的路由 *!/*/}
        {/*  <Redirect to="/insetScore"/>*/}
        {/*</Switch>*/}
      </Provider>
  );
}

export default App;
