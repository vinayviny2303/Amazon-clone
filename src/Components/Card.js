import React from 'react'
import styled from 'styled-components'
import {Rating } from '@mui/material';
import { useStateValue } from '../StateProvider';
import { useNavigate } from 'react-router-dom';
function Card({id,image,title,price,rating, product}) {
  const navigate = useNavigate();
  const [{basket},dispatch]=useStateValue();
  const addtoBasket=(e)=>{
    console.log("basket>>",basket)
    e.preventDefault();
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id,
        title,
        price,
        image,
        rating,
      },
    });
  };

  return (
    <Container onClick={()=>navigate("/product", {state : product})}>
        <Image>
            <img src={image} alt=''/>
        </Image>
        <Description>
          <h5>{title}</h5>
          <Rating name="half-rating-read" defaultValue={rating} precision={0.5} readOnly />
          <p>₹ {price}</p>
          <button style={{backgroundColor:"#31383f", color:"whitesmoke", fontWeight:"500"}} onClick={addtoBasket}>Add to Cart</button>
        </Description>
    </Container>
  )
}
const Container=styled.div`
border-radius: 10px;
width:100%;
height:100%;
display:flex;
flex-direction:column;
background-color:#ffff;
z-index:10;
cursor:pointer;
&::hover{
transition:0.3s ease-in-out;
transform:translateY(20px);
}

`
const Image=styled.div`
width:100%;
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
margin-top:20px;
flex:0.3;
img{
    width:150px;
    height:180px;
}
`
const Description=styled.div`
width:90%;
margin:auto;
display:flex;
flex-direction:column;
justify-content:space-evenly;
flex:0.7;
h5{
  font-size:16px;
  font-weight:600;
}
p {
  font-weight: 600;
}
button {
  width: 100%;
  height: 33px;
  background-color: #fa8900;
  border: none;
  border-radius: 10px;
  cursor: pointer;
}
`
export default Card