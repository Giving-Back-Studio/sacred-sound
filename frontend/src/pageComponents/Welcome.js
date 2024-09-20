import React, { useState, useEffect } from "react";
import styled from "styled-components";
import SacredSoundLogo from "../assets/WelcomeLogo.svg";
import LeftImage from "../assets/welcome.webp";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router";

export default function Welcome() {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } =
    useAuth0();
  const [userMetadata, setUserMetadata] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const getUserMetadata = async () => {
      try {
        const accessToken = await getAccessTokenSilently({
          audience: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/api/v2/`,
          scope: "read:current_user",
        });

        const userDetailsByIdUrl = `https://${process.env.REACT_APP_AUTH0_DOMAIN}/api/v2/users/${user.name}`;

        const metadataResponse = await fetch(userDetailsByIdUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const { user_metadata } = await metadataResponse.json();

        setUserMetadata(user_metadata);
      } catch (e) {
        console.log("🚀 ~ getUserMetadata ~ e:", e);
        console.log(e.message);
      }
    };
    if (isLoading == false) {
      getUserMetadata();
    }
    console.log(userMetadata);
  }, [isLoading]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (isAuthenticated && user) {
          // Check if user is authenticated and exists
          const response = await axios.get(
            `${process.env.REACT_APP_API_BASE_URL}/api/b_getUserExist/${user.name}`
          );
          if (
            response.data.user.isOnboardingStepsPending &&
            response.data.user.currentOnBoardingStep === 0
          ) {
            await axios.post(
              `${process.env.REACT_APP_API_BASE_URL}/api/PostUserOnboardingProgress`,
              {
                userId: user.name,
                currentStep: 1,
                isOnboardingStepsPending: true,
              }
            );
          } else {
            navigate("/studio");
          }
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          navigate("/AccountNameSelection");
        } else {
          console.log("Error:", error.message);
        }
      }
    };
    fetchUser();
  }, [isAuthenticated, user, navigate]);

  return (
    <WelcomeWrapper>
      <img className="welcome-logo" src={SacredSoundLogo} alt="logo" />
      <div className="section-outer d-flex">
        <WelcomeLeft>
          <img src={LeftImage} alt="logo" />
        </WelcomeLeft>
        <WelcomeRight>
          <div className="outerbox">
            <h1>
              Welcome to Sacred Sound Studios, <br /> your haven for sacred
              music and sound healing.
            </h1>
            <p>
              Join our community to explore the unique and transformative <br />
              power of harmonious sounds.
            </p>
            <button
              className="btn btn-send"
              type="button"
              onClick={() => navigate("/topics")}
            >
              Get started
            </button>
          </div>
        </WelcomeRight>
      </div>
    </WelcomeWrapper>
  );
}

const WelcomeWrapper = styled.div`
  height: 100vh;
  width: 100%;
  background-color: #434289;

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
  .welcome-logo {
    position: absolute;
    top: 40px;
    left: 40px;
  }
  .section-outer {
    overflow: hidden;
    @media (max-width: 767px) {
      flex-wrap: wrap;
    }
  }
`;

const WelcomeLeft = styled.div`
  width: 560px;
  height: 100vh;
  @media (max-width: 991px) {
    width: calc(100% - 50%);
  }
  @media (max-width: 767px) {
    width: 100%;
  }
  @media (max-width: 575px) {
    height: 450px;
  }
  img {
    width: 100%;
    height: 100vh;
    object-fit: cover;
    object-position: left;
    @media (max-width: 575px) {
      height: 450px;
      object-position: bottom;
    }
  }
`;

const WelcomeRight = styled.div`
  width: calc(100% - 560px);
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #434289;
  @media (max-width: 991px) {
    width: calc(100% - 50%);
  }
  @media (max-width: 767px) {
    width: 100%;
  }
  @media (max-width: 575px) {
    height: auto;
  }
  .outerbox {
    max-width: 575px;
    margin: 0 auto;
    @media (max-width: 1200px) {
      margin: 0 40px;
    }
    @media (max-width: 575px) {
      margin: 60px 40px;
    }
  }
  h1 {
    font-size: 29px;
    font-weight: 400;
    margin-bottom: 20px;
    color: #fff;
    @media (max-width: 575px) {
      font-size: 20px;
    }
  }
  p {
    font-size: 18px;
    font-weight: 400;
    color: #fff;
    font-family: "Montserrat", sans-serif;
    @media (max-width: 575px) {
      font-size: 14px;
    }
  }
  button {
    border: 1px solid #fff;
    min-width: 180px;
    height: 50px;
    margin-top: 45px;
    font-weight: 500;
    @media (max-width: 575px) {
      margin-top: 30px;
    }
  }
`;
