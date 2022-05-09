import { FaPizzaSlice, FaHamburger } from "react-icons/fa";
import { GiNoodles, GiChopsticks } from "react-icons/gi";
import styled from "styled-components";
import React from "react";
import { NavLink } from "react-router-dom";

const Category = () => {
  return (
    <List>
      <NavLink to={"/cuisine/Italian"}>
        <FaPizzaSlice />
        <h4>Italian</h4>
      </NavLink>
      <NavLink to={"/cuisine/American"}>
        <FaHamburger />
        <h4>American</h4>
      </NavLink>
      <NavLink to={"/cuisine/Thai"}>
        <GiNoodles />
        <h4>Thai</h4>
      </NavLink>
      <NavLink to={"/cuisine/Japanese"}>
        <GiChopsticks />
        <h4>Japanese</h4>
      </NavLink>
    </List>
  );
};

const List = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 2rem auto;
  width: 22rem;
  a {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    border-radius: 50%;
    width: 6rem;
    height: 6rem;
    color: white;
    background: linear-gradient(35deg, #494949, #313131);
    transform: scale(0.8);
    cursor: pointer;
    h4 {
      color: white;
      font-size: 0.8rem;
    }
    svg {
      font-size: 1.5rem;
    }
    &.active {
      background: linear-gradient(to right, #f27121, #e94057);
    }
  }
`;

export default Category;
