import { ThemeProvider } from "@emotion/react"
import GenreCardsContainer from "../components/genre_cards_container"
import MusicContainer from "../components/music_list_container"
import { GlobalContainer} from "../styles/containers"
import { my_theme } from "../styles/theme"

import { useSelector } from "react-redux"

const Dashboard=() => {
    const genres = useSelector((state) => state.genreList);
    const topMusicList = useSelector((state) => state.topMusicList);
    
    return(
        <ThemeProvider theme={my_theme}>
            <GlobalContainer>
                <GenreCardsContainer genres={genres}/>
                <MusicContainer type={"top"} tracks={topMusicList}/>
            </GlobalContainer>  
        </ThemeProvider> 
    )
}

export default Dashboard;