import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import bgcLeft from "../images/bgc.jpg";
import background from "../images/screen.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  let history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://challenge-react.alkemy.org/", {
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
        // I would remove this
        console.log(data);
      });
  };

  return (
    <Container background={background}>
      <LoginForm onSubmit={handleSubmit} background={bgcLeft}>
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
`;

const InputContainer = styled.div`
  input {
    width: 100%;
    padding: 10px 20px;
    margin: 10px 0px;
    border-radius: 10px;
    border: none;
    outline: none;
    :focus {
      border: 1px solid var(--pink);
    }
  }
`

const LogoContainer = styled.div`
`

const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
  h2 {
    color: var(--pink);
    font-size: 23px;
    letter-spacing: 1px;
  }
`;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  grid-column: 1;
  grid-row: 1;
  background: url(${(props) => props.background});
  background-position: center center;
  background-size: cover;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  box-shadow: 0px 8px 15px 0px #000000;
`;

const TextLogin = styled.div`
  color: var(--white);
  text-align: center;
  width: 80%;
  h2 {
    margin: 10px 0px;
    font-size: 30px;
    text-shadow: 0px 0px 10px var(--black);
  }

  p {
    font-size: 20px;
    text-shadow: 0px 0px 10px var(--black);
  }
`;

const Button = styled.button`
  width: 100%;
  background-color: var(--pink);
  padding: 10px;
  border: none;
  border-radius: 10px;
  color: var(--white);
  transition: 300ms ease-in-out;
  cursor: pointer;
  :hover {
    background: var(--pink-hover);
  }
`;

export default Login;
