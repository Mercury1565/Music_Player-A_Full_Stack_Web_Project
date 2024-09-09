import React from 'react';
import { ThemeProvider } from '@emotion/react';
import { dashboard_icon, search_icon, profile_icon, favourite_icon, your_music_icon, top_music_header_icon, logo_icon, menu_icon } from '../assets/assets';
import { my_theme } from '../styles/theme';
import { SidebarContainer, SidebarLogoContainer, LogoutContainer } from '../styles/containers';
import SidebarButton from './sidebar_button';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { MenuIconStyle, LogoIconStyle, LogoutIconStyle} from '../styles/icons';
import { LogoutButton, SidebarToggleButton } from '../styles/buttons';
import { useDispatch, useSelector } from "react-redux"
import { toggleSidebar } from '../redux/slices/sideBarSlice';


const SideBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [activeButton, setActiveButton] = useState('');
  const [showLogout, setShowLogout] = useState(false);
  const isSidebarOpen = useSelector((state) => state.sidebar);
  
  const handleButtonClick = (text) => {
    setActiveButton(text);
    navigate(`/${text.toLowerCase()}`);
  };

  const handleLogout = () => {
    dispatch({ type: 'auth/logoutRequest' });
    navigate('/login');
  };

  const toggleSidebarAction = () => {
    dispatch(toggleSidebar(!isSidebarOpen));
  };

  return (
    <ThemeProvider theme={my_theme}>
      <SidebarToggleButton isSidebarOpen={isSidebarOpen} onClick={toggleSidebarAction}>
        <MenuIconStyle src={menu_icon} />
      </SidebarToggleButton>
      <SidebarContainer isOpen={isSidebarOpen}>
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
