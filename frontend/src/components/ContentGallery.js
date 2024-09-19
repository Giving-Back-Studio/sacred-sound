import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const ContentGallery = () => {
    const [approvedContent, setApprovedContent] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Make an Axios GET request to your backend API
        axios
          .get(`${process.env.REACT_APP_API_BASE_URL}/api/getApprovedVideoContent`
          )
          .then((response) => {
            setApprovedContent(response.data);
            setLoading(false);
          })
          .catch((error) => {
            console.error(error);
            setLoading(false); // Handle errors and set loading to false
          });
    }, []);

    if (loading) {
        return <p>Loading...</p>; // Show a loading indicator
    }

    return (
      <div style={{ marginTop: "5%" }}>
        {Array.isArray(approvedContent) && approvedContent.map((content) => (
            <ContentCard key={content._id}>
              <h2 style={{ color: "white" }}>{content.title}</h2>
              <video controls width="300">
                <source src={content.fileUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </ContentCard>
          ))}
      </div>
    );
};

export default ContentGallery;


const ContentCard = styled.div`
display: flex;
flex-direction: column;
align-items: center;
padding: 20px;
background-color: #434289;
border-radius: 33px;
margin: 10px;
`