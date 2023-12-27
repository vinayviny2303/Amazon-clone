import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Navbar from './Navbar'
import Card from './Card'
import axios from '../axios'
import { useStateValue } from "../StateProvider";
import "./Home.css";
import Widget from './Widget'
function Home() {
  const [{ }, dispatch] = useStateValue();
  const [products, setProducts] = useState("")
  const getProducts = async () => {
    await axios.get("/products/get")
      .then((res) => {
        setProducts(res.data);
        dispatch({
          type: "GET_PRODUCTS",
          payload: res.data
        })
      })
  };

  useEffect(() => {
    getProducts();
  }, []);
  // axios.post("https:")
  return (
    <Container className='mainclass'>
      <Navbar />
      <div style={{marginTop:"30px", width:"100%", display:"flex", flexDirection:"row", justifyContent:"center"}}>
      <Widget />
      </div>
      
      <div style={{height:"200px"}}></div>
      <Main id='show'>
        {products &&
          products?.map((product, index) => (
            <Card
              key={index}
              id={product._id}
              image={product.imageURL}
              price={product.price}
              rating={product.rating}
              title={product.title}
              product={product}
            />
          ))}
      </Main>
      

    </Container>
  )
}
const Container = styled.div`
width:100%;
background-color:grey;
  /* margin: auto; */
  height: fit-content;
`
const Banner = styled.div`
width:100%;
height: 800px;
img{
    width:100%;
    -webkit-mask-image: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 2),
        rgba(0, 0, 0, 0.95),
        rgba(0, 0, 0, 0.85),
        rgba(0, 0, 0, 0.75),
        rgba(0, 0, 0, 0.55),
        rgba(0, 0, 0, 0)
      );
      &:nth-child(2) {
        display: none;
      }
      @media only screen and (max-width: 767px) {
        &:nth-child(1) {
          display: none;
        }
        &:nth-child(2) {
          display: block;
          -webkit-mask-image: none;
        }
      }
    }
`;
const Main = styled.div`
display: grid;
justify-content: center;
place-items: center;
width: 100%;
grid-auto-rows: 420px 420px;
grid-template-columns: repeat(4,280px);
grid-gap: 20px;
/* Mobile */
@media only screen and (max-width: 767px) {
  grid-template-columns: repeat(2, 50%);
  /* Mobile */
  @media only screen and (max-width: 767px) {
    grid-template-columns: repeat(2, 50%);
    grid-gap: 0;
  }
  /* Tablets */
  @media only screen and (min-width: 767px) and (max-width: 1200px) {
    grid-template-columns: repeat(3, 30%);
  }
  @media only screen and (min-width: 767px) {
    margin-top: -130px;
    padding: 10px 0px;
  }
}
/* Tablets */
@media only screen and (min-width: 767px) and (max-width: 1200px) {
  grid-template-columns: repeat(3, 30%);
}
@media only screen and (min-width: 767px) {
  margin-top: -130px;
  padding: 10px 0px;
}
`
export default Home