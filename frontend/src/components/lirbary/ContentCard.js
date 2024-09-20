import styled from "styled-components";
import React from "react";
import video from "../../assets/footage.png";
import music from "../../assets/music-file.png";
import { useNavigate } from "react-router-dom";

export default function ContentCard({ content, type }) {
  let navigate = useNavigate();
  return (
    <CardContainer>
      <CardImage
        src={
          content?.selectedImageThumbnail?.length > 0
            ? content.selectedImageThumbnail
            : content.isOnlyAudio !== undefined &&
              (content.isOnlyAudio === true ? music : video)
        }
        alt={"title"}
      />
      <CardContent>
        <Title>{content.title}</Title>
        <Artist>
          Artist -{" "}
          <span onClick={() => navigate(`/main/artist?id=${content.user._id}`)}>
            {content.user.accountName}
          </span>
        </Artist>
        {content.isOnlyAudio !== undefined &&
          (content.isOnlyAudio === true ? <p>Audio</p> : <p>Video</p>)}
      </CardContent>
    </CardContainer>
  );
}

const CardContainer = styled.div`
  width: 200px;
  margin: 10px;
  height: 330px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const CardImage = styled.img`
  width: 80%;
  padding: 20px;
  height: 150px;
  object-fit: cover;
  margin: auto;
  text-align: center;
`;

const CardContent = styled.div`
  padding: 16px;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 18px;
  font-weight: bold;
`;

const Artist = styled.p`
  margin: 8px 0;
  font-size: 14px;
  span {
    text-decoration: underline;
    cursor: pointer;
  }
`;
