import React from "react";
import styled from "styled-components";



const ContentCard = ({ imageThumbnailUrl, title, artistName }) => {
    return (
        <Card>
        <ImageContainer>
            <img src={imageThumbnailUrl} alt={title} />
        </ImageContainer>
        <TextContainer>
            <Title>{title}</Title>
            <ArtistName>{artistName}</ArtistName>
        </TextContainer>
        </Card>
    );
};

export default ContentCard;

const Card = styled.div`
    min-width: calc(29.5% - 20px);
    background-color: 'transparent';
    padding-left: 20px;
    padding-bottom: 20px;
    margin-bottom: 1vw;
    border-radius: 8px;
    box-sizing: border-box;
    cursor: pointer;
`;

const ImageContainer = styled.div`
  height: 200px; // Set a fixed height for the container
  width: 100%; // Ensure the container takes the full width
  overflow: hidden; // This will hide any parts of the image that exceed the container's bounds
  img {
    width: 100%;
    height: 100%; // Make the image fill the container
    object-fit: cover; // This will cover the area, cropping the image if necessary to maintain aspect ratio
    object-position: center; // Center the image within the container
  }
`;

const TextContainer = styled.div`
    padding: 15px;
`;

const Title = styled.h2`
    margin: 0;
    padding: 5px 0;
    font-size: 18px;
    color: rgb(67, 66, 137);
`;

const ArtistName = styled.p`
    margin: 0;
    padding:  5px 0;
    font-size: 14px
`