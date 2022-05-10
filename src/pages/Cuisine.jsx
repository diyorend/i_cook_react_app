import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";

const Cuisine = () => {
  const [cuisine, setCuisine] = useState([]);
  let params = useParams();
  useEffect(() => {
    getCuisine(params.type);
  }, [params.type]);

  const getCuisine = async (name) => {
    const check = localStorage.getItem(`cuisine ${name}`);

    if (check) {
      setCuisine(JSON.parse(check));
    } else {
      const api = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_I_COOK_API}&cuisine=${name}&number=25`
      );
      const data = await api.json();
      localStorage.setItem(`cuisine ${name}`, JSON.stringify(data.results));
      setCuisine(data.results);
    }
  };

  return (
    <Grid
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {cuisine.map((result) => {
        return (
          <Card key={result.id} to={`/recipe/${result.id}`}>
            <p>{result.title}</p>
            <img src={result.image} alt={result.title} />
            <Gradient />
          </Card>
        );
      })}
    </Grid>
  );
};

const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  grid-gap: 2rem;
`;

const Card = styled(Link)`
  min-height: 15rem;
  position: relative;
  border-radius: 1.5rem;
  overflow: hidden;

  p {
    position: absolute;
    z-index: 2;
    left: 50%;
    bottom: 0%;
    transform: translate(-50%, 0%);
    color: white;
    width: 100%;
    text-align: center;
    font-weight: 600;
    font-size: 1rem;
    height: 30%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  span {
    position: absolute;
    z-index: 2;
    top: 10%;
    right: 10%;
    font-weight: 600;
    padding: 0.3rem;
    color: white;
    background: #19ad6f;
    border-radius: 0.5rem;
    transform: translate(30%, -50%);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    svg {
      margin-left: 0.2rem;
      height: 1.2rem;
      width: 1.2rem;
    }
  }
  img {
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
`;

const Gradient = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 1;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5));
`;

export default Cuisine;
