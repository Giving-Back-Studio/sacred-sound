import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const Signup = () => {
  const [accountName, setAccountName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isArtist, setIsArtist] = useState(false); // New state for isArtist
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const artistFlag = queryParams.get('artist');
    if (artistFlag === 'true') {
      setIsArtist(true);
    }
  }, [location.search]);

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/signup`, {
      accountName,
      email,
      password,
      isArtist
    });
    
    // Store the access token in localStorage
    localStorage.setItem('sacredSound_accessToken', response.data.accessToken);

    // The refresh token should be stored in an HTTP-only cookie on the backend.
    // Redirect to the home page or dashboard
    navigate('/main/library');
  } catch (err) {
    setError(err.response?.data?.message || 'An error occurred during signup');
  }
};


  return (
    <SignupContainer>
      <Title>Create your account</Title>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Choose a unique name for your account."
          value={accountName}
          onChange={(e) => setAccountName(e.target.value)}
          required
        />
        <Input
          type="email"
          placeholder="What's your email address?"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Set your a password."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit">Join Sacred Sound</Button>
      </form>
      <Subtitle>Already have an account? <a href="/login">Login Now</a></Subtitle>
    </SignupContainer>
  );
};

export default Signup;

const ErrorMessage = styled.div`
  color: red;
  margin-bottom: 10px;
`;

const SignupContainer = styled.div`
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
  box-sizing: border-box; /* Include padding and border in width */

  &:hover {
    background-color: #357ab8;
  }
`;