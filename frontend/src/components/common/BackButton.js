import React from "react";
import styled from "styled-components";
import BackImg from "../../assets/Go-Back.svg";
import BackImgBlack from "../../assets/Go-Back.svg";
import { useNavigate } from "react-router-dom";
export default function BackButton({black}) {
  const navigate = useNavigate();
  return (
    <BackIcon onClick={() => navigate(-1)}>
      <img src={black ? BackImgBlack : BackImg} alt="not loaded" ></img>
    </BackIcon>
  );
}

const BackIcon = styled.div`
  position: absolute;
  z-index: 9;
  padding: 15px;
  margin: 20px 0px 0px;
  cursor: pointer;
  @media (max-width: 991px) {
    top: 20px;
  }
`;
