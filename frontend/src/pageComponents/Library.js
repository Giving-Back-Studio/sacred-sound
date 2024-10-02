import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import styled from "styled-components";
import axios from "axios";
import SwipeComponet from "../components/SwipeComponet";
import { setupAxiosInterceptors, getUserEmailFromToken } from "../utils/jwtUtils";

export default function Library() {
  const [recommendations_MusicVideo, setRecommendations_MusicVideo] = useState([]);
  const [recommendations_Meditation, setRecommendations_Meditation] = useState([]);
  const [recommendations_StudioRecording, setRecommendations_StudioRecording] = useState([]);
  const [userEmail, setUserEmail] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setupAxiosInterceptors(); // Setup Axios interceptors on component mount
  }, []);

  useEffect(() => {
    const { email, isValid } = getUserEmailFromToken();
    console.log("decoded userEmail: " + email);
    setUserEmail(email);

    if (!isValid) {
      navigate('/login'); // Redirect to login if token is not valid
    }
  }, [navigate]);

  useEffect(() => {
    if (!userEmail) return;

    let isMounted = true;

    const fetchRecommendations = async (scenario, setRecommendations) => {
      try {
        if (userEmail) {
          const recoResponse = await axios.get(
            `${process.env.REACT_APP_API_BASE_URL}/api/${scenario}/${userEmail}`
          );
          const contentIds = recoResponse.data.recomms.map((recomm) => recomm.id);
          const list = await Promise.all(
            contentIds.map(async (id) => {
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
    fetchRecommendations("getItemToUserRecommendations_Scenario_StudioRecording", setRecommendations_StudioRecording);

    return () => {
      isMounted = false;
    };
  }, [userEmail]);

  return (
    <MainContainer>
      <Main>
        <div className="top-section">
          <h2 className="sec-title">Music Video</h2>
          <SwipeComponet arr={recommendations_MusicVideo} />
          <h2 className="sec-title">Meditation</h2>
          <SwipeComponet arr={recommendations_Meditation} />
          <h2 className="sec-title">Studio Recording</h2>
          <SwipeComponet arr={recommendations_StudioRecording} />
          <div style={{ height: '360px', overflow: 'hidden' }}></div>
        </div>
      </Main>
    </MainContainer>
  );
}

// Adjusted styles for seamless scrolling
const MainContainer = styled.div`
  width: 100%;
  overflow-y: auto; /* Ensuring vertical scroll */
  overflow-x: hidden; /* No horizontal scroll for the whole page */
  margin: 0;
  height: 100vh; /* Full viewport height */
  background: radial-gradient(closest-side at 50% 50%, rgba(67, 66, 137, 0.2) 0%, rgba(95, 104, 94, 0.2) 100%), white;
  padding-bottom: 20px; /* Adjusted padding for bottom spacing */
`;

const Main = styled.div`
  position: relative;
  z-index: 2;
  background-color: rgba(0, 0, 0, 0);
  margin: 20px; /* Removed margin to avoid gaps */
  padding: 20px 0; /* Added padding for top and bottom spacing */
  display: flex;
  flex-direction: column; /* Use column layout for seamless stacking */
  gap: 20px; /* Space between sections */

  @media (max-width: 1440px) {
    padding: 10px 0; /* Adjust padding for smaller screens */
  }

  @media (max-width: 991px) {
    padding: 5px 0; /* Further adjust for mobile */
  }
`;