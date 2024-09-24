import React from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link, Outlet, useNavigate } from "react-router-dom";
import SacredSoundLogo from "../assets/Logo.png";
import LibraryIcon from "../assets/library-icon.png";
import Feed from "../assets/Vector.png";
import Concert from "../assets/Group 189.png";
import MenuBar from "../assets/menubar.svg";
import styled from "styled-components";
import profile from "../assets/profile.png"
import memberCard from "../assets/member-card.png";
import heart from "../assets/heart.png";
import time from "../assets/time.png";
import like from "../assets/like.png";

const MyAccountSidebarComponent = () => {
  const [toggled, setToggled] = React.useState(false);
  
  const [broken, setBroken] = React.useState(
    window.matchMedia("(max-width: 991px)").matches
  );

  const navigate = useNavigate();

const handleLogout = async () => {
  try {
    // Call the backend API to clear the refresh token cookie
    await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/logout`, {
      method: 'POST',
      credentials: 'include', // Ensures cookies (like refreshToken) are sent with the request
    });

    // Clear tokens from localStorage
    localStorage.removeItem('sacredSound_accessToken');
    localStorage.removeItem('sacredSound_authToken');
    
    // Redirect to login page
    navigate('/login');
  } catch (error) {
    console.error('Logout failed:', error);
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
            <Link to="/main/library">
              <img src={SacredSoundLogo} alt="logo"></img>
            </Link>
          </Logo>
          <Menu
            menuItemStyles={{
              button: {
                [`&.active`]: {
                  backgroundColor: "#13395e",
                  color: "#b6c8d9",
                },
              },
            }}
          >
            <MenuItem component={<Link to="" />}>
              <img src={profile} alt="Upload" /> My Account
            </MenuItem>
            <MenuItem component={<Link to="manage-plan" />}>
              <img src={memberCard} alt="Upload" /> My Membership</MenuItem>
            <MenuItem component={<Link to="loved-content" />}>
              <img src={heart} alt="Upload" /> Loved Content</MenuItem>
              <MenuItem component={<Link to="playback-history" />}>
              <img src={time} alt="Upload" /> Playback History</MenuItem>
              <MenuItem component={<Link to="favorite-artists" />}>
              <img src={like} alt="Upload" /> Favorite Artists</MenuItem>
            <div style={{ padding: '180px 0' }}></div>
            <MenuItem onClick={handleLogout}>
              Logout
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
        <Outlet />
      </Main>
    </>
  );
};

export default MyAccountSidebarComponent;

const Main = styled.div`
  display: flex;
  .sidebar {
    .ps-sidebar-container {
      background-color: #fff;
      .ps-menuitem-root{
        a{
          .ps-menu-label{
            gap: 15px;
            display: flex;
            align-items: center;
          }
        }
    }
    }
  }
`;

const Logo = styled.div`
padding: 18px;
img{
  width: 100%;
}
`;

const MenuButton = styled.div`
position: absolute;
z-index: 99;
background-color: transparent !important;
*{
  background-color: transparent !important;
}
img{
  padding: 10px;
  margin: 10px;
  cursor: pointer;
}
`;


