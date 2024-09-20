import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import { useRef } from 'react';

    const VideoPlayer = () => {
        const { videoId } = useParams();
        const [videoData, setVideoData] = useState(null);
        const [interval, setIntervalId] = useState('')
        const navigate = useNavigate();
        const [recommendations, setRecommendations] = useState([]);
        // const { user, isAuthenticated } = useAuth0();
        const user = {name : "debug9@debug.com"};
        const userId = user.name;

        const videoRef = useRef(null);

        const userLog = async () => {
            try {
              await axios.post(
                `${process.env.REACT_APP_API_BASE_URL}/api/logContentUsage/`,
                {
                  user: userId,
                  videoId,
                }
              );
            } catch (error) {
              console.log("error creating userLog", error);
            }
        };

        const handlePlay = () => {
          const intervalId = setInterval(userLog, 30000); // 60000 milliseconds = 1 minute
          setIntervalId(intervalId);
        };

        const handlePause = () => {
          clearInterval(interval);
        };
    

        useEffect(() => {
        const fetchVideoData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/getVideoMetadataFromVideoId/${videoId}`);
                setVideoData(response.data);
            } catch (error) {
                setVideoData({fileUrl: 'https://firebasestorage.googleapis.com/v0/b/sacred-music-60ce6.appspot.com/o/Uploads%2Fdebug9%40debug.com%2F0bd405a9-e8c4-4386-9b87-51e010593682?alt=media&token=ca7758e2-59f7-4378-9aab-31e4cd2ddf93'})
                console.error('Error fetching video data:', error);
            }
        };

        if (videoId) {
            fetchVideoData();
        }
    }, [videoId]);

    // Fetch item-to-item recommendations
    useEffect(() => {
        const fetchItemToItemRecommendations = async () => {
            if (videoId && userId) {
                try {
                    const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/getItemToItemRecommendations/${userId}/${videoId}`);
                    setRecommendations(response.data.recomms || []);
                    console.log('Recommendations:', response.data.recomms);
                } catch (error) {
                    console.error('Error fetching item to item recommendations:', error);
                }
            }
        };

        fetchItemToItemRecommendations();
    }, [videoId, userId]);


    if (!videoData) {
        return <div>Loading...</div>;
    }

    return (
        <>
        <VideoPlayerHeader>
            <BackButton onClick={() => navigate(-1)} style={{color:'black'}}>Close</BackButton>
        </VideoPlayerHeader>
        <div id="videoPlayerContainer" style={{display:'flex', justifyContent:'center'}}>
        <video ref={videoRef} width="80%" height="auto" controls onPlay={handlePlay} onPause={handlePause}>
            <source src={videoData.fileUrl} type="video/mp4" />
            <p>Your browser does not support HTML5 video. Here is a <a href={videoData.fileUrl}>link to the video</a> instead.</p>
        </video>
        </div>
        </>
    );
};

export default VideoPlayer;

const VideoPlayerHeader = styled.div`
    width: 100%;
    height: 12vh;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 16px; // Adjust padding as needed
    box-sizing: border-box;
    `;

    const BackButton = styled.button`
    background: transparent;
    border: none;
    color: #fff; // Set the color as needed
    font-size: 18px; // Set size as needed
    cursor: pointer;
    // Add more styles as needed
    `;