import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import background from "../assets/images/bgc.jpg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  let history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("https://cors-anywhere.herokuapp.com/http://challenge-react.alkemy.org/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.token) {
          localStorage.setItem("key", data.token);
          history.push("/");
        } else {
          setError(data.error);
        }
      });
  }

  return (
    <Container background={background}>
      <LoginForm onSubmit={handleSubmit} background={background}>
        <LogoContainer>
          <h1>SuperHero Legends</h1>
        </LogoContainer>
        <HeaderContainer>
          <h2>Sign In</h2>
        </HeaderContainer>
        <InputContainer>
          <input
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </InputContainer>

        <span>{error}</span>
        <Button type="submit">Login</Button>
      </LoginForm>
  </Container>
  );
};

const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--black);
  background-position: center center;
  background-size: contain;
  background-repeat: no-repeat;
`;

const LoginForm = styled.form`
  width: 500px;
  height: 700px;
  grid-column: 2;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding: 100px;
  background: url(${(props) => props.background});
  background-size: cover;
  color: var(--white);
  box-shadow: 0px 8px 15px 0px #000000;
  border-radius: 15px;
  background-repeat: no-repeat;
  text-align: center;

  span{
    color:red;
  }

  @media (max-width:600px){
    width:300px;
    height:500px;
    padding:50px;
  }
`;

const InputContainer = styled.div`
  input {
    width: 100%;
    padding: 10px 20px;
    margin: 10px 0px;
    border-radius: 10px;
    border: none;
    outline: none;
  }
`

const LogoContainer = styled.div`
  text-align: center;
  color:var(--white);
`

const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  h2 {
    padding: 20px;
    border-radius: 10px;
    color: var(--white);
    font-size: 23px;
    letter-spacing: 1px;
  }
`;


const Button = styled.button`
  width: 100%;
  background-color: var(--orange);
  padding: 10px;
  border: none;
  border-radius: 10px;
  color: var(--white);
  transition: 300ms ease-in-out;
  cursor: pointer;
`;

export default Login;
