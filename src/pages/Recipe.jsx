import { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

import React from "react";

const Recipe = () => {
  const [detail, setDetail] = useState({});

  const [activeButton, setActiveButton] = useState("instructions");

  let params = useParams();
  useEffect(() => {
    getDetails();
  }, [params.id]);

  const getDetails = async () => {
    const check = localStorage.getItem(`Detail of ${params.id}`);

    if (check) {
      setDetail(JSON.parse(check));
    } else {
      const api = await fetch(
        `https://api.spoonacular.com/recipes/${params.id}/information?apiKey=${process.env.REACT_APP_I_COOK_API}`
      );
      const data = await api.json();
      localStorage.setItem(`Detail of ${params.id}`, JSON.stringify(data));
      setDetail(data);
    }
  };

  return (
    <DetailContainer
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <h2>{detail.title}</h2>
      <DetailWrapper>
        <ImgContainer>
          <img src={detail.image} alt={detail.title} />
        </ImgContainer>
        <Info>
          <Button
            className={activeButton === "instructions" ? "active" : ""}
            onClick={() => setActiveButton("instructions")}
          >
            Instructions
          </Button>
          <Button
            className={activeButton === "ingredients" ? "active" : ""}
            onClick={() => setActiveButton("ingredients")}
          >
            Ingredients
          </Button>
          {activeButton === "instructions" && (
            <div>
              <h3 dangerouslySetInnerHTML={{ __html: detail.summary }}></h3>
              <h3
                dangerouslySetInnerHTML={{ __html: detail.instructions }}
              ></h3>
            </div>
          )}
          {activeButton === "ingredients" && (
            <ul>
              {detail.extendedIngredients.map((ingredient) => (
                <li key={ingredient.id}>{ingredient.original}</li>
              ))}
            </ul>
          )}
        </Info>
      </DetailWrapper>
    </DetailContainer>
  );
};

const DetailContainer = styled(motion.div)`
  margin: 3rem 0;
`;
const DetailWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  @media screen and (max-width: 950px) {
    display: block;
  }

  .active {
    color: white;
    background: linear-gradient(35deg, #494949, #313131);
  }

  h2 {
    margin: 1rem 0;
    padding: 1rem 0;
  }
  li {
    font-size: 1.2rem;
    line-height: 2rem;
    /* list-style: none; */
  }
`;

const ImgContainer = styled.div`
  flex: 1 1 25rem;
  margin-right: 2rem;
  @media screen and (max-width: 950px) {
    margin-right: 0rem;
  }
  img {
    margin: 1rem 0;
    width: 100%;
    object-fit: cover;
  }
`;
const Button = styled.button`
  padding: 1rem 2rem;
  background: white;
  color: #313131;
  border: 2px solid;
  border-color: #313131;
  font-weight: 600;
  font-size: 1rem;
  margin-right: 2rem;
`;
const Info = styled.div`
  margin: 1rem 0;
  flex: 2 1 25rem;
  div {
    margin: 1rem 0;
    h3 {
      a {
        display: none;
      }
      b {
        color: #000;
      }
    }
  }
  ul {
    margin: 1rem 0;
  }
`;

export default Recipe;
