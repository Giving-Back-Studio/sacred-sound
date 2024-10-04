import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();
  setError(''); // Clear previous errors
  console.log('Form submitted with:', { email, password });

  try {
    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    console.log("API Response:", data);

    if (data && data.accessToken) {
      console.log("Access token received:", data.accessToken);

      // Overwrite the token in localStorage with the new one from the server
      localStorage.setItem('sacredSound_accessToken', data.accessToken);
      console.log("Access token stored in localStorage");

      // Navigate to the library after storing the token
      console.log("Navigating to library...");
      navigate('/main/library');
    } else {
      console.log("Login failed, no access token");
      setError('Login failed. Please try again.');
    }
  } catch (err) {
    console.error("Login error:", err.message);
    setError('An error occurred during login');
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
          onChange={(e) => {
            console.log("Email input changed:", e.target.value);
            setEmail(e.target.value);
          }}
          required
        />
        <Input
          type="password"
          placeholder="Type a password"
          value={password}
          onChange={(e) => {
            console.log("Password input changed:", e.target.value);
            setPassword(e.target.value);
          }}
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