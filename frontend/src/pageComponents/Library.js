import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import SwipeComponet from "../components/SwipeComponet";

export default function Library() {
  const [recommendations_MusicVideo, setRecommendations_MusicVideo] = useState([]);
  const [recommendations_Meditation, setRecommendations_Meditation] = useState([]);
  const [recommendations_StudioRecording, setRecommendations_StudioRecording] = useState([]);

  // Helper function to check if the token is about to expire
  const isTokenExpiringSoon = (token) => {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Current time in seconds
    const tokenExpTime = decoded.exp; // Token expiration time in seconds

    // Check if the token expires in less than 5 minutes (300 seconds)
    return tokenExpTime - currentTime < 300;
  };

  // Function to refresh the access token if it's about to expire
  const refreshAccessToken = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/refresh-token`);
      localStorage.setItem('sacredSound_accessToken', response.data.accessToken); // Update the access token
      return response.data.accessToken;
    } catch (err) {
      console.error('Error refreshing access token:', err);
      // Handle token refresh failure (e.g., redirect to login)
      window.location.href = '/login'; // Redirect to login if refresh fails
      return null;
    }
  };

  // Axios interceptor to automatically refresh the token if it's expiring
  useEffect(() => {
    const interceptor = axios.interceptors.request.use(
      async (config) => {
        let token = localStorage.getItem('sacredSound_accessToken');
        
        // Check if the token is about to expire
        if (token && isTokenExpiringSoon(token)) {
          token = await refreshAccessToken(); // Refresh token if needed
          if (token) {
            // If the token was refreshed, update the request headers
            config.headers['Authorization'] = `Bearer ${token}`;
          }
        }
        
        // Continue with the request
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    return () => axios.interceptors.request.eject(interceptor); // Clean up interceptor on unmount
  }, []);

  // Decode the access token from localStorage to get the user email
  const token = localStorage.getItem('sacredSound_accessToken');
  let userEmail = null;
  if (token) {
    const decoded = jwtDecode(token); // Decode the JWT token
    userEmail = decoded.email;
    console.log("userEmail: " + userEmail); // Extract email from the decoded token
  }

  useEffect(() => {
    let isMounted = true;

    const fetchRecommendations = async (scenario, setRecommendations) => {
      try {
        if (userEmail) {
          const recoResponse = await axios.get(
            `${process.env.REACT_APP_API_BASE_URL}/api/${scenario}/${userEmail}`
          );
          const videoIds = recoResponse.data.recomms.map((recomm) => recomm.id);
          
          const list = await Promise.all(
            videoIds.map(async (id) => {
              try {
                const videoResp = await axios.get(
                  `${process.env.REACT_APP_API_BASE_URL}/api/getVideoMetaDataFromObjectId/${id}`
                );
                return { ...videoResp.data };
              } catch (error) {
                return null;
              }
            })
          );

          const filteredList = list.filter(item => item !== null);
          console.log(`Final ${scenario} recommendations list:`, filteredList);
          
          if (isMounted) {
            setRecommendations(filteredList);
          }
        }
      } catch (error) {
        console.error(`Error fetching ${scenario} recommendations:`, error);
      }
    };

    fetchRecommendations("getItemToUserRecommendations_Scenario_MusicVideo", setRecommendations_MusicVideo);
    fetchRecommendations("getItemToUserRecommendations_Scenario_Meditation", setRecommendations_Meditation);
    fetchRecommendations("StudioRecording", setRecommendations_StudioRecording);

    return () => {
      isMounted = false;
    };
  }, [userEmail]);

  return (
    <MainContainer>
      <Main>
        <div className="top-section">
          <h2 className="sec-title">Music Video</h2>
          <SwipeComponet arr={recommendations_MusicVideo}></SwipeComponet>
          <h2 className="sec-title">Meditation</h2>
          <SwipeComponet arr={recommendations_Meditation}></SwipeComponet>
          <h2 className="sec-title">Studio Recording</h2>
          <SwipeComponet style={{paddingBottom: "300px"}} arr={recommendations_StudioRecording}></SwipeComponet>
        </div>
      </Main>
    </MainContainer>
  );
}

const MainContainer = styled.div`
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  margin: 0;
  height: 100vh;
  background: radial-gradient(closest-side at 50% 50%, rgba(67, 66, 137, 0.2) 0%, rgba(95, 104, 94, 0.2) 100%), white;
  padding-bottom: 360px;
`;

const Main = styled.div`
  position: relative;
  z-index: 2;
  background-color: rgba(0, 0, 0, 0);
  margin: 55px;
  padding: 0;
  height: 110vh;

  @media (max-width: 1440px) {
    margin: 20px;
  }

  @media (max-width: 991px) {
    margin: 10px;
    padding-top: 22px;
  }

  @media (max-width: 360px) {
    margin: 5px;
    padding-top: 22px;
  }
`;
