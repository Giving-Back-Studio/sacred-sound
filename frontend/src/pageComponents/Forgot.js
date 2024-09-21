import React, { useState } from 'react';
import styled from 'styled-components';

const ForgotPasswordContainer = styled.div`
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
  height: 50px; /* Uniform height */
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box; /* Include padding and border in width */
`;

const Button = styled.button`
  width: 100%;
  height: 50px; /* Uniform height */
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

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle forgot password logic here
  };

  return (
    <ForgotPasswordContainer>
      <Title>Forgot Password</Title>
      <Subtitle>Enter your email to reset your password</Subtitle>
      <form onSubmit={handleSubmit}>
        <Input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Button type="submit">Send Reset Link</Button>
      </form>
      <Subtitle>Remembered your password? <a href="/login">Login Now</a></Subtitle>
    </ForgotPasswordContainer>
  );
};

export default ForgotPassword;
