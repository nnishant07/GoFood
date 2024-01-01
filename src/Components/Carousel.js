import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Search_bar from './Search_bar';

const Carousel1 = () => {
  const imageStyle = {
    height: '50vh', // Set the height of images to 50 viewport height
    objectFit: 'cover', // Maintain aspect ratio and cover the entire space
    filter: 'brightness(50%)'
  };

  return (
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
          <Search_bar style={imageStyle}/>
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
          <Search_bar style={imageStyle}/>
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
          <Search_bar style={imageStyle}/>
        </Carousel.Caption>
        
      </Carousel.Item>
    </Carousel>
  );
};

export default Carousel1;
