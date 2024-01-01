import React, { useEffect, useState } from 'react';
import NavBar from '../Components/Navbar';
import Footer from '../Components/Footer';
import Cards from '../Components/Cards';
import Carousel from 'react-bootstrap/Carousel';
import { Button, Form } from 'react-bootstrap';

const Home = () => {
  
  const imageStyle = {
    height: '50vh', // Set the height of images to 50 viewport height
    objectFit: 'cover', // Maintain aspect ratio and cover the entire space
    filter: 'brightness(50%)'
  };

  const [search,setSearch] = useState('');
  const [foodCat,setFoodCat] = useState([]);
  const [foodItem,setFoodItem]= useState([]);

  const loadData = async() =>{
    let response = await fetch("http://localhost:5000/api/foodData",{
      method:"POST",
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const json = await response.json();
    //console.log(json[0],json[1]);

    setFoodItem(json[0]);
    setFoodCat(json[1]);
  }

  useEffect(()=>{
    loadData()
  },[])

  return (
    <div>
      <NavBar />
      <div className="container-fluid">
        <div>
        <Carousel >
          <Carousel.Item>
            <img
              style={imageStyle}
              className="d-block w-100"
              src="https://source.unsplash.com/random/900x700?burger"
              alt="First slide"
            />
            <Carousel.Caption >
            <h3>Welcome to GoFood</h3>
            <Form className="mt-2 d-flex justify-content-center">
              <Form.Control
               // style={imageStyle}
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button type="submit">Search</Button>
            </Form>
              {/* <Search_bar style={imageStyle}/> */}
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              style={imageStyle}
              className="d-block w-100"
              src="https://source.unsplash.com/random/900x700?food"
              alt="Second slide"
            />
            <Carousel.Caption >
            <h3>Welcome to GoFood</h3>
            <Form className="mt-2 d-flex justify-content-center">
              <Form.Control
               // style={imageStyle}
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button type="submit">Search</Button>
            </Form>
              {/* <Search_bar /> */}
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              style={imageStyle}
              className="d-block w-100"
              src="https://source.unsplash.com/random/900x700?pizza"
              alt="Third slide"
            />
            <Carousel.Caption >
            <h3>Welcome to GoFood</h3>
            <Form className="mt-2 d-flex justify-content-center">
              <Form.Control
               // style={imageStyle}
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button type="submit">Search</Button>
            </Form>
              {/* <Search_bar style={imageStyle}/> */}
            </Carousel.Caption>
            
          </Carousel.Item>
        </Carousel>
        </div >
          <div style={{ marginTop:'30px'}}>
          {foodCat &&
          foodCat.map((data) => (
            <div key={data._id} className="mb-4">
              <h2>{data.CategoryName}</h2>
              <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 ">
                {foodItem &&
                  foodItem
                    .filter((item) => (item.CategoryName === data.CategoryName) && item.name.toLowerCase().includes(search.toLowerCase())) 
                    .map((filterItems) => (
                      <div key={filterItems._id} className="col mb-3">
                        <Cards foodItem = {filterItems}
                        options = {filterItems.options[0]}
                        />
                      </div>
                    ))}
              </div>
              <hr />
            </div>
          ))}
          </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
