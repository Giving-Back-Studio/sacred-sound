import React from "react";
// import ExplainerVideo from "../assets/SacredSoundExplainerVideo.mp4";
import Shuffle from "../assets/stop.svg";
import Next from "../assets/Next.svg";
import styled from "styled-components";
import Volume from "../assets/Volume.svg";
import Fullscreen from "../assets/Fullscreen.svg";
import AlbumImg from "../assets/playlist.jpg";
import Share from "../assets/share-blue.svg";
import PersonAdd from "../assets/add-blue.svg";
import Location from "../assets/location.svg";

export default function Concert() {
  return (
    <ConcertWrapper
      className="concert-wrapper"
      style={{ width: "100%", marginBottom: "108px" }}
    >
      <ConcertVideo>
        <video
          src={'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'}
          controls
          style={{ width: "100%", height: "auto", objectFit: "cover" }} // Adjust the width and height as needed
        >
          Your browser does not support the video tag.
        </video>
        {/* <VideoBar className="d-flex justify-between align-item-center">
          <div className="left-bar d-flex align-item-center">
            <div className="repeat-play">
              <img className="album-cover" src={Shuffle} alt="Album Cover" />
            </div>
            <div>
              <img className="album-cover" src={Next} alt="Album Cover" />
            </div>
            <div className="live-badge d-flex align-item-center">Live</div>
          </div>
          <div className="right-bar">
            <VolumeBar>
              <div>
                <img
                  className="album-cover volume-icon"
                  src={Volume}
                  alt="Album Cover"
                />
              </div>
              <input
                type="range"
                id="volume"
                name="volume"
                min="0"
                max="100"
                // onChange={handleVolume}
              />
              <div>
                <img
                  className="album-cover now-playing"
                  src={Fullscreen}
                  alt="Album Cover"
                />
              </div>
            </VolumeBar>
          </div>
        </VideoBar> */}
      </ConcertVideo>

      <div className="event-outer">
        <div className="event-head">
          <Title className="font-montserrat">Event name</Title>
          <HeadProfile>
            <ProfileImage>
              <img src={AlbumImg} alt="not loaded"></img>
              <div className="artist-info">
                <h3>Sound of Light</h3>
                <span># Followers</span>
              </div>
            </ProfileImage>
            <HeadAction>
              <div>
                <img src={PersonAdd} alt="not loaded"></img>
                <span>Follow</span>
              </div>
              <div>
                <img src={Share} alt="not loaded"></img>
                <span>Share</span>
              </div>
            </HeadAction>
          </HeadProfile>
          <Description>
            <h5 className="font-montserrat">
              187 watching now | Started streaming 109 minutes ago
            </h5>
            <p>February 29, 2024</p>
            <p>
              Sed faucibus, orci a pulvinar efficitur, elit augue efficitur
              felis, ut pharetra tortor ante quis enim. Nullam id euismod sem.
              Ut scelerisque sem at malesuada tincidunt.
            </p>
          </Description>
        </div>

        <ConcertsTabs>
          <h1>Concerts</h1>
          <div className="tabs-btn">
            <button className="active">Upcoming concerts</button>
            <button>Past concerts</button>
          </div>

          <Timeline class="timeline-container">
            <ul class="tl">
              <li>
                <div class="item-icon"></div>
                <div class="item-text">
                  <div class="item-title">
                    <strong>Mar 7,</strong> Sunday
                  </div>
                  <div class="item-detail d-flex justify-between">
                    <div className="event-left">
                      <span>6:30 PM</span>
                      <h1>Soundscapes for Serenity: A Sacred Sound Journey</h1>
                      <div className="event-by">
                        <img
                          className="rounded"
                          src={AlbumImg}
                          alt="not loaded"
                        ></img>
                        <span>by Sacred Sound Studio</span>
                      </div>
                      <div className="event-by">
                        <img src={Location} alt="not loaded"></img>
                        <span>Costa Rica</span>
                      </div>
                    </div>
                    <div className="event-right">
                      <img src={AlbumImg} alt="not loaded"></img>
                    </div>
                  </div>
                </div>
              </li>
              {/* repeat event */}
              <li>
                <div class="item-icon"></div>
                <div class="item-text">
                  <div class="item-title">
                    <strong>Mar 7,</strong> Sunday
                  </div>
                  <div class="item-detail d-flex justify-between">
                    <div className="event-left">
                      <span>6:30 PM</span>
                      <h1>Soundscapes for Serenity: A Sacred Sound Journey</h1>
                      <div className="event-by">
                        <img
                          className="rounded"
                          src={AlbumImg}
                          alt="not loaded"
                        ></img>
                        <span>by Sacred Sound Studio</span>
                      </div>
                      <div className="event-by">
                        <img src={Location} alt="not loaded"></img>
                        <span>Costa Rica</span>
                      </div>
                    </div>
                    <div className="event-right">
                      <img src={AlbumImg} alt="not loaded"></img>
                    </div>
                  </div>
                </div>
              </li>
              {/* repeat event */}
              <li>
                <div class="item-icon"></div>
                <div class="item-text">
                  <div class="item-title">
                    <strong>Mar 7,</strong> Sunday
                  </div>
                  <div class="item-detail d-flex justify-between">
                    <div className="event-left">
                      <span>6:30 PM</span>
                      <h1>Soundscapes for Serenity: A Sacred Sound Journey</h1>
                      <div className="event-by">
                        <img
                          className="rounded"
                          src={AlbumImg}
                          alt="not loaded"
                        ></img>
                        <span>by Sacred Sound Studio</span>
                      </div>
                      <div className="event-by">
                        <img src={Location} alt="not loaded"></img>
                        <span>Costa Rica</span>
                      </div>
                    </div>
                    <div className="event-right">
                      <img src={AlbumImg} alt="not loaded"></img>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </Timeline>
        </ConcertsTabs>
      </div>
    </ConcertWrapper>
  );
}

const ConcertWrapper = styled.div`
  overflow: auto;
  height: 100vh;
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

  .event-outer {
    padding: 20px;
    margin-top: 30px;
    @media (max-width: 600px) {
      padding: 10px;
    }
    .event-head {
      max-width: 580px;
      @media (max-width: 767px) {
        max-width: 100%;
      }
    }
  }
`;
const ConcertVideo = styled.div``;

const VideoBar = styled.div`
  background-color: #101213;
  margin-top: -4px;
  padding: 15px;
  img {
    height: 24px;
    cursor: pointer;
  }
  .left-bar {
    gap: 20px;
    .live-badge {
      color: #fff;
      font-size: 14px;
      font-weight: 400;
      margin-left: 30px;
      &::before {
        content: "";
        width: 14px;
        height: 14px;
        background-color: #ff0000;
        display: inline-block;
        border-radius: 50px;
        margin-right: 5px;
      }
    }
  }
`;

const VolumeBar = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;

  input[type="range"] {
    font-size: 1.5rem;
    width: 8em;
    @media (max-width: 991px) {
      display: none;
    }
  }

  input[type="range"] {
    color: #687550;
    --thumb-height: 18px;
    --thumb-width: 25px;
    --track-height: 2px;
    --track-color: #616567;
    --brightness-hover: 180%;
    --brightness-down: 80%;
    --clip-edges: 0.0125em;
  }

  /* === range commons === */
  input[type="range"] {
    position: relative;
    background: #fff0;
    overflow: hidden;
  }

  input[type="range"]:active {
    cursor: grabbing;
  }

  input[type="range"]:disabled {
    filter: grayscale(1);
    opacity: 0.3;
    cursor: not-allowed;
  }

  /* === WebKit specific styles === */
  input[type="range"],
  input[type="range"]::-webkit-slider-runnable-track,
  input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    transition: all ease 100ms;
    height: var(--thumb-height);
  }

  input[type="range"]::-webkit-slider-runnable-track,
  input[type="range"]::-webkit-slider-thumb {
    position: relative;
  }

  input[type="range"]::-webkit-slider-thumb {
    --thumb-radius: calc((var(--thumb-height) * 0.5) - 1px);
    --clip-top: calc((var(--thumb-height) - var(--track-height)) * 0.5 - 0.5px);
    --clip-bottom: calc(var(--thumb-height) - var(--clip-top));
    --clip-further: calc(100% + 1px);
    --box-fill: calc(-100vmax - var(--thumb-width, var(--thumb-height))) 0 0
      100vmax currentColor;

    width: var(--thumb-width, var(--thumb-height));
    background: linear-gradient(currentColor 0 0) scroll no-repeat left center /
      50% calc(var(--track-height) + 1px);
    background-color: currentColor;
    box-shadow: var(--box-fill);
    border-radius: 0;

    filter: brightness(100%);
    clip-path: polygon(
      100% -1px,
      var(--clip-edges) -1px,
      0 var(--clip-top),
      -100vmax var(--clip-top),
      -100vmax var(--clip-bottom),
      0 var(--clip-bottom),
      var(--clip-edges) 100%,
      var(--clip-further) var(--clip-further)
    );
  }

  input[type="range"]:hover::-webkit-slider-thumb {
    filter: brightness(var(--brightness-hover));
    cursor: grab;
  }

  input[type="range"]:active::-webkit-slider-thumb {
    filter: brightness(var(--brightness-down));
    cursor: grabbing;
  }

  input[type="range"]::-webkit-slider-runnable-track {
    background: linear-gradient(var(--track-color) 0 0) scroll no-repeat center /
      100% calc(var(--track-height) + 1px);
  }

  input[type="range"]:disabled::-webkit-slider-thumb {
    cursor: not-allowed;
  }

  /* === Firefox specific styles === */
  input[type="range"],
  input[type="range"]::-moz-range-track,
  input[type="range"]::-moz-range-thumb {
    appearance: none;
    transition: all ease 100ms;
    height: var(--thumb-height);
  }

  input[type="range"]::-moz-range-track,
  input[type="range"]::-moz-range-thumb,
  input[type="range"]::-moz-range-progress {
    background: #fff0;
  }

  input[type="range"]::-moz-range-thumb {
    background: currentColor;
    border: 0;
    width: var(--thumb-width, var(--thumb-height));
    border-radius: var(--thumb-width, var(--thumb-height));
    cursor: grab;
  }

  input[type="range"]:active::-moz-range-thumb {
    cursor: grabbing;
  }

  input[type="range"]::-moz-range-track {
    width: 100%;
    background: var(--track-color);
  }

  input[type="range"]::-moz-range-progress {
    appearance: none;
    background: currentColor;
    transition-delay: 30ms;
  }

  input[type="range"]::-moz-range-track,
  input[type="range"]::-moz-range-progress {
    height: calc(var(--track-height) + 1px);
    border-radius: var(--track-height);
  }

  input[type="range"]::-moz-range-thumb,
  input[type="range"]::-moz-range-progress {
    filter: brightness(100%);
  }

  input[type="range"]:hover::-moz-range-thumb,
  input[type="range"]:hover::-moz-range-progress {
    filter: brightness(var(--brightness-hover));
  }

  input[type="range"]:active::-moz-range-thumb,
  input[type="range"]:active::-moz-range-progress {
    filter: brightness(var(--brightness-down));
  }

  input[type="range"]:disabled::-moz-range-thumb {
    cursor: not-allowed;
  }
  .volume-icon {
  }
  .now-playing {
    @media (max-width: 991px) {
      height: 20px;
    }
  }
`;

const Title = styled.div`
  color: #434289;
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 30px;
`;

const HeadProfile = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 600px) {
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    gap: 20px;
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
    font-size: 16px;
    color: #434289;
  }
  span {
    color: #434289;
    margin-top: 5px;
    display: block;
  }
  img {
    width: 45px;
    height: 45px;
    object-fit: cover;
    border-radius: 50px;
    @media (max-width: 767px) {
      position: absolute;
      top: -190px;
      left: 50%;
      transform: translateX(-50%);
      width: 105px;
      height: 105px;
    }
  }
`;

const HeadAction = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  div {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-left: 10px;
    @media (max-width: 600px) {
      &:first-child {
        margin-left: 0;
      }
    }
  }
  span {
    color: #434289;
  }
  img {
    cursor: pointer;
    @media (max-width: 767px) {
      width: 24px;
    }
  }
`;

const Description = styled.div`
  margin-top: 50px;
  @media (max-width: 600px) {
    margin-top: 20px;
  }
  h5 {
    font-size: 14px;
    font-weight: 700;
  }
  p {
    font-size: 14px;
    font-weight: 300;
  }
`;
const ConcertsTabs = styled.div`
  margin-top: 50px;
  h1 {
    font-size: 26px;
    font-weight: 400;
    @media (max-width: 991px) {
      font-size: 24px;
    }
  }
  .tabs-btn {
    button {
      background-color: #d9d9d9;
      color: #434289;
      height: 40px;
      margin-right: 10px;
      @media (max-width: 575px) {
        font-size: 13px;
        padding: 12px 14px;
        font-weight: 700;
        &:last-child {
          margin-right: 0;
        }
      }
      &.active {
        background-color: #434289;
        color: #fff;
      }
    }
  }
`;

const Timeline = styled.div`
  display: block;
  position: relative;

  ul {
    &.tl {
      margin: 50px 0 20px 10px;
      padding: 0;
      display: inline-block;
      width: 100%;
      @media (max-width: 600px) {
        margin-left: 0;
      }
      li {
        list-style: none;
        margin: auto;
        min-height: 50px;
        border-left: 1px solid #d9d9d9;
        padding: 0 0 50px 30px;
        position: relative;
        display: flex;
        flex-direction: row;
        margin-right: 30px;
        @media (max-width: 600px) {
          padding: 0px 0px 50px 0px;
          border-left: none;
          margin-right: 0;
        }
        &:last-child {
          border-left: 0;
        }
        * {
          font-family: "Playfair";
        }
        .item-icon {
          position: absolute;
          left: -10px;
          top: 0px;
          content: " ";
          border-radius: 500%;
          background: #d9d9d9;
          height: 20px;
          width: 20px;
          @media (max-width: 600px) {
            display: none;
          }
        }
        .item-text {
          width: 100%;
        }
        .item-title {
          font-size: 18px;
          margin-bottom: 15px;
        }
        .item-detail {
          background-color: #f5f5f5;
          padding: 15px;
          align-items: center;
          @media (max-width: 600px) {
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-start;
          }
          h1 {
            margin-top: 10px;
            @media (max-width: 600px) {
              font-size: 18px;
              margin-top: 15px;
              margin-bottom: 20px;
            }
          }
          span {
            font-size: 18px;
            font-weight: 400;
          }
          .event-by {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-top: 20px;
            @media (max-width: 991px) {
              margin-top: 10px;
            }
            img {
              width: 35px;
              height: 35px;
              object-fit: cover;
              &.rounded {
                border-radius: 50px;
              }
            }
          }
          .event-right {
            @media (max-width: 600px) {
              margin-top: 20px;
            }
            img {
              width: 170px;
              height: 170px;
              object-fit: cover;
            }
          }
        }
      }
    }
  }
`;
