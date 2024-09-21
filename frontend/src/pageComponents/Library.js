import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import SwipeComponet from "../components/SwipeComponet";

import { useOutletContext } from "react-router-dom";
export default function Library() {
  // const { user, isAuthenticated } = useAuth0();
  // const isAuthenticated = true;
  const user ={ name: "debug9@debug.com" }
  const [recommendations_MusicVideo, setRecommendations_MusicVideo] = useState([]);
  const [recommendations_Meditation, setRecommendations_Meditation] = useState([]);
  const [recommendations_StudioRecording, setRecommendations_StudioRecording] = useState([]);
  const userEmail = user ? user.name : null;
  useEffect(() => {
    let isMounted = true;

    const fetchRecommendations = async (scenario, setRecommendations) => {
      try {
        if (user) {
          const recoResponse = await axios.get(
            `${process.env.REACT_APP_API_BASE_URL}/api/${scenario}/${user.name}`
          );
          const videoIds = recoResponse.data.recomms.map((recomm) => recomm.id);
          
          const list = await Promise.all(
            videoIds.map(async (id) => {
              try {
                const videoResp = await axios.get(
                  `${process.env.REACT_APP_API_BASE_URL}/api/getVideoMetaDataFromObjectId/${id}`
                );
                return {
                  ...videoResp.data,
                };
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
          <SwipeComponet arr={recommendations_MusicVideo}></SwipeComponet>
          <h2 className="sec-title">Meditation</h2>
          <SwipeComponet arr={recommendations_Meditation}></SwipeComponet>
          <h2 className="sec-title">Studio Recording</h2>
          <SwipeComponet arr={recommendations_StudioRecording}></SwipeComponet>
        </div>
      </Main>
    </MainContainer>
  );
}

const MainContainer = styled.div`
  width: 100%;
  overflow-y: auto; // Ensure it's scrollable
  overflow-x: hidden;
  margin: 0; // Remove margins from MainContainer
  height: 100vh; // Fill the entire viewport height
  background-color: #CCE6E6; // Change background to CCE6E6
  // Remove animation properties
  // ... existing styles ...
`;

const Main = styled.div`
  position: relative;
  z-index: 2; // Add z-index
  background-color: rgba(0, 0, 0, 0); // Keep the background transparent
  margin: 55px; // Add margins to Main
  padding: 0 0 120px 0; // Keep padding for Main
  height: calc(100vh - 120px); // Adjust height for Main
`;