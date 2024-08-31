import { Global } from '@emotion/react';
import { globalStyles } from './styles/global_styles';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Sidebar from './components/sidebar';
import GenreCardsContainer from './components/genre_cards_container';
import TopMusicCard from './components/top_music_card';
import MusicContainer from './components/music_list_container';
import MusicPlayer from './components/music_player';

import { music_card } from "./assets/assets"
import MusicCard from './components/top_music_card';
import SearchBar from './components/search_bar';
import AddMusicCard from './components/add_music_card';
import Dashboard from './pages/dashboard';
import YourMusicPage from './pages/your_music';
import Favourites from './pages/favourites';
import SearchPage from './pages/search';


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
      {/*
      <Router>
        <Sidebar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/your_music" element={<YourMusicPage />} />
          <Route path="/your_music/add" element={<AddMusicCard/>} />
          <Route path="/favourite" element={<Favourites />} />
          <Route path="/search" element={<SearchPage />} />
        </Routes>
      </Router> */}
        <MusicPlayer track={track}/> 

      
    </>
  )
}

export default App