import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from 'axios';
import ProfileIcon from "../assets/Profile-Icon.svg";
import Loved from "../assets/love.svg";
import Play from "../assets/playicon.svg";
import Shuffle from "../assets/Shuffle-blue.svg";
import Clock from "../assets/clock-outline.svg";
import Sort from "../assets/sort.svg";
import Like from "../assets/track-likeed.svg";
import Album from "../assets/picture.png";
import ThanksGivingPopup from "../components/common/ThanksGivingPopup";
import { useAuth } from '../context/AuthContext'; // Import your custom useAuth hook

export default function LovedContent() {
  const { userEmail } = useAuth(); // Use the custom hook to get the user's email
  const [lovedContents, setLovedContents] = useState([]);

  async function dislike(trackId) {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/api/updateUserLoves`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        user: userEmail,
        videoId: trackId,
        b_isLoving: false
      }),
    })
      .then((res) => res.json())
      .then(() => fetchLovedContent());
  }

  async function fetchLovedContent() {
    const response = await axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/api/getUserLoves?user=${userEmail}`
    );
    let videoIds = response.data.loves;
    const list = [];
    await Promise.allSettled(
      videoIds.map(async (id) => {
        const videoResp = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/api/getVideoMetadataFromObjectId/${id}`
        );
        const videoData = videoResp.data;
        if (videoData) {
          list.push({
            ...videoData,
          });
        }
      })
    );
    setLovedContents(list);
  }

  useEffect(() => {
    fetchLovedContent();
  }, [userEmail]);

  return (
    <PageWrapper className="concert-wrapper">
      <ProfileHead>
        <div className="profile-icon d-flex align-item-center">
          <img className="" src={ProfileIcon} alt="Album Cover" />
        </div>
        <div className="head-title d-flex align-item-center">
          <img className="" src={Loved} alt="Album Cover" />
          <h1>Loved Content</h1>
        </div>
      </ProfileHead>
      <TableContent>
        <ActionBar>
          <div className="d-flex align-item-center">
            <div className="play">
              <img src={Play} alt="Album Cover" />
            </div>
            <div className="repeat-play">
              <img src={Shuffle} alt="Album Cover" />
            </div>
          </div>

          <ThanksGivingPopup />
        </ActionBar>
        <Table>
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Album</th>
                <th>
                  <div className="d-flex align-item-center gap-5">
                    Date added <img src={Sort} alt="icon" />
                  </div>
                </th>
                <th>
                  <img src={Clock} alt="icon" />
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {lovedContents?.map((content, index) => (
                <tr key={content._id}>
                  <td>{index + 1}</td>
                  <td>
                    <div className="album-td">
                      <img className="album-img" src={Album} alt="icon" />
                      <p>{content.title}</p>
                    </div>
                  </td>
                  <td>Album</td>
                  <td>Dec. 29, 2023</td>
                  <td>5:26</td>
                  <td>
                    <img className="like-album" src={Like} alt="icon" onClick={() => dislike(content._id)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Table>
      </TableContent>
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  height: 100vh;
  width: 100%;
  * {
    background-color: transparent;
  }
  .d-flex {
    display: flex;
  }
  .align-item-center {
    align-items: center;
  }
  .justify-between {
    justify-content: space-between;
  }
  .justify-end {
    justify-content: flex-end;
  }
`;

const ProfileHead = styled.div`
  background-color: #f1f4f8;
  padding: 30px;
  @media (max-width: 991px) {
    background-color: #bfbfbf;
  }
  @media (max-width: 575px) {
    padding: 15px;
  }
  .profile-icon {
    justify-content: flex-end;
    margin-bottom: 14px;
    img {
      cursor: pointer;
      width: 40px;
      height: 40px;
    }
  }
  .head-title {
    gap: 20px;
    h1 {
      @media (max-width: 575px) {
        font-size: 30px;
      }
    }
    img {
      height: 40px;
      width: 40px;
    }
  }
`;

const TableContent = styled.div`
  padding: 30px;
  @media (max-width: 575px) {
    padding: 15px;
  }
`;

const ActionBar = styled.div`
  display: flex;
  align-items: center;
  div {
    gap: 20px;
    img {
      cursor: pointer;
    }
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
    margin: 0 0 0 auto;
  }
`;

const Table = styled.div`
  width: 100%;
  box-sizing: border-box;
  margin-top: 40px;
  overflow-x: auto;
  .table {
    width: 100%;
    box-sizing: border-box;
    border-collapse: collapse;

    tr {
      th,
      td {
        padding: 8px 8px;
        text-align: left;
        font-weight: 300;
      }
      th {
        font-size: 14px;
        border: 1px solid #f5f5f5;
        border-width: 1px 0 1px 0;
        &:nth-child(1) {
          width: 20px;
        }
        &:nth-child(2) {
          @media (max-width: 767px) {
            min-width: 200px;
          }
        }
        &:nth-child(3) {
          @media (max-width: 767px) {
            max-width: 200px;
            width: 140px;
          }
        }
        &:nth-child(4) {
          width: 140px;
          min-width: 140px;
        }
        &:nth-child(5) {
          width: 40px;
        }
        &:last-child {
          width: 100px;
          text-align: center;
        }
        .gap-5 {
          gap: 10px;
          img {
            cursor: pointer;
          }
        }
      }
      td {
        font-size: 16px;
        border-bottom: 1px solid #d9d9d9;
        &:last-child {
          text-align: center;
        }
        img {
          cursor: pointer;
        }
        .album-td {
          display: flex;
          align-items: center;
          gap: 10px;
          img {
            width: 50px;
            height: 50px;
            object-fit: cover;
          }
          p {
            margin: 0;
            font-size: 16px;
          }
        }
      }
    }
  }
`;