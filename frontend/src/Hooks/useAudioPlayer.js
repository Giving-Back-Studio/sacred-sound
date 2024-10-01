import { useState, useRef } from "react";
import Banner from "../assets/Image.svg";
import Banner2 from "../assets/images.jpeg";
import Banner3 from "../assets/download.jpeg";
import Banner4 from "../assets/playlist.jpg";
const playListData = {
  time: "",
  volume: "",
  muted: false,
  playing: false,
  filledHeart: false,
  loop: false,
  shuffle: false,
  albumCoverUrl: "",
  artistName: "",
  queue: [],
  song: [
    {
      id: 1,
      songUrl:
        "https://onlinetestcase.com/wp-content/uploads/2023/06/1-MB-MP3.mp3",
      songTitle: "song-1",
      isVideo: false,
      img: Banner,
    },
    {
      id: 2,
      songUrl:
        "https://cdn.simplecast.com/audio/cae8b0eb-d9a9-480d-a652-0defcbe047f4/episodes/af52a99b-88c0-4638-b120-d46e142d06d3/audio/500344fb-2e2b-48af-be86-af6ac341a6da/default_tc.mp3",
      songTitle: "song-2",
      isVideo: false,
      img: Banner2,
    },
    {
      id: 3,
      songUrl:
        "http://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Kangaroo_MusiQue_-_The_Neverwritten_Role_Playing_Game.mp3",
      songTitle: "song-3",
      isVideo: false,
      img: Banner3,
    },
    {
      id: 4,
      songUrl:
        "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      songTitle: "song-3",
      isVideo: true,
      img: Banner4,
    },
  ],
  currentSongIndex: 0,
  album: null,
};

const useAudioPlayer = () => {
  const [state, setState] = useState(playListData);
  const audioRef = useRef(null);

  const getCurrentTime = () => {
    if (audioRef.current) {
      let totalSeconds = Math.floor(audioRef.current.currentTime);
      let minutes = Math.floor(totalSeconds / 60);
      let leftSeconds = totalSeconds - 60 * minutes;
      return `${minutes}:${leftSeconds < 10 ? "0" : ""}${leftSeconds}`;
    }
    return "0:00";
  };
  const setSongs = (songs) => {
    setState({ ...state, song: songs})
    togglePlay()
  }

  const getCurrentSong = () => {
    return state.song[state.currentSongIndex].id
  }

  const getCurrentRunningStatus = () => {
    return state.playing
  }
  const playNext = async () => {
    const nextIndex = (state.currentSongIndex + 1) % state.song.length;
    setState((prevState) => ({
      ...prevState,
      currentSongIndex: nextIndex,
    }));
    audioRef.current.src = state.song[nextIndex].songUrl;
    setTimeout(async () => {
      await audioRef?.current?.load();
      await audioRef?.current?.play();
    }, 400);
  };
  const togglePlay = () => {
    setState((prevState) => ({
      ...prevState,
      playing: !prevState.playing,
    }));

    if (state.playing) {
      // Pause if already playing
      audioRef?.current?.pause();
    } else {
      // Attempt to play the audio
      const playPromise = audioRef?.current?.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // Playback started successfully, update state
            setState((prevState) => ({
              ...prevState,
              playing: true,
            }));
          })
          .catch((error) => {
            // Autoplay was prevented or playback failed, revert the playing state
            console.error("Autoplay blocked or playback failed:", error);

            // Reset the state to not playing if it fails
            setState((prevState) => ({
              ...prevState,
              playing: false,
            }));
          });
      }
    }
  };


  const toggleHeart = () => {
    setState((prevState) => ({
      ...prevState,
      filledHeart: !prevState.filledHeart,
    }));
  };

  const handleVolume = (e, mute) => {
    let newVolume = e.target.value < 1 ? 0 : e.target.value;
    setState((prevState) => ({
      ...prevState,
      volume: newVolume,
      muted: newVolume < 1,
    }));
    audioRef.current.volume = newVolume / 100;
  };

  const handleTimeline = (e) => {
    console.log("audioRef.current.currentTime", audioRef.current.currentTime);
    setState((prevState) => ({
      ...prevState,
      time: e.target.value,
    }));
    audioRef.current.currentTime = e.target.value;
  };

  const getSongDuration = () => {
    if (audioRef.current) {
      let totalSeconds = Math.floor(audioRef.current.duration);
      let minutes = Math.floor(totalSeconds / 60);
      let leftSeconds = totalSeconds - 60 * minutes;
      return `${minutes}:${leftSeconds < 10 ? "0" : ""}${leftSeconds}`;
    }
    return "0:00";
  };

  const handleLoop = () => {
    const newLoopState = !state.loop;
    setState((prevState) => ({
      ...prevState,
      loop: newLoopState,
    }));
    audioRef.current.loop = newLoopState;
  };

  const playPrev = async () => {
    const prevIndex =
      (state.currentSongIndex - 1 + state.song.length) % state.song.length;
    setState((prevState) => ({
      ...prevState,
      currentSongIndex: prevIndex,
    }));
    audioRef.current.src = state.song[prevIndex].songUrl;
    await audioRef?.current?.load();
    await audioRef?.current?.play();
  };

  const handleShuffle = () => {
    const randomIndex = Math.floor(Math.random() * state.song.length);
    setState((prevState) => ({
      ...prevState,
      shuffle: true,
      currentSongIndex: randomIndex,
      playing: true,
    }));
  };
  const handlePlay = () => {
    setState((prevState) => ({ ...prevState, playing: true }));
  };
  return {
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
  };
};

export default useAudioPlayer;
