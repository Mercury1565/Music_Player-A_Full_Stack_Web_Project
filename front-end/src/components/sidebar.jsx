import React from 'react';
import { ThemeProvider } from '@emotion/react';
import { dashboard_icon, search_icon, profile_icon, favourite_icon, your_music_icon, top_music_header_icon, logo_icon } from '../assets/assets';
import { my_theme } from '../styles/theme';
import { SidebarContainer, SidebarLogoContainer, LogoutContainer } from '../styles/containers';
import SidebarButton from './sidebar_button';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { LogoIconStyle, LogoutIconStyle } from '../styles/icons';
import { LogoutButton } from '../styles/buttons';
import { useDispatch } from "react-redux"


const SideBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [activeButton, setActiveButton] = useState('');
  const [showLogout, setShowLogout] = useState(false);
  
  const handleButtonClick = (text) => {
    setActiveButton(text);
    navigate(`/${text.toLowerCase()}`);
  };

  const handleLogout = () => {
    dispatch({ type: 'auth/logoutRequest' });
    navigate('/login');
  };

  return (
    <ThemeProvider theme={my_theme}>
      <SidebarContainer>
        <SidebarLogoContainer>
          <LogoIconStyle src={logo_icon}/>
          <LogoutContainer>
            <div>
            <LogoutIconStyle src={profile_icon} onClick={() => {setShowLogout(!showLogout)}}/>
            </div>
            {showLogout && (
            <div>
              <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
            </div>
            )}
          </LogoutContainer>
        </SidebarLogoContainer>

        <SidebarButton
          text="Dashboard"
          icon={dashboard_icon}
          isActive={activeButton === ''}
          onClick={() => handleButtonClick('')}
        />
        <SidebarButton
          text="Favourites"
          icon={favourite_icon}
          isActive={activeButton === 'favourite'}
          onClick={() => handleButtonClick('favourite')}
        />
        <SidebarButton
          text="Search"
          icon={search_icon}
          isActive={activeButton === 'Search'}
          onClick={() => handleButtonClick('Search')}
        />
        <SidebarButton
          text="Your Music"
          icon={your_music_icon}
          isActive={activeButton === 'Your_Music'}
          onClick={() => handleButtonClick('Your_Music')}
        />
      </SidebarContainer>
    </ThemeProvider>
  );
};



export default SideBar;
