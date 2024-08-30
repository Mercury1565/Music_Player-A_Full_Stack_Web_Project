import { Global } from '@emotion/react';
import { globalStyles } from './styles/global_styles';

import Sidebar from './components/sidebar';
import GenreCardsContainer from './components/genre_cards_container';
import TopMusicCard from './components/top_music_card';
import TopMusicContainer from './components/top_music_container';

function App() {
  
  return (
    <>
      <Global styles={globalStyles} />
      {/* <Sidebar /> */}
      {/* <GenreCardsContainer /> */}
      <TopMusicContainer />

    </>
  )
}

export default App