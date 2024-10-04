import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Share from "../assets/share-android.svg";
import PersonAdd from "../assets/person-add-outline.svg";
import Shuffle from "../assets/Shuffle-blue.svg";
import TrackLike from "../assets/track-like.svg";
import TrackLikeed from "../assets/track-likeed.svg";
import axios from 'axios';
import picture from '../assets/picture.png';
import BackButton from "../components/common/BackButton";
import PlayButton from "../components/common/PlayButton";
import ThanksGivingPopup from "../components/common/ThanksGivingPopup";
import { useAuth } from '../context/AuthContext'; // Import your custom useAuth hook

export default function Track() {
  const { userEmail } = useAuth(); // Use the custom hook to get the user's email
  const [track, setTrack] = useState({});
  const [isLiked, setLiked] = useState(false);
  const queryParams = new URLSearchParams(window.location.search);
  const trackId = queryParams.get("id");

  async function fetchTrack() {
    const response = await axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/api/getTrack/${trackId}`
    );
    setTrack(response.data.track);
  }

  async function fetchLike() {
    const response = await axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/api/getUserLoves?user=${userEmail}`
    );
    if (response.data.loves.includes(trackId)) {
      setLiked(true);
    }
  }

  async function likeOrDislike() {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/api/updateUserLoves`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        user: userEmail,
        videoId: trackId,
        b_isLoving: !isLiked
      }),
    })
      .then((res) => res.json())
      .then(() => setLiked(!isLiked));
  }

  useEffect(() => {
    fetchTrack();
    fetchLike();
  }, []);

  return (
    <MainContainer>
      <HeadPart>
        <BackButton />
        <CoverImage>
          <img src={require('../assets/Background.png')} alt="not loaded"></img>
          {/* <img src={artistCover} alt="not loaded"></img> */}
        </CoverImage>
        <HeadProfile>
          <ProfileImage>
            <img src={track.selectedImageThumbnail ? track.selectedImageThumbnail : picture} alt="not loaded"></img>
            <div className="artist-info">
              <span>Track</span>
              <h3>{track.title}</h3>
              <span># Followers</span>
            </div>
          </ProfileImage>
          <HeadAction>
            <img src={PersonAdd} alt="not loaded"></img>
            <img src={Share} alt="not loaded"></img>
          </HeadAction>
        </HeadProfile>
      </HeadPart>

      <MusicInfo>
        <div>
          <h5 className="music-disc">
            Sound of light is a Sacred Medicine Music community and School,
            based on the forest of Costa Rica.
          </h5>
        </div>
        <div className="music-play">
          <div className="music-icons">
            {/* <div className="play"> */}
              {/* <img class
              Name="album-cover" src={playButton=== true ? Play : Pause} alt="Album Cover" onClick={onPlay}/> */}
            <PlayButton track={{
              id: 1,
              songUrl: track.fileUrl,
              songTitle: track.title,
              isVideo: false,
              artistName: track?.user?.accountName,
              img: track.selectedImageThumbnail,
            }} large={true} />
            {/* </div> */}
            {/* <div className="pause">
            <img className="album-cover" src={Pause} alt="Album Cover" />
          </div> */}
            <div className="repeat-play">
              <img className="album-cover" src={Shuffle} alt="Album Cover" />
            </div>
          </div>
          <ThanksGivingPopup track={track} userId={userEmail} user={userEmail} />
        </div>
      </MusicInfo>

      <FeaturedTracks>
        <div className="track-bar active">
          <div className="track-left">
            {/* <div className="icon-number">
              <img src={playButton=== true ? Play : Pause} onClick={onPlay} className="track-icon" alt="track-icon"></img>
            </div> */}
            <PlayButton track={{
              id: 1,
              songUrl: track.fileUrl,
              songTitle: track.title,
              isVideo: false,
              artistName: track?.user?.accountName,
              img: track.selectedImageThumbnail,
            }} />
            <img className="track-thumb" src={track.selectedImageThumbnail ? track.selectedImageThumbnail : picture} alt="track-thumb"></img>
            <div className="flex-line">
              <h5 className="track-title">{track.title}</h5>
            </div>
          </div>
          <div className="track-right">
            <h5 className="track-time">02:36</h5>
            <img src={isLiked ? TrackLikeed : TrackLike} alt="" onClick={likeOrDislike}></img>
          </div>
        </div>
      </FeaturedTracks>
    </MainContainer>
  );
}

const MainContainer = styled.div`
  min-height: calc(100vh - 120px);
  padding: 0 0 120px 0;
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  background: 
    radial-gradient(closest-side at 50% 50%, 
      rgba(67, 66, 137, 0.2) 0%, 
      rgba(95, 104, 94, 0.2) 100%), 
    white;
  @media (max-width: 767px) {
    min-height: calc(100vh - 200px);
    padding: 0 0 200px 0;
  }
`;

const HeadPart = styled.div`
  position: relative;
  * {
    background-color: transparent;
  }
`;

const CoverImage = styled.div`
  position: relative;
  z-index: 2;
  background-color: #D9D9D9;
  height: 400px;
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    height: 99%;
    width: 100%;
    background-color: #00000061;
    overflow: hidden;
    z-index: 1;
  }
  img {
    width: 100%;
    height: 400px;
    object-fit: cover;
    @media (max-width: 767px) {
      height: 270px;
    }
  }
`;

const HeadProfile = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 35px;
  z-index: 2;
  @media (max-width: 767px) {
    position: relative;
    bottom: 0;
    display: block;
  }
  * {
    color: #fff;
    @media (max-width: 767px) {
      color: #434289;
    }
  }
`;

const ProfileImage = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 15px;
  h3 {
    margin: 0;
    font-weight: 400;
    font-size: 48px;
    @media (max-width: 575px) {
      font-size: 27px;
    }
  }
  img {
    width: 175px;
    height: 175px;
    object-fit: cover;
    border-radius: 50%;
    @media (max-width: 767px) {
      position: absolute;
      top: -190px;
      left: 50%;
      transform: translateX(-50%);
      width: 105px;
      height: 105px;
    }
  }
  .artist-info {
    @media (max-width: 767px) {
      text-align: center;
      width: 100%;
      margin-top: 25px;
    }
  }
`;

const HeadAction = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  @media (max-width: 991px) {
    position: absolute;
    right: 20px;
    top: -170px;
  }
  @media (max-width: 767px) {
    top: -255px;
  }
  img {
    cursor: pointer;
    @media (max-width: 767px) {
      width: 24px;
    }
  }
`;

const MusicInfo = styled.div`
  display: flex;
  gap: 15px;
  padding: 20px;
  margin-top: 15px;
  @media (max-width: 767px) {
    flex-direction: column;
  }
  > div:first-child {
    width: 50%;
    padding-right: 25px;
    @media (max-width: 767px) {
      width: 100%;
      padding-right: 0px;
    }
  }
  .music-disc {
    font-size: 18px;
    font-weight: 300;
    margin: 0;
    @media (max-width: 575px) {
      font-size: 14px;
    }
  }
  .music-play {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 50%;
    @media (max-width: 767px) {
      width: 100%;
      justify-content: center;
      gap: 20px;
    }
    .music-icons {
      display: flex;
      align-items: center;
      gap: 15px;
    }
    .pause,
    .play {
      background-color: #434289;
      border-radius: 50px;
      height: 60px;
      width: 60px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      @media (max-width: 991px) {
        width: 50px;
        height: 50px;
      }
      img {
        width: 28px;
        @media (max-width: 991px) {
          width: 22px;
        }
      }
    }
    .repeat-play {
      img {
        width: 40px;
        @media (max-width: 991px) {
          width: 22px;
        }
      }
    }
    .give-thanks {
      background-color: #687550;
      width: fit-content;
      border-radius: 50px;
      padding: 10px 15px;
      display: flex;
      align-items: center;
      gap: 10px;
      color: #fff;
      cursor: pointer;
    }
  }
`;

const FeaturedTracks = styled.div`
  padding: 20px;
  .track-bar {
    padding: 10px;
    display: flex;
    border-bottom: 1px solid #d9d9d9;
    &:hover,
    &.active {
      background-color: #f5f5f5;
    }
    * {
      font-weight: 400;
      font-size: 16px;
      background-color: transparent;
    }
    h5 {
      margin: 0;
    }
    .track-left {
      flex: 1;
      display: flex;
      align-items: center;
      gap: 10px;
      .icon-number {
        min-width: 20px;
      }
      .track-icon {
        width: 20px;
        cursor: pointer;
        filter: invert(27%) sepia(69%) saturate(6315%) hue-rotate(211deg)
          brightness(56%) contrast(86%);
      }
      .track-thumb {
        width: 50px;
        height: 50px;
        object-fit: cover;
      }
      .flex-line {
        display: flex;
        flex: 1;
        @media (max-width: 767px) {
          flex-direction: column;
        }
      }
      .track-title,
      .album-title {
        width: 50%;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        @media (max-width: 767px) {
          width: 100%;
        }
      }
    }
    .track-right {
      display: flex;
      align-items: center;
      gap: 40px;
      @media (max-width: 767px) {
        gap: 20px;
      }
      img {
        cursor: pointer;
      }
    }
  }
`;