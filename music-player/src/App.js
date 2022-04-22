import React from 'react';
import './App.css';
import Page1 from './topPage/page1'
import Page2 from './topPage/page2'
import Page3 from './topPage/page3'
import {Provider} from 'react-redux'
import store from './store'
import {BrowserRouter as Router,HashRouter, Routes,Route,Link} from "react-router-dom";

function App() {
  return (
      <Provider store={store}>
        <Routes>
            <Route path='/' exact element={<Page1/>}/>
            <Route path='/my_music' exact element={<Page2/>}/>
            <Route path='/forum' exact element={<Page3/>}/>
        </Routes>
      </Provider>
  );
}

export default App;
