import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { GiKnifeFork } from "react-icons/gi";

const Nav = () => {
  return (
    <NavStyled>
      <GiKnifeFork />
      <Logo to={"/"}>ICOOK</Logo>
    </NavStyled>
  );
};

const NavStyled = styled.div`
  margin: 1rem auto;
  width: 90%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  svg {
    font-size: 2rem;
  }
`;

const Logo = styled(Link)`
  text-decoration: none;
  font-family: "Lobster", cursive;
  font-weight: 400;
  font-size: 1.5rem;
`;

export default Nav;
