import React from "react";
import styled from "styled-components";

import ProfileIcon from "../assets/Profile-Icon.svg";
import Lock from "../assets/lock.svg";
import Receipt from "../assets/receipt.svg";
import Credit from "../assets/credit-card.svg";
import { Link } from "react-router-dom";
import "react-responsive-modal/styles.css";
import ThanksGivingPopup from "../components/common/ThanksGivingPopup";

export default function MyAccount() {
  return (
    <PageWrapper className="concert-wrapper">
      <ProfileHead>
        <div className="profile-icon d-flex align-item-center">
          <img className="" src={ProfileIcon} alt="Album Cover" />
        </div>
      </ProfileHead>
      <Subscription>
        <ActionBar>
          <div className="subscription-plan">
            <p>Your subscription</p>
            <h1>Flexible Subscription</h1>
            <p>Your next bill is for $120 on January 24, 2024</p>
            <p>Visa ending in 8643</p>
          </div>

          
          <ThanksGivingPopup/>
        </ActionBar>
        <Link to="/myAccount/manage-plan">Manage your subscription</Link>
      </Subscription>
      <LinkSection>
        <h4>Account</h4>
        <div className="link-name">
          <img src={ProfileIcon} alt="Album" />
          <a href="#!">Edit profile</a>
        </div>
        <div className="link-name">
          <img src={Lock} alt="Album" />
          <a href="#!">Change password</a>
        </div>
      </LinkSection>
      <LinkSection>
        <h4>Payment</h4>
        <div className="link-name">
          <img src={Receipt} alt="Album" />
          <Link to="/myAccount/orders">Order history</Link>
        </div>
        <div className="link-name">
          <img src={Credit} alt="Album" />
          <Link to="/myAccount/save-card">Saved payment cards</Link>
        </div>
      </LinkSection>
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  width: 100%;
  height: 100vh;
  a{
    color: #434289;
    font-size: 16px;
    font-family: 'Montserrat', sans-serif;
    display: block;
    width: max-content;
  }
  * {
    background-color: transparent;
  }
  .d-flex {
    display: flex;
  }
  .align-item-center {
    align-items: center;
  }
  .justify-between {
    justify-content: space-between;
  }
  .justify-end {
    justify-content: flex-end;
  }
`;

const ProfileHead = styled.div`
  padding: 30px;
  padding-bottom: 0;
  @media (max-width: 575px) {
    padding: 15px;
  }
  .profile-icon {
    justify-content: flex-end;
    margin-bottom: 14px;
    img {
      cursor: pointer;
      width: 40px;
      height: 40px;
    }
  }
`;

const Subscription = styled.div`
  padding: 30px;
  padding-top: 0;
  margin-bottom: 30px;
  @media (max-width: 575px) {
    padding: 15px;
  }
  a{
    font-weight: 700;
    margin-top: 20px;
  }
`;

const ActionBar = styled.div`
  display: flex;
  align-items: flex-start;
.subscription-plan{
  h1{
    margin-top: 0;
  }
  p{
   margin: 0;
   font-weight: 300;
   font-size: 16px;
  }
}
  .give-thanks {
    background-color: #687550;
    width: fit-content;
    border-radius: 50px;
    padding: 10px 15px;
    display: flex;
    align-items: center;
    gap: 10px;
    color: #fff;
    cursor: pointer;
    margin: 0 0 0 auto;
    margin-right: 80px;
    @media (max-width:991px){
      position: absolute;
       top: 26px;
        right: 10px;
    }
    @media (max-width:575px){
       top: 12px;
       right: 0px;
    }
  }
`;

const LinkSection = styled.div`
  border-top: 1px solid #D9D9D9;
  padding: 35px 0;
  margin: 0 30px;
  @media (max-width:767px){
       margin: 0 15px;
       padding: 22px 0;
  }
  h4{
    font-size: 16px;
    font-weight: 700;
    font-family: 'Montserrat', sans-serif;
  }
  .link-name{
    display: flex;
    align-items: center;
    gap: 10px;
    padding-top: 35px;
    @media (max-width:767px){
     padding-top: 22px;
  }
    img{
      width: 30px;
      height: 30px;
    }
  }
`;