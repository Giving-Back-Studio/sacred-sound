import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import HomePage from './pageComponents/HomePage';
import ArtistProfilePage from './pageComponents/ArtistProfilePage';
import AccountNameSelection from './pageComponents/ArtistAccountNameSelectionPage';
import NewCloudStudio from './pageComponents/NewCloudStudio';
import { GlobalStyle } from './components/GlobalStyle';
import ModifySingleTrackComponent from './components/CloudStudioComponents/ModifySingleTrackComponent';
import ArtistLandingPage from './pageComponents/ArtistLandingPage';
import VideoPlayer from './components/CloudStudioComponents/VideoPlayer';
import ModifyAlbum from './components/CloudStudioComponents/ModifyAlbum';
import NowPlaying from './pageComponents/NowPlaying';
import Search from './components/CloudStudioComponents/Search';
import VideoStreaming from './components/CloudStudioComponents/VideoStreaming';

const App = () => {
  const { isLoading, error } = useAuth0();
  return (
//test
    <BrowserRouter>
      <GlobalStyle></GlobalStyle>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/profile/:artistId" element={<ArtistProfilePage />} />
        <Route exact path="/prepareForQA/:videoId" element={<ModifySingleTrackComponent />} />
        <Route exact path="/studio" element={<NewCloudStudio />} />
        <Route exact path="/create" element={<ArtistLandingPage />} />
        <Route exact path="/AccountNameSelection" element={<AccountNameSelection />} />
        <Route exact path="/play/:videoId" element={<VideoPlayer />} />
        <Route exact path="/ModifyAlbum/:albumId" element={<ModifyAlbum />} />
        <Route exact path="/now-playing" element={<NowPlaying />} />
        <Route exact path="/search/:searchQuery" element={<Search/>}/>
        <Route exact path="/stream" element={<VideoStreaming/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;