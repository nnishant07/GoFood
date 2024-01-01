import React, { useEffect, useRef, useState } from 'react';
import Card from 'react-bootstrap/Card';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import { useDispatchCart, useCart } from './ContextReducer';

const Cards = (props) => {
  
  let dispatch = useDispatchCart();
  let data = useCart();

 
  let foodItem = props.foodItem;
  let options = props.options;

  
  const priceRef = useRef();

  const [selectedQuantity, setSelectedQuantity] = useState('Select Quantity');
  const [selectedSize, setSelectedSize] = useState('Select Size');
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState('');

  
  let finalPrice = qty * parseInt(options[size]);
  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);

  const handleQuantitySelect = (eventKey) => {
    setSelectedQuantity(eventKey);
    setQty(parseInt(eventKey));
  };

  const handleSizeSelect = (eventKey) => {
    setSelectedSize(eventKey);
    setSize(eventKey);
  };
  
  const handleAddToCart = async () => {
    
    let food = [];
    for(const item of data){
      if(item.id===props.foodItem._id){
        food=item;
        break;
      }
    }
    if(food && typeof food === 'object'){
      if(food.size ===size){
        await dispatch({type:"UPDATE",id: props.foodItem._id, price:finalPrice,qty:qty})
        return;
      }
      else if(food.size !== size){
        await dispatch({
          type: 'ADD',
          id: foodItem._id,
          name: foodItem.name,
          img: foodItem.img,
          description: foodItem.description,
          price: finalPrice,
          qty: qty,
          size: size,
        });
        return;
      }
    }
    await dispatch({
      type: 'ADD',
      id: foodItem._id,
      name: foodItem.name,
      img: foodItem.img,
      description: foodItem.description,
      price: finalPrice,
      qty: qty,
      size: size,
      
    });
    
  };

  const cardStyle = {
    width: '23rem',
    marginRight: '10px', // Set a consistent margin between cards
  };

  const imageStyle = {
    height: '30vh',
    objectFit: 'cover',
  };

  return (
    <Card style={cardStyle}>
      <Card.Img variant="top" src={foodItem.img} style={imageStyle} />
      <Card.Body>
        <Card.Title>{foodItem.name}</Card.Title>
        <Card.Text>{foodItem.description}</Card.Text>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <DropdownButton
            id="dropdown-basic-button-quantity"
            title={selectedQuantity}
            onSelect={handleQuantitySelect}
            style={{ minWidth: '150px', marginRight: '10px' }}
          >
            {[1, 2, 3, 4, 5].map((item) => (
              <Dropdown.Item key={item} eventKey={item}>
                {item}
              </Dropdown.Item>
            ))}
          </DropdownButton>

          <DropdownButton
            id="dropdown-basic-button-size"
            title={selectedSize}
            onSelect={handleSizeSelect}
            style={{ minWidth: '150px', margin: '2px' }}
            ref={priceRef}
          >
            {Object.keys(options).map((data) => (
              <Dropdown.Item key={data} eventKey={data}>
                {data}
              </Dropdown.Item>
            ))}
          </DropdownButton>
        </div>
        <Card.Text style={{ marginTop: '10px' }}>Total Price: Rs. {qty * parseInt(options[size]) || 0}/-</Card.Text>
        <hr />
        <Button variant="primary" onClick={handleAddToCart}>
          Add to Cart
        </Button>
      </Card.Body>
    </Card>
  );
};

export default Cards;

