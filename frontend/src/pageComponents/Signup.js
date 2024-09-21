import React, { useState } from 'react';
import styled from 'styled-components';

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

const Signup = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle signup logic here
  };

  return (
    <SignupContainer>
      <Title>Create your account</Title>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
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
        <Button type="submit">Sign up</Button>
      </form>
      <Subtitle>Already have an account? <a href="/login">Login Now</a></Subtitle>
    </SignupContainer>
  );
};

export default Signup;
