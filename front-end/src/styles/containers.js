import styled from '@emotion/styled';

// sidebar containers
export const SidebarContainer = styled.div`
  background: ${(props) => props.theme.colors.sidebarBackground};
  color: ${(props) => props.theme.colors.text};

  padding: ${(props) => props.theme.space[3]}px;
  
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: ${(props) => props.theme.space[6]}px;
`;

export const GenreContainer = styled.div`
  width: 817px;
`;

// genre card containers
export const GenreCards = styled.div`  
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${(props) => props.theme.space[4]}px;
`;

export const GenreHeader = styled.div`
  color: ${(props) => props.theme.colors.textPrimary};

  margin-left: 60px;
  margin-bottom: ${(props) => props.theme.space[2]}px;

  display: flex;
  align-items: center;

  h2 {
    margin: 15px;
  }
`
// top music containers
export const TopMusicCardsConainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.space[4]}px;
`;

export const TopMusicHeader = styled.div`
  color: ${(props) => props.theme.colors.textPrimary};

  margin-bottom: ${(props) => props.theme.space[2]}px;

  display: flex;
  align-items: center;

  h2 {
    margin: 15px;
  }
`
// music player container
export const MusicPlayerContainer = styled.div`
  background: ${(props) => props.theme.colors.musicCard};
  
  position: fixed;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 25px;

  width: calc(100vw - 50px); 
  height: 100px;
`;

