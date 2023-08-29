import React, { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import { BrowserRouter, Outlet, Route,  Routes } from 'react-router-dom';

type Price = {
  id: number,
  ean: string,
  image_url: string,
  product_name: string
}

type category = {
  id: number,
  category_name: string,
}

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

  class LegoPrice extends React.Component<{prices: Array<Price>, categories: Array<category>}>{
    state: {prices: Array<Price>};
    constructor(props: any) {
      super(props);
      // console.log(props);
      this.state = {prices: props.prices};
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit 
     ( event: any) {
      const formData = new FormData(event.currentTarget);
      event.preventDefault();
      const postObj = {
        setname: formData.get('setname'),
        ean: formData.get('ean'),
        setid: formData.get('setid'),
        category_id: formData.get('category_id'),
      }
      axios.post('http://localhost:9090/api/set', postObj).then((response) => {
        if(response.status === 200){
          this.setState( {prices: this.state.prices.filter((post:Price) => post.ean !== response.data.ean)});
          
        }

      }).catch((err) => {
        console.log(err);
      });
    }
    render() {
      return(<table className="table table-striped table-hover">
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Bild</th>
          <th>ean</th>
        </tr>
      </thead>
      <tbody>
     { this.state.prices.map((post:Price) => {
      const regex = /([A-Za-z ®-]*) {1}([0-9]{5,8})\w* /g;
      const set = regex.exec(post.product_name);
      let name =''
      if(set){

         name = post.product_name.replace(set[0], '');
      }

      return (
        <tr key={post.id}>
          <td>{post.id}</td>
          <td>
          <b>{post.product_name}</b>
            <form onSubmit={this.handleSubmit}>
            <div className='row mb-3'>
              <div className='col-6'>
              <label  className='form-label'>Set Nummer</label>
              <input className='form-control' defaultValue={set?set[2]:'xxx'} name="setid"/>
              </div>
              <div className='col-6'>
                <label className='form-label'>Set Name</label>
                <input className='form-control' defaultValue={name} name="setname"/>
              </div>
            </div>
            <CategorySelect categories={this.props.categories}/>
            <input className='form-control' defaultValue={post.ean} name="ean"/>
          <button type="submit" className=" btn btn-primary"  >submit</button>
          </form>
          </td>
          <td><img src={post.image_url} height="50px"/></td>
          <td>{post.ean}</td>
        </tr>
      );  
    }
      
    )}</tbody>
    </table>)
    }
  }
function Welcome({person}: {person: string}) {
  return (
    <div>
      {person}
      <p>React makes it painless to create interactive UIs.</p>
    </div>
  );}

  function CategorySelect({categories}: {categories: Array<category>}) {
    return (  <select className='form-select mb-3' name="category_id">
      {categories.map((category) => {return <option key={ category.id} value={category.id}>{category.category_name}</option>})}
      
    </select>
    );}

  function LegoPrice1({prices, categories, setPrices}: {prices: Array<Price>, categories: Array<category>, setPrices: any}) {
    

    
    // const [postArr, setPosts] = useState(posts);

    const handleSubmit = function( event: any) {
      const formData = new FormData(event.currentTarget);
      event.preventDefault();
      const postObj = {
        setname: formData.get('setname'),
        ean: formData.get('ean'),
        setid: formData.get('setid'),
        category_id: formData.get('category_id'),
      }

      axios.post('http://localhost:9090/api/set', postObj).then((response) => {
        if(response.status === 200){
          prices = prices.filter((price:Price) => price.ean !== response.data.ean);
          console.log(prices);
          setPrices(prices);
          
        }

      }).catch((err) => {
        console.log(err);
      });
    }
    return(<table className="table table-striped table-hover">
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Bild</th>
          <th>ean</th>
        </tr>
      </thead>
      <tbody>
     { prices.map((post:Price) => {
      const regex = /([A-Za-z ®-]*) {1}([0-9]{5,8})\w* /g;
      const set = regex.exec(post.product_name);
      let name =''
      if(set){

         name = post.product_name.replace(set[0], '');
      }

      return (
        <tr key={post.id}>
          <td>{post.id}</td>
          <td>
          <b>{post.product_name}</b>
            <form onSubmit={handleSubmit}>
            <div className='row mb-3'>
              <div className='col-6'>
              <label  className='form-label'>Set Nummer</label>
              <input className='form-control' defaultValue={set?set[2]:'xxx'} name="setid"/>
              </div>
              <div className='col-6'>
                <label className='form-label'>Set Name</label>
                <input className='form-control' defaultValue={name} name="setname"/>
              </div>
            </div>
            <CategorySelect categories={categories}/>
            <input className='form-control' defaultValue={post.ean} name="ean"/>
          <button type="submit" className=" btn btn-primary"  >submit</button>
          </form>
          </td>
          <td><img src={post.image_url} height="50px"/></td>
          <td>{post.ean}</td>
        </tr>
      );  
    }
      
    )}</tbody>
    </table>);
  }

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
