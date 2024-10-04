import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const LoginButton = () => {
  const navigate = useNavigate();

  const handleArtistSignup = () => {
    navigate('/signup?artist=true');
  };

  return (
    <SignupButton onClick={handleArtistSignup}>
      Become a Resident Artist
    </SignupButton>
  );
};

export default LoginButton;

const SignupButton = styled.button`
  border: none;
  color: #F5F5F5;
  background-color: #434289;
  border-radius: 33px;
  cursor: pointer;
  display: flex; // Use flex to center content
  justify-content: center; // Center horizontally
  align-items: center; // Center vertically
  height: 100%;
  @media (max-width: 768px) {
    display: none; // Hide button on small screens for the /create page
  }
`;