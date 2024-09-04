import { Global } from '@emotion/react';
import { globalStyles } from './styles/global_styles';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import MusicPlayer from './components/music_player';
import SideBar from './components/sidebar';

import AddMusicCard from './pages/add_music_page';
import Dashboard from './pages/dashboard';
import YourMusicPage from './pages/your_music';
import Favourites from './pages/favourites';
import SearchPage from './pages/search';

import Login from './pages/login_page';
import Signup from './pages/signup_page';

function App() {
  // const musicList = useSelector((state) => state.favouriteMusicList);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch({ type: 'music/fetchMusicList' });
  // }, [dispatch]);

  // console.log(musicList);
  
  return (
    <Router>
      <RouteSwitch />
    </Router>
  );
}

function RouteSwitch() {
  const location = useLocation();
  const noDisplayRoutes = ['/login', '/signup'];

  return (
    <>
      <Global styles={globalStyles} />
      
      {!noDisplayRoutes.includes(location.pathname) && (
        <>
          <SideBar />
          <MusicPlayer /> 
        </>
      )}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/your_music" element={<YourMusicPage />} />
        <Route path="/your_music/add" element={<AddMusicCard />} />
        <Route path="/favourite" element={<Favourites />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
    </>
  );
}

export default App;
