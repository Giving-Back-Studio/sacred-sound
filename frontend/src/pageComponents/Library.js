import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import SwipeComponet from "../components/SwipeComponet";
import { useAuth } from "../context/AuthContext";

export default function Library() {
  const [recommendations_MusicVideo, setRecommendations_MusicVideo] = useState([]);
  const [recommendations_Meditation, setRecommendations_Meditation] = useState([]);
  const [recommendations_StudioRecording, setRecommendations_StudioRecording] = useState([]);
  const [error, setError] = useState(null); // Error state to handle API errors
  const { userEmail, loading } = useAuth();  // Get the userEmail and loading state from the AuthProvider

  // Add logging to verify component rendering
  console.log("Library component rendered");
  console.log("userEmail:", userEmail);
  console.log("loading:", loading);

  // Fetch recommendations when userEmail is available
  useEffect(() => {
    console.log("useEffect triggered in Library component");

    let isMounted = true;

    const fetchRecommendations = async (scenario, setRecommendations) => {
      if (loading || !userEmail) {
        console.log("Loading or no userEmail, skipping fetch");
        return; // Moved the condition inside the effect
      }
      try {
        console.log(`Fetching recommendations for: ${scenario}, userEmail: ${userEmail}`);
        const recoResponse = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/api/${scenario}/${userEmail}`
        );
        console.log(`Fetched data for ${scenario}:`, recoResponse.data);

        const contentIds = recoResponse.data.recomms.map((recomm) => recomm.id);
        const list = await Promise.all(
          contentIds.map(async (id) => {
            try {
              const videoResp = await axios.get(
                `${process.env.REACT_APP_API_BASE_URL}/api/getVideoMetaDataFromObjectId/${id}`
              );
              return { ...videoResp.data };
            } catch (error) {
              console.error(`Error fetching video metadata for id ${id}`, error);
              return null;
            }
          })
        );

        const filteredList = list.filter(item => item !== null);
        console.log(`Filtered list for ${scenario}:`, filteredList);
        
        if (isMounted) {
          setRecommendations(filteredList);
        }
      } catch (error) {
        console.error(`Error fetching ${scenario} recommendations:`, error);
        setError('Failed to load recommendations.');  // Set error message
      }
    };

    fetchRecommendations("getItemToUserRecommendations_Scenario_MusicVideo", setRecommendations_MusicVideo);
    fetchRecommendations("getItemToUserRecommendations_Scenario_Meditation", setRecommendations_Meditation);
    fetchRecommendations("getItemToUserRecommendations_Scenario_StudioRecording", setRecommendations_StudioRecording);

    return () => {
      isMounted = false;
    };
  }, [userEmail, loading]);  // Removed the conditional around useEffect

  // Wait for authentication to finish before rendering the component
  if (loading) {
    return <p>Loading...</p>;
  }

  console.log("Recommendations - Music Video:", recommendations_MusicVideo);
  console.log("Recommendations - Meditation:", recommendations_Meditation);
  console.log("Recommendations - Studio Recording:", recommendations_StudioRecording);

  return (
    <MainContainer>
      <Main>
        {error && <p>{error}</p>} {/* Display error if there is one */}

        <div className="top-section">
          <h2 className="sec-title">Music Video</h2>
          {recommendations_MusicVideo.length > 0 ? (
            <SwipeComponet arr={recommendations_MusicVideo} />
          ) : (
            <p>No recommendations available</p>
          )}

          <h2 className="sec-title">Meditation</h2>
          {recommendations_Meditation.length > 0 ? (
            <SwipeComponet arr={recommendations_Meditation} />
          ) : (
            <p>No recommendations available</p>
          )}

          <h2 className="sec-title">Studio Recording</h2>
          {recommendations_StudioRecording.length > 0 ? (
            <SwipeComponet arr={recommendations_StudioRecording} />
          ) : (
            <p>No recommendations available</p>
          )}

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
