import { ThemeProvider } from "@emotion/react"
import GenreCardsContainer from "../components/genre_cards_container"
import MusicContainer from "../components/music_list_container"
import { GlobalContainer} from "../styles/containers"
import { my_theme } from "../styles/theme"

import { useSelector } from "react-redux"

const Favourites=() => {
    const favouriteMusicList = useSelector((state) => state.favouriteMusicList);

    return(
        <ThemeProvider theme={my_theme}>
            <GlobalContainer>
                <MusicContainer type={"favourite"} tracks={favouriteMusicList}/>
            </GlobalContainer>  
        </ThemeProvider> 
    )
}

export default Favourites;