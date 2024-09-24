import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError(''); // Clear previous errors
  
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/login`, {
      email,
      password
    });

    // Store the access token in localStorage
    localStorage.setItem('sacredSound_accessToken', response.data.accessToken);

    // The refresh token should be stored in an HTTP-only cookie on the backend.
    navigate('/main/library');
  } catch (err) {
    setError(err.response?.data?.message || 'An error occurred during login');
  }
};

  return (
    <LoginContainer>
      <Title>Welcome!</Title>
      <Subtitle>We’re Glad to see you</Subtitle>
      {error && <ErrorMessage>{error}</ErrorMessage>} {/* Show error message if login fails */}
      <form onSubmit={handleSubmit}>
        <Input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Type a password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit">Login</Button>
      </form>
      <Subtitle><a href="/forgot">Forgot the password?</a></Subtitle>
      <Subtitle>Don’t have an account? <a href="/signup">Sign up</a></Subtitle>
    </LoginContainer>
  );
};

export default Login;

const ErrorMessage = styled.div`
  color: red;
  margin-bottom: 10px;
`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(to bottom, #a1c4fd, #c2e9fb);
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 10px;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  height: 50px;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box; /* Include padding and border in width */
`;

const Button = styled.button`
  width: 100%;
  height: 50px;
  padding: 10px;
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  box-sizing: border-box;

  &:hover {
    background-color: #357ab8;
  }
`;
