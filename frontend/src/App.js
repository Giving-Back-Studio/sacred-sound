import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext"; // Import AuthProvider
import { GlobalStyle } from './components/GlobalStyle';
import PrivateRoute from './components/PrivateRoute'; // Import PrivateRoute

// Import all your components
import ArtistProfilePage from './pageComponents/ArtistProfilePage';
import NewCloudStudio from './pageComponents/NewCloudStudio';
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
import Topics from "./pageComponents/Topics";
import PaymentDetail from "./pageComponents/PaymentDetails";
import Login from './pageComponents/Login';
import Signup from './pageComponents/Signup';
import ForgotPassword from './pageComponents/Forgot';
import ResetPassword from './pageComponents/Reset';
import ArtistSignup from './pageComponents/ArtistSignup';

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <GlobalStyle />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/topics" element={<Topics />} />
          <Route path="/payment-details" element={<PaymentDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/artist-signup" element={<ArtistSignup />} />
          <Route path="/forgot" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/create" element={<ArtistLandingPage />}/>

          {/* Protected Routes */}
          <Route
            path="/profile/:artistId"
            element={
              <PrivateRoute>
                <ArtistProfilePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/prepareForQA/:videoId"
            element={
              <PrivateRoute>
                <ModifySingleTrackComponent />
              </PrivateRoute>
            }
          />
          <Route
            path="/studio"
            element={
              <PrivateRoute>
                <NewCloudStudio />
              </PrivateRoute>
            }
          />
          <Route
            path="/play/:videoId"
            element={
              <PrivateRoute>
                <VideoPlayer />
              </PrivateRoute>
            }
          />
          <Route
            path="/ModifyAlbum/:albumId"
            element={
              <PrivateRoute>
                <ModifyAlbum />
              </PrivateRoute>
            }
          />
          <Route
            path="/myAccount"
            element={
              <PrivateRoute>
                <MyAccountSidebarComponent />
              </PrivateRoute>
            }
          >
            {/* Nested Routes for MyAccount */}
            <Route path="" element={<MyAccount />} />
            <Route path="orders" element={<OrderHistory />} />
            <Route path="make-order" element={<Subscribe />} />
            <Route path="manage-plan" element={<MangePlan />} />
            <Route path="save-card" element={<SaveCard />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="playback-history" element={<PlayBackHistory />} />
            <Route path="checkout-result" element={<CheckoutResult />} />
            <Route path="favorite-artists" element={<FavoriteArtists />} />
            <Route path="loved-content" element={<LovedContent />} />
          </Route>
          <Route
            path="/play-screen"
            element={
              <PrivateRoute>
                <PlayScreen />
              </PrivateRoute>
            }
          />
          <Route
            path="/search/:searchQuery"
            element={
              <PrivateRoute>
                <Search />
              </PrivateRoute>
            }
          />
          <Route
            path="/stream"
            element={
              <PrivateRoute>
                <VideoStreaming />
              </PrivateRoute>
            }
          />
          {/* Nested Routes under "NowPlaying" */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <NowPlaying />
              </PrivateRoute>
            }
          >
            <Route path="main" element={<SidebarComponent />}>
              <Route path="library" element={<PrivateRoute><Library /></PrivateRoute>} />
              <Route path="artist" element={<PrivateRoute><Artist /></PrivateRoute>} />
              <Route path="track" element={<PrivateRoute><TrackPage /></PrivateRoute>} />
              <Route path="album" element={<PrivateRoute><Album /></PrivateRoute>} />
              <Route path="concert" element={<PrivateRoute><Concert /></PrivateRoute>} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
