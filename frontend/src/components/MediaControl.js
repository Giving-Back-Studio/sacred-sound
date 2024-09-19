import React from "react";
import Collapse from "../assets/Collapse.svg";
import FullScreenIcon from "../assets/Fullscreen.svg";
import FullScreenExit from "../assets/FullscreenExit.svg";
import Expand from "../assets/expand.svg";
import styled from "styled-components";

function MediaControl({
  state,
  setState,
  audioRef,
  handle,
  setToggle,
  toggle,
  smallScreen,
  setSmallScreen,
  playNext,
  getCurrentTime,
  handlePlay,
}) {
  const handleSmallScreen = () => {
    setSmallScreen(!smallScreen);
  };

  return (
    <>
      {!state.song[state.currentSongIndex]?.isVideo && (
        <div className="icon-img-outer">
          <div className="icon">
            {smallScreen ? (
              <img
                src={Expand}
                style={{
                  maxWidth: "45px",
                  fontSize: "25px",
                  color: " #fff",
                  padding: "6px",
                  left: smallScreen ? "90px" : "350px",
                  zIndex: 9999,
                  cursor: "pointer",
                }}
                alt="icon"
                onClick={() => {
                  handleSmallScreen();
                  handle.exit();
                  setToggle(false);
                }}
              />
            ) : (
              <img
                src={Collapse}
                style={{
                  fontSize: "25px",
                  color: " #fff",
                  padding: "6px",
                  left: smallScreen ? "90px" : "350px",
                  zIndex: 9999,
                  cursor: "pointer",
                }}
                alt="icon"
                onClick={() => {
                  handleSmallScreen();
                  handle.exit();
                  setToggle(false);
                }}
              />
            )}
            {toggle ? (
              <img
                style={{
                  fontSize: "25px",
                  color: " #fff",
                  padding: "6px",
                  left: smallScreen ? "150px" : "400px",
                  cursor: "pointer",
                  zIndex: 9999,
                }}
                alt="icon"
                src={FullScreenExit}
                onClick={() => {
                  handle.exit();
                  setToggle(false);
                }}
              />
            ) : (
              <img
                style={{
                  fontSize: "25px",
                  color: " #fff",
                  padding: "6px",
                  left: smallScreen ? "150px" : "400px",
                  cursor: "pointer",
                  zIndex: 999,
                }}
                alt="icon"
                src={FullScreenIcon}
                onClick={() => {
                  handle.enter();
                  setToggle(true);
                  setSmallScreen(false);
                }}
              />
            )}
          </div>
          <BannerImage className="banner-img">
            {smallScreen ? (
              <img
                style={{ width: "200px", height: "200px" }}
                src={state.song[state.currentSongIndex]?.img}
                alt="icon"
              />
            ) : (
              <img
                style={{ maxWidth: toggle ? "100%" : "auto" }}
                src={state.song[state.currentSongIndex]?.img}
                alt="icon"
              />
            )}
          </BannerImage>
        </div>
      )}
      {!state.song[state.currentSongIndex]?.isVideo ? (
        <audio
          ref={audioRef}
          src={state.song[state.currentSongIndex]?.songUrl}
          id="song"
          preload="metadata"
          onEnded={playNext}
          onPlay={handlePlay}
          onTimeUpdate={getCurrentTime}
          autoPlay
        ></audio>
      ) : (
        <div className="icon-img-outer">
          <div className="icon">
            {smallScreen ? (
              <img
                src={Expand}
                style={{
                  maxWidth: "45px",
                  fontSize: "25px",
                  color: " #fff",
                  padding: "6px",
                  left: smallScreen ? "90px" : "350px",
                  zIndex: 9999,
                  cursor: "pointer",
                }}
                alt="icon"
                onClick={() => {
                  handleSmallScreen();
                  handle.exit();
                  setToggle(false);
                }}
              />
            ) : (
              <img
                src={Collapse}
                style={{
                  fontSize: "25px",
                  color: " #fff",
                  padding: "6px",
                  left: smallScreen ? "90px" : "350px",
                  zIndex: 9999,
                  cursor: "pointer",
                }}
                alt="icon"
                onClick={() => {
                  handleSmallScreen();
                  handle.exit();
                  setToggle(false);
                }}
              />
            )}
            {toggle ? (
              <img
                style={{
                  fontSize: "25px",
                  color: " #fff",
                  padding: "6px",
                  left: smallScreen ? "150px" : "400px",
                  cursor: "pointer",
                  zIndex: 9999,
                }}
                alt="icon"
                src={FullScreenExit}
                onClick={() => {
                  handle.exit();
                  setToggle(false);
                }}
              />
            ) : (
              <img
                style={{
                  fontSize: "25px",
                  color: " #fff",
                  padding: "6px",
                  left: smallScreen ? "150px" : "400px",
                  cursor: "pointer",
                  zIndex: 999,
                }}
                alt="icon"
                src={FullScreenIcon}
                onClick={() => {
                  handle.enter();
                  setToggle(true);
                  setSmallScreen(false);
                }}
              />
            )}
          </div>
          <BannerImage className="banner-img">
            <video
              style={{ width: smallScreen ? "200px" : "auto" }}
              src={state.song[state.currentSongIndex]?.songUrl} // Set the current video source
              ref={audioRef}
              preload="metadata"
              autoPlay
              onTimeUpdate={getCurrentTime}
              onEnded={playNext}
              onPlay={handlePlay}
            />
          </BannerImage>
        </div>
      )}
    </>
  );
}

export default MediaControl;

const BannerImage = styled.div`
  img,
  video {
    height: 100%;
    width: 100%;
  }
`;
