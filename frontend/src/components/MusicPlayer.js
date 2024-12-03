import React from "react";
import Heart from "../assets/Heart.svg";
import Thanks from "../assets/thanks.svg";
import Queue from "../assets/Queue.svg";
import HeartFill from "../assets/heart-fill.svg";

import Shuffle from "../assets/Shuffle.svg";
import Back from "../assets/Back.svg";
import Pause from "../assets/pause.svg";
import Play from "../assets/playicon.svg";
import Next from "../assets/Next.svg";
import Repeat from "../assets/Repeat.svg";
import Volume from "../assets/Volume.svg";
import NowPlaying from "../assets/NowPlaying.svg";

import styled from "styled-components";

function MusicPlayer({
  state,
  audioRef,
  playNext,
  getCurrentTime,
  togglePlay,
  handlePlay,
  toggleHeart,
  handleVolume,
  handleTimeline,
  getSongDuration,
  handleLoop,
  playPrev,
  handleShuffle,
}) {
  return (
    <>
      <TimelineTime>
        <input
          type="range"
          id="timeline"
          name="timeline"
          min="0"
          step="0.01"
          max={audioRef.current?.duration || 0}
          value={audioRef.current?.currentTime || 0}
          onChange={handleTimeline}
          onInput={handleTimeline}
          onMouseDown={() => {
            audioRef.current.pause();
          }}
          onMouseUp={() => {
            audioRef.current.play();
          }}
        />
        <div className="timer-sec">
          <span className="currentSongTime">{getCurrentTime()}</span>
          <span className="dash">/</span>
          <span className="songDuration">{getSongDuration()}</span>
        </div>
      </TimelineTime>
      <PlayerFooter>
        <div className="footer-left">
          <div className="left-img-icon">
            <img
              className="album-cover"
              src={state.song[state.currentSongIndex]?.selectedImageThumbnail}
              alt="Album Cover"
            />
            <div className="song-info">
              <span className="song-name">{state.song[state.currentSongIndex]?.title}</span>
              {/* <span className="artist-name">{state.song[state.currentSongIndex]?.artistName}</span> */}
            </div>
          </div>
          <ActionIcons>
            <div className="act-like" onClick={toggleHeart}>
              {!state?.filledHeart ? (
                <img className="album-cover" src={Heart} alt="Album Cover" />
              ) : (
                <img
                  className="album-cover"
                  src={HeartFill}
                  alt="Album Cover"
                />
              )}
            </div>
            <div className="act-thanks">
              <img className="album-cover" src={Thanks} alt="Album Cover" />
            </div>
            <div className="act-queue">
              <img className="album-cover" src={Queue} alt="Album Cover" />
            </div>
          </ActionIcons>
        </div>
        <FooterCenter className="footer-center">
          <div className="play-pause-buttons">
            <div onClick={handleShuffle}>
              <img className="album-cover" src={Shuffle} alt="Album Cover" />
            </div>
            <div onClick={playPrev}>
              <img className="album-cover" src={Back} alt="Album Cover" />
            </div>
            {state.playing ? (
              <div onClick={togglePlay} id="pause" className="pause">
                <img className="album-cover" src={Pause} alt="Album Cover" />
              </div>
            ) : (
              <div onClick={togglePlay} id="play" className="play">
                <img className="album-cover" src={Play} alt="Album Cover" />
              </div>
            )}
            <div onClick={playNext}>
              <img className="album-cover" src={Next} alt="Album Cover" />
            </div>
            <div onClick={handleLoop}>
              <img className="album-cover" src={Repeat} alt="Album Cover" />
            </div>
          </div>
        </FooterCenter>
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
            onChange={handleVolume}
          />
          <div>
            <img
              className="album-cover now-playing"
              src={NowPlaying}
              alt="Album Cover"
            />
          </div>
        </VolumeBar>
        <audio
          ref={audioRef}
          src={state.song[state.currentSongIndex]?.fileUrl}
          id="song"
          preload="auto"
          onEnded={playNext}
          onPlay={handlePlay}
          onTimeUpdate={getCurrentTime}
          autoPlay
        ></audio>
      </PlayerFooter>
    </>
  );
}

export default MusicPlayer;

const PlayerFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #000;
  padding: 20px 15px;
  position: fixed;
  bottom: 0;
  width: auto;
  left: 0;
  right: 0;
  z-index: 1000;
  @media (max-width: 991px) {
    flex-direction: column;
  }
  div {
    background-color: transparent;
  }
  .footer-left {
    display: flex;
    align-items: center;
    gap: 10px;
    min-width: 450px;
    justify-content: space-between;
    @media (max-width: 1199px) {
      min-width: 330px;
    }
    @media (max-width: 991px) {
      min-width: 100%;
    }
    .left-img-icon {
      display: flex;
      align-items: center;
      gap: 10px;
      img {
        width: 50px;
        @media (max-width: 991px) {
          display: none;
        }
      }
    }
    img {
      width: 32px;
    }
    .song-info {
      color: #fff;
      span {
        display: block;
        color: #fff;
        &:last-child {
          opacity: 0.5;
        }
      }
    }
  }
`;
const ActionIcons = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  div {
    cursor: pointer;
    img {
      width: 32px;
    }
  }
  .act-queue {
    @media (max-width: 991px) {
      display: none;
    }
  }
  .act-thanks {
    @media (max-width: 991px) {
      position: absolute;
      bottom: 0;
      left: 15px;
    }
  }
`;

const FooterCenter = styled.div`
  &.footer-center {
    @media (max-width: 991px) {
      width: 100%;
      background-color: #101213;
      padding: 10px 0;
      margin: 10px 0 50px;
    }
  }

  .play-pause-buttons {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    @media (max-width: 991px) {
      justify-content: center;
    }
    img {
      width: 32px;
      cursor: pointer;
      @media (max-width: 991px) {
        width: 26px;
      }
    }
    .pause,
    .play {
      background-color: #687550;
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
    --track-height: 3px;
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
    @media (max-width: 991px) {
      display: none;
    }
  }
  .now-playing {
    @media (max-width: 991px) {
      position: absolute;
      right: 15px;
      bottom: 8px;
    }
  }
`;

const TimelineTime = styled.div`
  position: fixed;
  width: 100%;
  bottom: 90px;
  z-index: 99;
  background-color: transparent;
  @media (max-width: 991px) {
    bottom: 44px;
    margin: 0 15px;
    width: calc(100% - 30px);
  }

  input[type="range"] {
    font-size: 1.5rem;
    width: 100%;
    margin: 0;
  }

  input[type="range"] {
    color: #687550;
    --thumb-height: 22px;
    --thumb-width: 30px;
    --track-height: 12px;
    --track-color: #a3c4a3;
    --brightness-hover: 180%;
    --brightness-down: 80%;
    --clip-edges: 0.0125em;
    @media (max-width: 991px) {
      --thumb-height: 4px;
      --thumb-width: 26px;
      --track-height: 3px;
    }
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

  .timer-sec {
    position: absolute;
    right: 15px;
    margin-top: 2px;
    background-color: transparent;
    @media (max-width: 991px) {
      display: none;
    }
    .dash {
      color: #fff;
      margin: 0 5px;
    }
    .currentSongTime {
      color: #fff;
      opacity: 0.6;
    }
    .songDuration {
      color: #fff;
    }
  }
`;
