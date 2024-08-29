import styled from '@emotion/styled';

export const SideBarButtonActive = styled.button`
  background:  ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.textPrimary};

  border-radius: ${(props) => props.theme.radii.small};
  box-shadow: ${(props) => props.theme.shadows.button};
  border: none;
  
  font-size: ${(props) => props.theme.fontSizes.medium};
  font-weight: ${(props) => props.theme.fontWeight.medium};

  width: 212px;
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

  width: 212px;
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