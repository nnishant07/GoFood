import React from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useDispatchCart, useCart } from '../Components/ContextReducer';
import trash from "../trash.svg"

const Cart = () => {

    const emptyCart = {
    display: 'flex',
    justifycontent: 'center', /* Center horizontally */
    alignitems: 'center', /* Center vertically */
    height: '100%', /* Ensures the div takes full height */
    }
    let dispatch = useDispatchCart();
    let data = useCart();

    if(data.length === 0){
        return (
        <div style={emptyCart}>
            <div className='m-5 w-100 text-center fs-3'>The Cart is Empty!</div>
        </div>
        )
    }

    const handleCheckOut = async()=>{
        let userEmail = localStorage.getItem("userEmail");
        console.log("Emial is ",userEmail);
        let response = await fetch("http://localhost:5000/api/OrderData",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                order_data: data,
                email: userEmail,
                order_date: new Date().toDateString()
            })
        }
        );

        console.log("Order Response:",response);
        if(response.status===200){
            dispatch({type:"DROP"})
        }

    }
  const tableStyles = {
    backgroundColor: 'white', // Set background color to white
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  const columnHeaderStyles = {
    fontWeight: 'bold',
    color: 'green',
  };

  const checkoutButtonStyles = {
    backgroundColor: 'green',
    color: 'white',
    fontWeight: 'bold',
    marginTop: '10px',
  };

  let totalPrice = data.reduce((total,food)=> total+food.price,0)
  return (
    
        <div style={tableStyles}>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th style={columnHeaderStyles}>#</th>
            <th style={columnHeaderStyles}>Name</th>
            <th style={columnHeaderStyles}>Quantity</th>
            <th style={columnHeaderStyles}>Option</th>
            <th style={columnHeaderStyles}>Amount</th>
          </tr>
        </thead>
        <tbody>
          { 
            data.map((food,index)=>(
                <tr key={index}>
                    {console.log(`index and food name is ${index+1} and ${food.name}`)}
                    <td>{index+1}</td>
                    <td>{food.name}</td>
                    <td>{food.size}</td>
                    <td>{food.price}</td>
                    <td>
                        <button type="button" className='btn p-0'>
                            <img src={trash} alt="delete" onClick={()=>{dispatch({type:"REMOVE", index:index});
                        }}
                        />
                        </button>
                    </td>
                    </tr>
            ))
            
          }
          
        </tbody>
      </Table>
      <div><h1 className='fs-2'>Total Price: {totalPrice}/-</h1></div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button style={checkoutButtonStyles} onClick={handleCheckOut}>Check out</Button>
      </div>
    </div>
  );
};

export default Cart;
