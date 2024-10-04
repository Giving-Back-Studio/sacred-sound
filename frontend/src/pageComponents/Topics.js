import React, { useState, useEffect } from "react";
import styled from "styled-components";
import SacredSoundLogo from "../assets/WelcomeLogo.svg";
import { useNavigate } from "react-router";
import axios from "axios";
import { useAuth } from '../context/AuthContext'; // Import your custom useAuth hook

export default function TopicsPage() {
  const { userEmail } = useAuth(); // Use the custom hook to get the user's email
  const [topics, setTopics] = useState([
    "Rock", "Pop", "Hip-hop", "Jazz", "Blues", "Country", "Classical", "R&B",
    "Reggae", "Electronic", "Folk", "Metal", "Punk", "Disco", "Alternative",
    "Indie", "Rap", "Techno", "Dance", "Gospel", "House", "Trance", "EDM",
    "Latin", "Dubstep", "Chill", "Ambient", "Trap", "K-Pop", "RapRock",
    "Grudge", "Hardrock", "Acoustic",
  ]);
  const [selectedTopics, setSelectedTopics] = useState([]);
  const navigate = useNavigate();

  const handleSelectedTopics = (selection) => {
    setSelectedTopics(
      selectedTopics.includes(selection)
        ? selectedTopics.filter((item) => item !== selection)
        : [...selectedTopics, selection]
    );
  };

  const handleContinueClick = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/PostUserOnboardingProgress`,
        {
          userId: userEmail,
          currentStep: 2,
          topicChoices: selectedTopics,
          isOnboardingStepsPending: true,
        }
      );
      navigate("/payment-details");
    } catch (error) {
      if (error.response && error.response.status === 404) {
        navigate("/welcome");
      } else {
        console.log("Error:", error.message);
      }
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (userEmail) {
          const response = await axios.get(
            `${process.env.REACT_APP_API_BASE_URL}/api/b_getUserExist/${userEmail}`
          );
          if (
            response.data.user.isOnboardingStepsPending &&
            response.data.user.currentOnBoardingStep === 1
          ) {
            await axios.post(
              `${process.env.REACT_APP_API_BASE_URL}/api/PostUserOnboardingProgress`,
              {
                userId: userEmail,
                currentStep: 2,
                isOnboardingStepsPending: true,
              }
            );
          } else {
            navigate("/studio");
          }
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          navigate("/welcome");
        } else {
          console.log("Error:", error.message);
        }
      }
    };
    fetchUser();
  }, [userEmail]);

  return (
    <TopicWrapper>
      <img className="welcome-logo" src={SacredSoundLogo} alt="logo" />
      <div className="section-outer d-flex">
        <h1>Select topics you love</h1>
        <Topics>
          <div className="topic-box">
            {topics.map((genre) => (
              <label key={genre}>
                <input
                  type="checkbox"
                  onChange={() => handleSelectedTopics(genre)}
                />
                <span>{genre}</span>
              </label>
            ))}
          </div>
        </Topics>
        <TopicFooter className="topic-footer">
          <button
            className="btn btn-skip"
            type="button"
            onClick={handleContinueClick}
          >
            Skip
          </button>
          <button
            className="btn btn-send"
            type="button"
            onClick={handleContinueClick}
          >
            Continue
          </button>
        </TopicFooter>
      </div>
    </TopicWrapper>
  );
}

const TopicWrapper = styled.div`
  min-height: 100vh;
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
    justify-content: center;
    align-items: center;
    height: 100vh;
    flex-direction: column;
    max-width: 600px;
    margin: 0 auto;
    @media (max-width: 767px) {
      padding: 0 24px;
      height: 100%;
      padding-top: 200px;
    }
    h1 {
      font-size: 29px;
      font-weight: 400;
      margin-bottom: 50px;  
      color: #fff;
      @media (max-width: 575px) {
        font-size: 20px;
      }
    }
  }
`;

const Topics = styled.div`
  .topic-box {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 10px;
    label {
      cursor: pointer;
      margin-bottom: 0;
      span {
        text-align: center;
        padding: 6px 16px;
        display: block;
        background-color: #f5f5f5;
        color: #434289;
        border-radius: 50px;
        font-size: 14px;
        font-weight: 500;
      }
      input {
        position: absolute;
        display: none;
        color: #fff !important;
        &:checked + span {
          color: #ffffff;
          text-shadow: 0 0 6px rgba(0, 0, 0, 0.8);
          background-color: #687550;
        }
      }
    }
  }
`;

const TopicFooter = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 60px;
  .btn-skip {
    text-decoration: underline;
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 1px;
    padding-left: 0;
    padding-right: 10px;
  }
  .btn-send {
    border: 1px solid #fff;
    min-width: 180px;
    height: 50px;
    font-size: 14px;
    font-weight: 500;
  }
`;