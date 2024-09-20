import React from 'react';
import styled from 'styled-components';

const NavigationButton = ({ onClick, active, children }) => (
  <Button onClick={onClick} active={active}>
    {children}
  </Button>
);

const Button = styled.button`
  width: 100%;
  height: 8vh;
  background-color: transparent;
  color: #434289;
  border-radius: 0px;
  border: none;
  border-right: ${({ active }) => (active ? '10px solid #434289' : 'none')};
  display: flex;
  font-size: 16px;
`;

export default NavigationButton;
