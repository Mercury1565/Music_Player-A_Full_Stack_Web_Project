import styled from '@emotion/styled';

export const GlobalContainer = styled.div`
  margin: 20px 300px;
  padding-bottom: 85px;
  width: 100%;
`

export const AuthContainer = styled.div`
  background: ${(props) => props.theme.colors.cardBackground};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 50px 0;

  border-radius: ${(props) => props.theme.radii.xxlarge};
  margin: 100px 300px;

  color: ${(props) => props.theme.colors.textPrimary};
`;

// sidebar containers
export const SidebarContainer = styled.div`
  background: ${(props) => props.theme.colors.sidebarBackground};
  color: ${(props) => props.theme.colors.text};

  padding: ${(props) => props.theme.space[3]}px;
  
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.space[6]}px;

  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: 250px;
`;

export const SidebarLogoContainer = styled.div`
  display: flex; 
  justify-content: space-between;
  margin: ${(props) => props.theme.space[4]}px ${(props) => props.theme.space[2]}px;
  height: 30px;
`;

export const LogoutContainer = styled.div`
  display: flex;
  width: 20%;
  flex-direction: column;
  justify-content: right;
  align-items: right;
`;

export const GenreContainer = styled.div`
  width: 75%;
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
// music list containers
export const MusicCardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.space[4]}px;
  width: 100%;
`;

export const MusicListContainer = styled.div`
  margin-top: 20px;

  h3 {
    margin: 40px;
    color: ${(props) => props.theme.colors.textSecondary};
  }
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
  background: ${(props) => props.theme.colors.secondary};
  
  position: fixed;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 25px;

  width: calc(100vw - 50px); 
  height: 80px;
`;

// Add Music Container
export const AddMusicContainer = styled.div`
  width: 60%;
  margin: 10px 290px;
  padding-bottom: 85px;
`;

export const ErrorText = styled.h1`
  color: pink;
  font-size: 15px;
  font-weight: 400;
`;