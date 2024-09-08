import { ThemeProvider } from "@emotion/react"
import GenreCardsContainer from "../components/genre_cards_container"
import MusicContainer from "../components/music_list_container"
import { ErrorText, GlobalContainer} from "../styles/containers"
import { my_theme } from "../styles/theme"

import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const Dashboard=() => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { loggedIn } = useSelector((state) => state.auth);

    const { genreList, genreMessage, genreError} = useSelector((state) => state.genreList);
    const { topMusicList, topMusicMessage, topMusicError } = useSelector((state) => state.topMusicList);

    useEffect(() => {
        if (!loggedIn) {
            navigate('/login');
        }
        else {
            dispatch({ type: 'music/fetchTopMusicList' });
            dispatch({ type: 'music/fetchGenreList' });
        }
    }, [dispatch, navigate]);

    if (!loggedIn) {
        return null;
    }
    
    return(
        <ThemeProvider theme={my_theme}>
            <GlobalContainer>
                <GenreCardsContainer genres={genreList}/>
                <MusicContainer type={"top"} tracks={topMusicList}/>
                
                {genreError && <ErrorText>{genreError}</ErrorText>}
                {topMusicError && <ErrorText>{topMusicError}</ErrorText>}
            </GlobalContainer>  
        </ThemeProvider> 
    )
}

export default Dashboard;