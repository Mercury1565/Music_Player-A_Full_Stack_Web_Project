import React from 'react';
import { ThemeProvider } from '@emotion/react';
import { dashboard_icon, search_icon, profile_icon, favourite_icon } from '../assets/assets';
import { theme } from '../styles/theme';
import { SidebarContainer } from '../styles/containers';
import SidebarButton from './sidebar_button';

const SideBar = () => (
  <ThemeProvider theme={theme}>
    <SidebarContainer>
      <SidebarButton text="Profile" icon={profile_icon} isActive={false} />
      <SidebarButton text="Dashboard" icon={dashboard_icon} isActive={true} />
      <SidebarButton text="Favourite" icon={favourite_icon} isActive={false} />
      <SidebarButton text="Search" icon={search_icon} isActive={false} />
    </SidebarContainer>
  </ThemeProvider>
);

export default SideBar;
