import { ThemeProvider } from "@emotion/react"
import GenreCardsContainer from "../components/genre_cards_container"
import MusicContainer from "../components/music_list_container"
import { GlobalContainer} from "../styles/containers"
import { my_theme } from "../styles/theme"

import { acoustic } from "../assets/assets"
import {music_card} from "../assets/assets"

const Dashboard=() => {
    const genres = [
        {
            name: '1',
            count: 98,
            image: acoustic
        },
        {
            name: '2',
            count: 143,
            image: acoustic
        },
        {
            name: '4',
            count: 98,
            image: acoustic
        },
        {
            name: '4',
            count: 143,
            image: acoustic
        },{
            name: '5',
            count: 98,
            image: acoustic
        },
    ];

    const MusicData = [
        {
            image: music_card,
            artist: 'Maroon 5',
            title: 'Memories',
            length: '3:45', 
        },
        {
            image: music_card,
            artist: 'Tilahun Gessesse',
            title: 'Monaliza',
            length: '3:45', 
        },{
            image: music_card,
            artist: 'Michael Jackson',
            title: 'Thriller',
            length: '3:45', 
        },
    ];

    return(
        <ThemeProvider theme={my_theme}>
            <GlobalContainer>
                <GenreCardsContainer genres={genres}/>
                <MusicContainer type={"top"} tracks={MusicData}/>
            </GlobalContainer>  
        </ThemeProvider> 
    )
}

export default Dashboard;