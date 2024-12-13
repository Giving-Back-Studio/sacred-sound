import { useState, useRef, useEffect, useCallback } from "react";

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
  song: [],
  currentSongIndex: 0,
  album: null,
};

const useAudioPlayer = () => {
  const [state, setState] = useState(playListData);
  const audioRef = useRef(null);
  const stateRef = useRef(state);

  useEffect(() => {
    stateRef.current = state;
  }, [state]);

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
    console.log("setSongs received:", songs);
    
    setState(prevState => {
      const newState = {
        ...prevState,
        song: songs,
        currentSongIndex: 0
      };
      console.log("New state being set:", newState);
      return newState;
    });
  };

  const getCurrentSong = () => {
    console.log("state.song", state.song)
    console.log("state.currentSongIndex", state.currentSongIndex)
    console.log("state.song[state.currentSongIndex]", state.song[state.currentSongIndex])
    console.log("state.song[state.currentSongIndex].id", state.song[state.currentSongIndex].id)
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
  const togglePlay = useCallback(() => {
    console.log("Current state in togglePlay:", stateRef.current);
    
    setState(prevState => {
      const newState = {
        ...prevState,
        playing: !prevState.playing
      };
      return newState;
    });

    if (stateRef.current.playing) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play().catch(error => {
        console.log("Playback failed:", error);
      });
    }
  }, []);

  useEffect(() => {
    console.log("Song state changed:", state.song);
    if (state.song && state.song.length > 0) {
      console.log("Current song:", state.song[state.currentSongIndex]);
    }
  }, [state.song, state.currentSongIndex]);

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
