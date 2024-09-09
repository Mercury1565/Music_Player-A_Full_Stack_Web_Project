import styled from '@emotion/styled';

// sidebar
export const SideBarButtonActive = styled.button`
  background:  ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.textPrimary};

  border-radius: ${(props) => props.theme.radii.small};
  box-shadow: ${(props) => props.theme.shadows.button};
  border: none;
  
  font-size: ${(props) => props.theme.fontSizes.medium};
  font-weight: ${(props) => props.theme.fontWeight.medium};

  width: 90%;
  height: 47px;
  padding: ${(props) => props.theme.space[4]}px ${(props) => props.theme.space[3]}px;

  display: flex;
  justify-content: left;
  align-items: center;
  gap: ${(props) => props.theme.space[4]}px;

  cursor: pointer;
`;

export const SideBarButtonIdle = styled.button`
  background:  ${(props) => props.theme.colors.secondary};
  color: ${(props) => props.theme.colors.textPrimary};

  border-radius: ${(props) => props.theme.radii.small};
  box-shadow: ${(props) => props.theme.shadows.button};
  border: none;
  
  font-size: ${(props) => props.theme.fontSizes.medium};
  font-weight: ${(props) => props.theme.fontWeight.medium};

  width: 90%;
  height: 47px;
  padding: ${(props) => props.theme.space[4]}px ${(props) => props.theme.space[3]}px;
  
  display: flex;
  justify-content: left;
  align-items: center;
  gap: ${(props) => props.theme.space[4]}px;

  cursor: pointer;

  &:hover {
    background: ${(props) => props.theme.hover.sidebarButtonHover};
  }

  &:active {
    background: ${(props) => props.theme.click.sidebarButtonClick};
  }
`;

export const LogoutButton = styled.button`
  background:  #666257;
  color: ${(props) => props.theme.colors.textPrimary};

  padding: ${(props) => props.theme.space[1]}px ${(props) => props.theme.space[2]}px;
  font-size: 14px;
  font-weight: ${(props) => props.theme.fontWeight.small};

  border-radius: ${(props) => props.theme.radii.small};
  outline: none;
  border: none;

  &:hover {
    filter: brightness(1.1);
    cursor: pointer
}
`;

export const AddMusicPageButton = styled.button`
    background: ${(props) => props.theme.colors.primary};
    color: ${(props) => props.theme.colors.textPrimary};
    width: 70%;

    border: none;
    border-radius: ${(props) => props.theme.radii.xlarge};
    padding: ${(props) => props.theme.space[1]}px ${(props) => props.theme.space[2]}px;

    margin-top: ${(props) => props.theme.space[4]}px;
    margin-left: ${(props) => props.theme.space[5]}px;

    &:hover {
        filter: brightness(0.8);
        cursor: pointer
    }
`;

export const SidebarToggleButton = styled.button`
  position: fixed;
  left: 10px;
  top: 10px;
  z-index: 1001;
  background: ${(props) => props.theme.colors.sidebarBackground};

  border: none;
  padding: 10px;
  cursor: pointer;
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
`;