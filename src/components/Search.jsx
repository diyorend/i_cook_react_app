import styled from "styled-components";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [inputVal, setInputVal] = useState("");

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    navigate(`/searched/${inputVal}`);
    setInputVal("");
  };

  return (
    <FormStyled onSubmit={submitHandler}>
      <FaSearch />
      <Input
        onChange={(e) => setInputVal(e.target.value)}
        type="text"
        value={inputVal}
      />
    </FormStyled>
  );
};

const Input = styled.input`
  border: none;
  outline: none;
  border-radius: 1rem;
  padding: 1rem 3rem;
  background: linear-gradient(35deg, #494949, #313131);
  color: white;
  width: 100%;
  font-size: 1.2rem;
`;

const FormStyled = styled.form`
  position: relative;
  width: 50%;
  margin: auto;
  @media screen and (max-width: 900px) {
    width: 90%;
  }
  svg {
    pointer-events: none;
    position: absolute;
    top: 50%;
    left: 0px;
    transform: translate(70%, -50%);
    cursor: pointer;
    color: white;
    font-size: 1.5rem;
  }
`;

export default Search;
