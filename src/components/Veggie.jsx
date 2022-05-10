import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

const Veggie = () => {
  const [veggie, setVeggie] = useState([]);

  useEffect(() => {
    getVeggie();
  }, []);

  const getVeggie = async () => {
    const check = localStorage.getItem("veggie");
    if (check) {
      setVeggie(JSON.parse(check));
    } else {
      const api = await fetch(
        `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_I_COOK_API}&number=9&tags=vegetarian`
      );
      const data = await api.json();
      localStorage.setItem("veggie", JSON.stringify(data.recipes));
      setVeggie(data.recipes);
    }
  };

  return (
    <Wrapper>
      <h3>Our Vegetarian Picks</h3>
      <Splide
        options={{
          perPage: 3,
          arrows: false,
          pagination: false,
          drag: "free",
          gap: "1.5rem",
        }}
      >
        {veggie.map((recipe) => {
          return (
            <SplideSlide key={recipe.id}>
              <Card to={`/recipe/${recipe.id}`}>
                <p>{recipe.title}</p>
                <span>
                  {recipe.spoonacularScore}
                  <svg
                    width="28"
                    height="27"
                    viewBox="0 0 28 27"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16.2 2.38783L18.3 6.55001C18.6 7.2437 19.3 7.73918 20.1 7.83828L24.7 8.53199C26.6 8.82929 27.4 11.1086 26 12.496L22.7 15.6671C22.1 16.1626 21.9 16.9554 22 17.7482L22.8 22.3068C23.1 24.1897 21.1 25.6761 19.4 24.7843L15.3 22.6041C14.6 22.2077 13.8 22.2077 13.1 22.6041L8.99999 24.7843C7.29999 25.6761 5.3 24.1897 5.6 22.3068L6.39998 17.7482C6.49998 16.9554 6.3 16.2617 5.7 15.6671L2.39998 12.496C0.999985 11.1086 1.8 8.82929 3.7 8.53199L8.29998 7.83828C9.09998 7.73918 9.7 7.2437 10.1 6.55001L12.2 2.38783C12.9 0.604041 15.3 0.604041 16.2 2.38783Z"
                      stroke="#fff"
                      strokeWidth="2"
                      strokeMiterlimit="10"
                    />
                  </svg>
                </span>
                <img src={recipe.image} alt={recipe.title} />
                <Gradient />
              </Card>
            </SplideSlide>
          );
        })}
      </Splide>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 4rem 0;
`;
const Card = styled(Link)`
  min-height: 17rem;
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
    transform: translate(50%, -50%);
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

export default Veggie;
