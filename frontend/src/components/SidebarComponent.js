import React, { useState, useEffect } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link, Outlet } from "react-router-dom";
import SacredSoundLogo from "../assets/Logo.png";
import LibraryIcon from "../assets/library-icon.png";
import Feed from "../assets/Vector.png";
import MyAcc from "../assets/profile.png";
import Concert from "../assets/Group 189.png";
// import StudioIcon from "../assets/studio-icon.png"; 
import MenuBar from "../assets/menubar.svg";
import styled from "styled-components";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useAuth } from '../context/AuthContext'; // Import your custom useAuth hook

const SidebarComponent = () => {
  const { userEmail } = useAuth(); // Use the custom hook to get the user's email
  const [toggled, setToggled] = useState(false);
  const location = useLocation();
  const [broken, setBroken] = useState(
    window.matchMedia("(max-width: 991px)").matches
  );

  const [searchTerm, setSearchTerm] = useState('');
  const [isSearched, setIsSearched] = useState(false);
  const [result, setResult] = useState({
    tracks: [],
    albums: [],
    artists: []
  });

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value.length < 1) {
      setIsSearched(false);
    }
  };

  const fetchSearchResult = async (searchQuery) => {
    try {
      let url = `${process.env.REACT_APP_API_BASE_URL}/api/getSearchResult/${userEmail}/${searchQuery}`;

      const response = await axios.get(url);
      if (response.status === 200) {
        let data = response.data;
        // Handle search result logic here
      } else {
        console.error(`Request failed with status: ${response.status}`);
      }
    } catch (error) {
      console.error(`An error occurred: ${error}`);
    }
  };

  const handleKeyDown = async (e) => {
    if (e.key === 'Enter') {
      if (searchTerm.length > 0) {
        await fetchSearchResult(searchTerm);
        setIsSearched(true);
      } else {
        setIsSearched(false);
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
          style={{ backgroundColor: '#D9D9E7 !important' }} // Force background color
        >
          <Logo>
            <img src={SacredSoundLogo} alt="logo"></img>
          </Logo>
          <SearchContainer>
            <SearchInput
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearch}
              onKeyDown={handleKeyDown}
            />
          </SearchContainer>

          <Menu
            className="side-menu"
            menuItemStyles={{
              button: {
                display: 'flex',
                alignItems: 'center',
                padding: '10px',
                height: 'auto', // Ensure height is flexible
                [`&.active`]: {
                  backgroundColor: "#13395e",
                  color: "#b6c8d9",
                },
              },
            }}
          >
            <MenuItem
            component={<Link to="library" />}
            icon={<img src={LibraryIcon} alt="Library" />}
            >
              Library
            </MenuItem>

            <MenuItem
            component={<Link to="concert"/>}
            icon={<img src={Concert} alt="Concert Hall" />}
            >
              Concert Hall
            </MenuItem>

            <MenuItem
            component={<Link to="#"/>}
            icon={<img src={Feed} alt="Feed" />}
            >
              Feed
            </MenuItem>
            
            {/* Add the Studio Navigation here */}
            <MenuItem
            component={<Link to="/studio"/>}
            >
              Studio
            </MenuItem>

            <div style={{ paddingTop: '300px' }}>
              <MenuItem
              component={<Link to="/MyAccount"/>}
              icon={<img src={MyAcc} alt="My Account" />}
              >
                My Account
              </MenuItem>
            </div>
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

// Styles remain the same
const Main = styled.div`
  display: flex;
  background: #434289; 
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
