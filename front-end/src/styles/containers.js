import styled from '@emotion/styled';

export const SidebarContainer = styled.div`
  background: ${(props) => props.theme.colors.sidebarBackground};
  color: ${(props) => props.theme.colors.text};

  padding: ${(props) => props.theme.space[3]}px;
  
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: ${(props) => props.theme.space[6]}px;
  

`;