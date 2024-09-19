import React, { useState } from 'react';
import styled from 'styled-components';
import { GlobalStyle } from '../components/GlobalStyle';
import TagComponent from '../components/TagComponent';

function TestPage() {


  return (
    <>
      <TagComponent />
    </>
  );
}

export default TestPage;

const PopupContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PopupBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 0;
`;

const PopupWrapper = styled.div`
  position: relative;
  z-index: 3;
  border-radius: 33px;
  padding: 20px;
  background-color: rgba(163, 196, 163, 0.22);

`;

const CenteredButton = styled.button`
    border: none;
    color: #F5F5F5;
    background-color: #434289;
    border-radius: 33px;
    align-self: center;
    cursor: pointer;
    width: 100%;
    margin-top: 20px;
    padding: 11px;
    `;

//background-color: #A3C4A338;