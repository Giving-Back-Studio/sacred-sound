import { useState, useRef } from "react";

const useAudioPlayer = (initialState) => {
  const [state, setState] = useState(initialState);
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
      audioRef?.current?.pause();
    } else {
      audioRef?.current?.play();
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
  };
};

export default useAudioPlayer;
