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
  const [recommendations, setRecommendations] = useState([]);
  const userEmail = user ? user.name : null;
  useEffect(() => {
  let isMounted = true;

  const fetchRecommendations = async () => {
    try {
      if (user) {
        console.log("Fetching recommendations for user:", user.name);
        const recoResponse = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/api/getItemToUserRecommendations_Scenario_MusicVideo/${user.name}`
        );
        console.log("Received recommendation response:", recoResponse.data);
        const videoIds = recoResponse.data.recomms.map((recomm) => recomm.id);
        console.log("Extracted video IDs:", videoIds);
        
        const list = await Promise.all(
          videoIds.map(async (id) => {
            try {
              const videoResp = await axios.get(
                `${process.env.REACT_APP_API_BASE_URL}/api/getVideoMetaDataFromObjectId/${id}`
              );
              return {
                ...videoResp.data,
                contentType: "recommendation",
              };
            } catch (error) {
              console.error(`Error fetching metadata for video ID ${id}:`, error);
              return null;
            }
          })
        );

        const filteredList = list.filter(item => item !== null);
        console.log("Final recommendations list:", filteredList);
        
        if (isMounted) {
          setRecommendations(filteredList);
        }
      }
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    }
  };

  fetchRecommendations();

  return () => {
    isMounted = false;
  };
}, [userEmail]);

  return (
    <MainContainer>
      <CoverSection>
        <CoverImage>
        </CoverImage>
      </CoverSection>
      <Main>
            <div className="top-section">
              <h2 className="sec-title">Music Video</h2>
              <SwipeComponet arr={recommendations}></SwipeComponet>
            </div>
            {/* <h2 className="sec-title">Meditation</h2>
            <SwipeComponet arr={recommendations}></SwipeComponet>
            <h2 className="sec-title">Studio recording</h2>
            <SwipeComponet arr={recommendations}></SwipeComponet> */}
      </Main>
    </MainContainer>
  );
}

const MainContainer = styled.div`
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  margin: 0;
  padding: 0 0 120px 0; // Add padding to the bottom
  height: calc(100vh - 120px); // Adjust height to account for MusicPlayer
  @media (max-width: 1000px) {
    height: calc(100vh - 200px); // Adjust for mobile view
  }
  .sec-title {
    margin: 15px 20px;
  }
  .top-section {
    margin-top: -130px;
    z-index: 3; // Increase z-index
    position: relative;
    h2 {
      color: #fff;
    }
  }
`;

const CoverSection = styled.div`
  width: 100%;
  height: 350px;
  background-color: #d9d9d9;
  margin-bottom: 20px;
  overflow: hidden;
  position: relative;
`;

const CoverImage = styled.div`
  position: relative;
  z-index: 1; // Decrease z-index
  height: 400px;
  background: linear-gradient(135deg, #434289 0%, #687550 100%);
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    height: 99%;
    width: 100%;
    background: linear-gradient(135deg, #434289 0%, #687550 100%);
    z-index: 1;
  }
  @media (max-width: 767px) {
    height: 100%;
  }
`;

const ButtonTabs = styled.div`
  display: flex;
  height: 100%;
  flex-direction: row;
  align-items: center;
  margin: 0 20px;
  position: absolute;
  top: 0;
  z-index: 4; // Increase z-index
  button {
    height: 50px;
    margin-right: 10px;
  }
`;

const Main = styled.div`
  position: relative;
  z-index: 2; // Add z-index
  background-color: rgba(0, 0, 0, 0);
`;