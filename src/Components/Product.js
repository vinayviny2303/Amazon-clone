import { Rating } from '@mui/material';
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components';
import { useStateValue } from '../StateProvider';

function Product() {
  const state = useLocation();
  const navigate = useNavigate();
  const [{ basket }, dispatch] = useStateValue();
  const product = state.state;
  const addtoBasket = (id, title, price, image, rating) => {
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
  const isAdded = basket.filter((item) => item.id === product._id)
  return (
    <div style={{height:"100vh", 
    width:"100%", 
    display:"flex", alignItems:"center", justifyContent:"center", backgroundColor:"grey"}}>
      <Container>
        <Image>
          <img src={product.imageURL} alt='' />
        </Image>
        <Description>
          <h5 style={{marginTop:"10px"}}>{product.title}</h5>
          <Rating name="half-rating-read" defaultValue={product.rating} precision={0.5} readOnly />
          <p>₹ {product.price}</p>
          {isAdded.length === 0 ? (
            <Button  onClick={() => {
              addtoBasket(product._id, product.title, product.price, product.imageURL, product.rating)
            }}
            >Add to Cart</Button>) :
            (<Button onClick={() => navigate("/checkout")}>Go to Cart</Button>)}
        </Description>
      </Container>
    </div>
  )
}

const Button  = styled.div`
width: 50%;
background-color: #31383f;
padding: 10px;
align-self: center;
text-align: center ;
border-radius: 10px;
color: whitesmoke;
font-weight: 500;
`
const Container = styled.div`
width:50%;
margin: 10px;
border-radius: 10px;
padding: 20px;
background-color:#ffff;
z-index:10;
cursor:pointer;
&::hover{
transition:0.3s ease-in-out;
transform:translateY(20px);
}
`
const Image = styled.div`
width:100%;
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
margin-top:20px;
flex:0.3;
img{
    width:400px;
    height:400px;
}
`
const Description = styled.div`
width:90%;
margin-top: 10px;
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

export default Product