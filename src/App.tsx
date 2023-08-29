import React, { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import { BrowserRouter, Outlet, Route,  Routes } from 'react-router-dom';
import { LegoPrice1 } from './components/lego-price';
import { Category, Price } from './components/types';
import { CategorySelect } from './components/category-select';





function Layout () {
  return (
    <div className="App" >
      <div className="container">
        <div className="row">
          <div className="col-1">
            MENU
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/test">Test</a></li>
            </ul>
          </div>
            <div className="col-11">
            <Outlet />
            </div>
        </div>
      </div>
       
    </div>
  )};


function Welcome({person}: {person: string}) {
  return (
    <div>
      {person}
      <p>React makes it painless to create interactive UIs.</p>
    </div>
  );}


  

const Home = () => {
  const [prices, setPrices] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
       .get('http://localhost:9090/api/legoprices', {
      
       }
       )
       .then((response) => {
          setPrices(response.data);
          // console.log(response.data);
       })
       .catch((err) => {
          console.log(err);
       });
       axios
       .get('http://localhost:9090/api/categories', {
      
       }
       )
       .then((response) => {
          setCategories(response.data);
          console.log(response.data);
       })
       .catch((err) => {
          console.log(err);
       });
 }, []);
  return (<>
        
            <div className="col-9">
              {/* <LegoPrice prices={posts} categories={categories}/> */}
              <LegoPrice1 prices={prices} categories={categories} setPrices={setPrices}/>
            </div>
  </>
)};

function App() {
  
  return (
        <BrowserRouter>

    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home/>} />
        <Route path="/test" element={<Welcome person='asd'/>} />
        </Route>
    </Routes>
    </BrowserRouter>  
    
  );
}

export default App;
