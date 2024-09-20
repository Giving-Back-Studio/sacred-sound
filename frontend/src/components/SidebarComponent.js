import React, { useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link, Outlet } from "react-router-dom";
import SacredSoundLogo from "../assets/Logo.png";
import LibraryIcon from "../assets/library-icon.png";
import Feed from "../assets/Vector.png";
import MyAcc from "../assets/profile.png";
import { useAuth0 } from "@auth0/auth0-react";
import Concert from "../assets/Group 189.png";
import MenuBar from "../assets/menubar.svg";
import styled from "styled-components";
import axios from "axios";
import { useLocation } from "react-router-dom";
import MyAccount from "../pageComponents/MyAccount";

const SidebarComponent = () => {
  const { user, isAuthenticated } = useAuth0();
  // const isAuthenticated = true;
   // const user = { name: "debug9@debug.com" };
  const [toggled, setToggled] = React.useState(false);
  const location = useLocation();
  const [broken, setBroken] = React.useState(
    window.matchMedia("(max-width: 991px)").matches
  );

  const [searchTerm, setSearchTerm] = useState('');
  const [isSearched, setIsSearched] = useState(false);
  const [result, setResult] = useState({tracks: [],
                                        albums: [],
                                        artists: []})
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    if(e.target.value.length < 1){
      setIsSearched(false)
    }
  };

  const fetchSearchResult = async (searchQuery) => {
    try {
      let url = `${process.env.REACT_APP_API_BASE_URL}/api/getSearchResult/${user.name}/${searchQuery}`;

      const response = await axios.get(url);
      if (response.status === 200) {
        // let data = {
        //   tracks: ['65e86b2fc36e577d0ad7dcc8', '65eab5186300c6e4285f0ae1'],
        //   albums: ['65eac9a5aaa244ed32c5229a', '65eb078fb499bd61022878a2'],
        //   artists: ['65e81221faffe0217f791b44']
        // };
        let data = response.data
        if(data.tracks.length > 0){
          let list = []
          await Promise.allSettled(
            data.tracks.map(async (id) => {
              const videoResp = await axios.get(
                `${process.env.REACT_APP_API_BASE_URL}/api/getTrack/${id}`
              );
              const videoData = videoResp.data.track;
              if (videoData) {
                list.push({
                  ...videoData, contentType: videoData.isOnlyAudio ? 'audio' : 'video'
                });
              }
            })
          );
          data.tracks = list; 
        }else{
          data.tracks = []
        }
        if(data.albums.length > 0){
          let list = []
          await Promise.allSettled(
            data.albums.map(async (id) => {
              const albumResp = await axios.get(
                `${process.env.REACT_APP_API_BASE_URL}/api/getAlbum/${id}`
              );
              const albumData = albumResp.data.album;
              if (albumData) {
                list.push({
                  ...albumData,contentType: 'album'
                });
              }
            })
          );
          data.albums = list; 
        }else{
          data.albums = []
        }
        if(data.artists.length > 0){
          let list = []
          await Promise.allSettled(
            data.artists.map(async (id) => {
              const artistResp = await axios.get(
                `${process.env.REACT_APP_API_BASE_URL}/api/getUserProfileById/${id}`
              );
              const artistData = artistResp.data;
              if (artistData) {
                list.push({
                  title: artistData.accountName, user: artistData, selectedImageThumbnail: artistData.profileImageUrl, contentType: 'artist'
                });
              }
            })
          );
          data.artists = list; 
        }else{
          data.artists = []
        }
        
        setResult(data)
      } else {
        console.error(`Request failed with status: ${response.status}`);
      }
    } catch (error) {
      console.error(`An error occurred: ${error}`);
    }
  };

  const handleKeyDown = async (e) => {
    if (e.key === 'Enter') {
      if(searchTerm.length > 0){
        await fetchSearchResult(searchTerm)
        setIsSearched(true)
      }else{
        setIsSearched(false)
      }
    }
  };
  return (
    <>
      <Main className="main-wrapper">
        <Sidebar
          className="sidebar"
          toggled={toggled}
          customBreakPoint="991px"
          onBreakPoint={setBroken}
          onBackdropClick={() => setToggled((prev) => !prev)}
        >
          <Logo>
            <img src={SacredSoundLogo} alt="logo"></img>
          </Logo>
          {/* {location.pathname === "/main/library" && ( */}
            <SearchContainer>
            <SearchInput
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearch}
              onKeyDown={handleKeyDown}
            />
            </SearchContainer>
          {/* )} */}
          
          <Menu
            className="side-menu"
            menuItemStyles={{
              button: {
                [`&.active`]: {
                  backgroundColor: "#13395e",
                  color: "#b6c8d9",
                },
              },
            }}
          >
            <MenuItem component={<Link to="library" />}>
              <img src={LibraryIcon} alt="Upload" /> Library
            </MenuItem>
            <MenuItem component={<Link to="concert" />}>
              <img src={Concert} alt="Upload" /> Concert Hall
            </MenuItem>
            <MenuItem component={<Link to="#" />}>
              <img src={Feed} alt="Upload" /> Feed
            </MenuItem>

            <MenuItem className="sidebar-bottom-menu" component={<Link to="/MyAccount" />}>
              <img src={MyAcc} alt="Upload" /> My Account
            </MenuItem>

          </Menu>
        </Sidebar>

        <MenuButton>
          {broken && (
            <div className="menu-button" onClick={() => setToggled(!toggled)}>
              <img src={MenuBar} alt="menubar" />
            </div>
          )}
        </MenuButton>
        <Outlet context={{ isSearched, result }} />
      </Main>
    </>
  );
};

export default SidebarComponent;

const Main = styled.div`
  display: flex;
  .sidebar {
    .ps-sidebar-container {
      background-color: #fff;
      .ps-menuitem-root {
        a {
          .ps-menu-label {
            gap: 15px;
            display: flex;
            align-items: center;
          }
        }
    }
    }
    .side-menu{
      li{
        margin:15px 0
      }
      .sidebar-bottom-menu{
        position: absolute;
        bottom: 30px;
    }
    }
  }
`;

const Logo = styled.div`
padding: 18px;
  img {
  width: 100%;
}
`;

const MenuButton = styled.div`
position: absolute;
z-index: 99;
background-color: transparent !important;
  * {
  background-color: transparent !important;
}
  img {
  padding: 10px;
  margin: 10px;
  cursor: pointer;
}
`;

const SearchContainer = styled.div`
  display: flex;
  width: 100%;
  margin: auto;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 15px;
  padding: 0 20px;
  box-sizing: border-box;
`;

const SearchInput = styled.input`
  padding: 10px;
  border-radius: 20px;
  border: none;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  font-size: 16px;
  width: 300px;
`;