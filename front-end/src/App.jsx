import { Global } from '@emotion/react';
import { globalStyles } from './styles/global_styles';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Sidebar from './components/sidebar';
import GenreCardsContainer from './components/genre_cards_container';
import TopMusicCard from './components/music_card';
import MusicContainer from './components/music_list_container';
import MusicPlayer from './components/music_player';

import { music_card } from "./assets/assets"
import MusicCard from './components/music_card';
import SearchBar from './components/search_bar';
import AddMusicCard from './pages/add_music_page';
import Dashboard from './pages/dashboard';
import YourMusicPage from './pages/your_music';
import Favourites from './pages/favourites';
import SearchPage from './pages/search';

import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { setFavourites } from './redux/slices/favouriteMusicListSlice';

function App() {
  const playing_track = useSelector((state) => state.music);

  const musicList = useSelector((state) => state.favouriteMusicList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'music/fetchMusicList' });
  }, [dispatch]);

  console.log(musicList);

  return (
    <>
      <Global styles={globalStyles} />
      
      <Router>
        <Sidebar />
        <MusicPlayer track={playing_track}/> 

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/your_music" element={<YourMusicPage />} />
          <Route path="/your_music/add" element={<AddMusicCard/>} />
          <Route path="/favourite" element={<Favourites />} />
          <Route path="/search" element={<SearchPage />} />
        </Routes>
      </Router>      
    </>
  )
}

export default App