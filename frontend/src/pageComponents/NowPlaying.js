import React, { useEffect, useState, createContext, useContext } from "react";
import MusicPlayer from "../components/MusicPlayer";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import styled from "styled-components";
import useAudioPlayer from "../Hooks/useAudioPlayer";
import { Outlet } from "react-router-dom";
import axios from "axios";
import MediaControl from "../components/MediaControl";
import { useAuth0 } from '@auth0/auth0-react';

// const isAuthenticated = true;
// const user = { name: "debug9@debug.com" };

const NowPlayingContext = createContext({});

const MemoizedComponent = React.memo(({ children }) => {
  return <>{children}</>
});

function NowPlaying({ children }) {
const { user, isAuthenticated } = useAuth0();

  const [smallScreen, setSmallScreen] = useState(true);
  const [toggle, setToggle] = useState(false);
  const handle = useFullScreenHandle();
  const {
    state,
    setState,
    audioRef,
    getCurrentTime,
    playNext,
    togglePlay,
    toggleHeart,
    handleVolume,
    handleTimeline,
    getSongDuration,
    handleLoop,
    playPrev,
    handleShuffle,
    handlePlay,
    setSongs,
    getCurrentSong,
    getCurrentRunningStatus
  } = useAudioPlayer();
  useEffect(() => {
    const updateTimeline = () => {
      if (audioRef.current) {
        setState((prevState) => ({
          ...prevState,
          time: audioRef.current.currentTime,
        }));
      }
    };
    const currentAudioRef = audioRef.current;
    currentAudioRef.addEventListener("timeupdate", updateTimeline);

    return () => {
      currentAudioRef.removeEventListener("timeupdate", updateTimeline);
    };
  }, [audioRef, setState, state.currentSongIndex, state.song]);

  useEffect(() => {    

    const userLog = async () => {
      try {
        const response  = await axios.post(
          `${process.env.REACT_APP_API_BASE_URL}/api/logContentUsage/`,
          {
            user: user.name,  
            videoId: state.song[0].id,
          }
        );
      } catch (error) {
        console.log("error creating userLog", error);
      }
    };

    if(state.playing){
      const intervalId = setInterval(userLog, 60000)
      return () => {
        clearInterval(intervalId)
      };
    }
  }, [state.playing]);

  return (
  <>
    {state.song[state.currentSongIndex].isVideo ?  
      <NowPlayingContext.Provider
     value={{
      state,
      setState,
      audioRef,
      getCurrentTime,
      playNext,
      togglePlay,
      toggleHeart,
      handleVolume,
      handleTimeline,
      getSongDuration,
      handleLoop,
      playPrev,
      handleShuffle,
      handlePlay,
      setSongs,
      getCurrentSong,
      getCurrentRunningStatus
     }}
   >   
      <FullScreenOuter className={smallScreen ? "mini-screen library-mini-screen" : " library-full-screen"}>
      <FullScreen handle={handle}>
      <>
      <MusicPlayer
      audioRef={audioRef}
      setSmallScreen={setSmallScreen}
      smallScreen={smallScreen}
      setState={setState}
      state={state}
      playNext={playNext}
      getCurrentTime={getCurrentTime}
      togglePlay={togglePlay}
      toggleHeart={toggleHeart}
      handleVolume={handleVolume}
      handleTimeline={handleTimeline}
      getSongDuration={getSongDuration}
      handleLoop={handleLoop}
      playPrev={playPrev}
      handlePlay={handlePlay}
      handleShuffle={handleShuffle}
    />
      <MediaControl
          state={state}
          audioRef={audioRef}
          handle={handle}
          setToggle={setToggle}
          toggle={toggle}
          smallScreen={smallScreen}
          setSmallScreen={setSmallScreen}
          playNext={playNext}
          getCurrentTime={getCurrentTime}
          setState={setState}
          handlePlay={handlePlay}
        />
        </>
      </FullScreen>
    </FullScreenOuter>
      <Outlet/>
    </NowPlayingContext.Provider>
      : 
    <NowPlayingContext.Provider
      value={{
        state,
        setState,
        audioRef,
        getCurrentTime,
        playNext,
        togglePlay,
        toggleHeart,
        handleVolume,
        handleTimeline,
        getSongDuration,
        handleLoop,
        playPrev,
        handleShuffle,
        handlePlay,
        setSongs,
        getCurrentSong,
        getCurrentRunningStatus
      }}
    >
      <MemoizedComponent>
        {children}
      </MemoizedComponent>
      <MainContainer>
     <MusicPlayer
          audioRef={audioRef}
          setSmallScreen={setSmallScreen}
          smallScreen={smallScreen}
          setState={setState}
          state={state}
          playNext={playNext}
          getCurrentTime={getCurrentTime}
          togglePlay={togglePlay}
          toggleHeart={toggleHeart}
          handleVolume={handleVolume}
          handleTimeline={handleTimeline}
          getSongDuration={getSongDuration}
          handleLoop={handleLoop}
          playPrev={playPrev}
          handlePlay={handlePlay}
          handleShuffle={handleShuffle}
        />
        </MainContainer>
        <Outlet/>
    </NowPlayingContext.Provider>
}
 </> );
}

export const usePlayingContext = (cb) => {
 let val =  useContext(NowPlayingContext);
 if(cb) val = cb(val);
 return val
}

export default NowPlaying;



const MainContainer = styled.div`
  position: absolute;
`
const FullScreenOuter = styled.div`
  display: flex;
  align-items: center;
  height: calc(100vh - 120px);
  width: 50%;
  @media (max-width: 991px) {
    height: calc(100vh - 206px);
    width: 100%;
  }
  &.library-full-screen{
    position: absolute;
    width:100%;
    z-index:999;
  }
  &.mini-screen {
    height: 200px;
    width: 200px;
    &.library-mini-screen{
      height: 0px;
    }
    .fullscreen {
      height: 200px;
      .icon-img-outer {
        height: 200px;
        position: absolute;
        right: 0;
        bottom: 111px;

        .icon {
          width: 100px;
          img {
            max-width: 38px !important;
          }
        }
        .banner-img {
          height: 200px !important;
          width: 200px !important;
          position: relative;
          padding-bottom: 0;

          &:before {
            content: "";
            position: absolute;
            inset: 0;
            width: 200px !important;
            height: 200px !important;
            background-color: #0000005c;
            z-index: 99;
          }
        }
      }
    }
  }

  .fullscreen {
    width: 100%;
    overflow: hidden;
    height: calc(100vh - 111px);
    @media (max-width: 991px) {
      height: calc(100vh - 206px);
    }

    .icon-img-outer {
      position: relative;
      transition: all 0.5s;
      .icon {
        position: absolute;
        right: 10px;
        top: 15px;
        z-index: 99999;
        background-color: transparent;
      }
      .banner-img {
        height: 100%;
        width: 100%;
        position: relative;
        padding-bottom: calc(100vh - 111px);
        @media (max-width: 991px) {
          padding-bottom: calc(100vh - 204px);
        }

        &:before {
          content: "";
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          background-color: #0000005c;
          z-index: 99;
          transition: all 0.5s;
        }
        img,
        video {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 2;
          object-fit: cover;
          transition: all 0.5s;
        }
      }
    }
  }
`;

