import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
// import HomePage from './pageComponents/HomePage';
import ArtistProfilePage from './pageComponents/ArtistProfilePage';
// import AccountNameSelection from './pageComponents/ArtistAccountNameSelectionPage';
import NewCloudStudio from './pageComponents/NewCloudStudio';
import { GlobalStyle } from './components/GlobalStyle';
import ModifySingleTrackComponent from './components/CloudStudioComponents/ModifySingleTrackComponent';
import ArtistLandingPage from './pageComponents/ArtistLandingPage';
import VideoPlayer from './components/CloudStudioComponents/VideoPlayer';
import ModifyAlbum from './components/CloudStudioComponents/ModifyAlbum';
import NowPlaying from './pageComponents/NowPlaying';
import Search from './components/CloudStudioComponents/Search';
import Library from './pageComponents/Library';
import SidebarComponent from './components/SidebarComponent';
import Artist from './pageComponents/Artist';
import TrackPage from './pageComponents/Track';
import Album from './pageComponents/Album';
import Concert from './pageComponents/Concert';
import PlayScreen from './pageComponents/PlayScreen';
import VideoStreaming from './components/CloudStudioComponents/VideoStreaming';
import Subscribe from "./components/Payment/Subscribe";
import MangePlan from "./components/Payment/MangePlan";
import OrderHistory from "./components/Payment/OrderHistory";
import SaveCard from "./components/Payment/SaveCard";
import Checkout from "./components/Payment/Checkout";
import CheckoutResult from "./components/Payment/CheckoutResult";
import MyAccountSidebarComponent from "./components/MyAccountSidebar";
import FavoriteArtists from "./pageComponents/FavoriteArtists";
import LovedContent from "./pageComponents/LovedContent";
import MyAccount from "./pageComponents/MyAccount";
import PlayBackHistory from "./pageComponents/PlaybackHistory";
import LandingPage from "./pageComponents/LandingPage";
import Welcome from "./pageComponents/Welcome";
import Topics from "./pageComponents/Topics"
import PaymentDetail from "./pageComponents/PaymentDetails";
import Login from './pageComponents/Login';
import Signup from './pageComponents/Signup';
import ForgotPassword from './pageComponents/Forgot';
import ResetPassword from './pageComponents/Reset';

const App = () => {
  const { isLoading, error } = useAuth0();
  return (
    <BrowserRouter>
      <GlobalStyle></GlobalStyle>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="/welcome" element={<Welcome />} />
        <Route exact path="/topics" element={<Topics />} />
        <Route exact path="/payment-details" element={<PaymentDetail/>}/>
        <Route
          exact
          path="/profile/:artistId"
          element={<ArtistProfilePage />}
        />
        <Route
          exact
          path="/prepareForQA/:videoId"
          element={<ModifySingleTrackComponent />}
        />
        <Route exact path="/studio" element={<NewCloudStudio />} />
        <Route exact path="/create" element={<ArtistLandingPage />} />
        <Route exact path="/payment-details" element={<PaymentDetail />} />
        <Route exact path="/play/:videoId" element={<VideoPlayer />} />
        <Route exact path="/ModifyAlbum/:albumId" element={<ModifyAlbum />} />

        <Route exact path="/myAccount" element={<MyAccountSidebarComponent/>}>
          <Route exact path="" element={<MyAccount/>}/>
          <Route exact path="orders" element={<OrderHistory />} />
          <Route exact path="make-order" element={<Subscribe />} />
          <Route exact path="manage-plan" element={<MangePlan />} />
          <Route exact path="save-card" element={<SaveCard />} />
          <Route exact path="checkout" element={<Checkout/>} />
          <Route exact path="playback-history" element={<PlayBackHistory/>} />
          <Route exact path="checkout-result" element={<CheckoutResult/>} />
          <Route exact path="favorite-artists" element={<FavoriteArtists/>}/>
          <Route exact path="loved-content" element={<LovedContent/>}/>
        </Route>

        <Route exact path="/play-screen" element={<PlayScreen />} />
        <Route exact path="/search/:searchQuery" element={<Search/>}/>
        <Route exact path="/stream" element={<VideoStreaming/>}/>
        <Route exact path="/" element={<NowPlaying/>}>
            <Route exact path="/main" element={<SidebarComponent/>}>
              <Route exact path="library" element={<Library/>}/>
              <Route exact path="artist" element={<Artist/>}/>
              <Route exact path="track" element={<TrackPage/>}/>
              <Route exact path="album" element={<Album/>}/>
              <Route exact path="concert" element={<Concert/>}/>
            </Route>
          </Route>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/forgot" element={<ForgotPassword />} />
        <Route exact path="/reset" element={<ResetPassword />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
