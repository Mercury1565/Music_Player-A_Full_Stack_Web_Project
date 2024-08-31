import React from 'react';
import { ThemeProvider } from '@emotion/react';
import { dashboard_icon, search_icon, profile_icon, favourite_icon, your_music_icon } from '../assets/assets';
import { my_theme } from '../styles/theme';
import { SidebarContainer } from '../styles/containers';
import SidebarButton from './sidebar_button';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';


const SideBar = () => {
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState('');

  const handleButtonClick = (text) => {
    setActiveButton(text);
    navigate(`/${text.toLowerCase()}`);
  };

  return (
    <ThemeProvider theme={my_theme}>
      <SidebarContainer>
        <SidebarButton
          text="Profile"
          icon={profile_icon}
          isActive={activeButton === 'Profile'}
          onClick={() => handleButtonClick('Profile')}
        />
        <SidebarButton
          text="Dashboard"
          icon={dashboard_icon}
          isActive={activeButton === ''}
          onClick={() => handleButtonClick('')}
        />
        <SidebarButton
          text="Favourite"
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
