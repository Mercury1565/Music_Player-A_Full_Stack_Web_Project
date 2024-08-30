import { Global } from '@emotion/react';
import { globalStyles } from './styles/global_styles';

import Sidebar from './components/sidebar';
import GenreCardsContainer from './components/genre_cards_container';
import TopMusicCard from './components/top_music_card';
import TopMusicContainer from './components/top_music_container';
import MusicPlayer from './components/music_player';

import { music_card } from "./assets/assets"


function App() {
  
  const track = {
    artist: "Michael Jackson",
    title: "Thriller",
    image: music_card,
    length: 200,
  }

  return (
    <>
      <Global styles={globalStyles} />
      {/* <Sidebar /> */}
      {/* <GenreCardsContainer /> */}
      {/* <TopMusicContainer /> */}
      <MusicPlayer track={track}/>
    </>
  )
}

export default App