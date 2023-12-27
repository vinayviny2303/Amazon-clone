import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useStateValue } from '../StateProvider';
import { useNavigate } from "react-router-dom"
import axios from 'axios';
function Navbar() {
  const [{ basket, user }, dispatch] = useStateValue();
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState([])
  const navigate = useNavigate();
  useEffect(() => {
    fetch('http://localhost:4000/products/get')
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(query.toLowerCase())
  );
  console.log(filteredProducts)
  const signOut = () => {
    dispatch({
      type: "SET_USER",
      user: null,
    });

    localStorage.removeItem("user");
    alert("You have been logged out");
    navigate("/");
  };

  return (
    <Container>
      <Inner>
        <Logo>
          <a href='/'> <img src='./images/lo.png' alt='' style={{ borderRadius: "50px", width: "70px", height: "65px", marginBottom: "4px" }} /></a>
        </Logo>
        <SearchBar>
          <input type="text" placeholder="Search..." onChange={(e) => setQuery(e.target.value)} />
          {query && <FilteredProducts>
            <ul >
              {filteredProducts.map((product) => (
                <div onClick={() => navigate("/product", { state: product })} style={{ 'textDecoration': 'None' }}><p style={{ "cursor": "pointer" }}>{product.title}<hr></hr></p></div>

              ))}
            </ul>
          </FilteredProducts>}
          <SearchIcon onClick={() => navigate("/addproduct")} >
            <img src='./images/searchIcon.png' alt='' />
          </SearchIcon>
        </SearchBar>
        <RightContainer>
          <NavButton onClick={user ? () => {} : () => navigate("/login")}>
            <b><p>{user ? user?.fullName : "Sign In"}</p></b>
          </NavButton>
          {user && <NavButton onClick={user ? () => signOut() : () => navigate("/login")}>
            <b><p>Logout</p></b>
          </NavButton>
          }
          <NavButton onClick={() => navigate('/orders')}>
            <b><p>Orders</p></b>
          </NavButton>
          <BasketButton onClick={() => navigate("/checkout")}>
            <img src="./images/basket-icon.png" alt="" />
            <p>{basket.length}</p>
          </BasketButton>
        </RightContainer>
      </Inner>
      <MobileSearchBar >
        <input type="text" placeholder="Search..." />
        <SearchIcon onClick={() => navigate("/addproduct")}>
          <img src='./images/searchIcon.png' alt='' />
        </SearchIcon>
      </MobileSearchBar>
    </Container>
  )
}
const Container = styled.div`
  width: 100%;
  height: 80px;
  background-color: #31383f;
  display: flex;
  align-items: center;
  position: relative;
  @media only screen and (max-width: 767px) {
    height: 150px;
    flex-direction: column;
  }
`;
const FilteredProducts = styled.div`
position: absolute;
top: 100%; 
left: 105px;
background-color: lightgrey; 
border: 1px solid #ccc;
padding: 10px;
z-index: 1; 
max-height: 200px;
overflow-y: auto;
width: 900px;
`;

const Inner = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  @media only screen and (max-width: 767px) {
    justify-content: space-between;
  }
`;

const Logo = styled.div`
  margin-left: 20px;
  cursor: pointer;
  img {
    width: 100px;
    margin-top: 10px;
  }
  @media only screen and (max-width: 767px) {
    width:50px;
  }
`;
const SearchBar = styled.div`
  height:35px;
  flex: 1;
  margin: 0px 15px;
  display: flex;
  align-items: center;
  input {
    flex: 1;
    width: 50%;
    height: 100%;
    border: none;
    border-radius: 5px 0px 0px 5px;
    &::placeholder {
      padding-left: 5px;
    }
  }
  @media only screen and (max-width: 767px) {
    display: none;
  }
`;

const MobileSearchBar = styled.div`
  height: 35px;
  width: 90%;
  display: flex;
  align-items: center;
  padding: 10px;
  input {
    flex: 1;
    width: 100%;
    height: 100%;
    border: none;
    border-radius: 5px 0px 0px 5px;
    &::placeholder {
      padding-left: 10px;
    }
  }
  @media only screen and (min-width: 768px) {
    display: none;
  }
`;

const SearchIcon = styled.div`
  background-color:orangered;
  height: 37px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0px 5px 5px 0px;
  img {
    width: 22px;
  }
  cursor:pointer;
`;
const RightContainer = styled.div`
  display: flex;
  align-items: center;
  width: fit-content;
  justify-content: space-around;
  height: 100%;
  padding: 5px 10px;
`;

const NavButton = styled.div`
  color: #fff;
  height: 80%;
  padding:5px
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  margin-right: 15px;
  p {
    &:nth-child(1) {
      font-size: 12px;
    }
    &:nth-child(2) {
      font-size: 14px;
      font-weight: 600;
    }
  }
`;

const BasketButton = styled.div`
  display: flex;
  align-items: center;
  height: 90%;
  cursor: pointer;
  img {
    width: 30px;
    margin-right: 10px;
  }
  p {
    color: #fff;
    font-weight: 500;
  }
`;

export default Navbar