import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

export default function Welcome() {
  const { userEmail } = useAuth();
  const [userMetadata, setUserMetadata] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getUserMetadata = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/api/getUserMetadata/${userEmail}`
        );

        const { user_metadata } = response.data;
        setUserMetadata(user_metadata);
      } catch (e) {
        console.log("🚀 ~ getUserMetadata ~ e:", e);
        console.log(e.message);
      }
    };

    if (userEmail) {
      getUserMetadata();
    }
  }, [userEmail]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (userEmail) {
          // Check if user is authenticated and exists
          const response = await axios.get(
            `${process.env.REACT_APP_API_BASE_URL}/api/b_getUserExist/${userEmail}`
          );
          if (
            response.data.user.isOnboardingStepsPending &&
            response.data.user.currentOnBoardingStep === 0
          ) {
            await axios.post(
              `${process.env.REACT_APP_API_BASE_URL}/api/PostUserOnboardingProgress`,
              {
                userId: userEmail,
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
  }, [userEmail, navigate]);

  return (
    <div>
      <h1>Welcome, {userEmail}</h1>
      {userMetadata && <p>{userMetadata}</p>}
    </div>
  );
}