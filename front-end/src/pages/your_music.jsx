import { ThemeProvider } from "@emotion/react";
import { my_theme } from "../styles/theme";
import { GlobalContainer } from "../styles/containers";
import MusicContainer from "../components/music_list_container";
import { music_card } from "../assets/assets";
import { AddMusicPageButton} from "../styles/buttons";
import { useNavigate } from "react-router-dom";

const YourMusicPage = () => {
    const navigate = useNavigate();

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
                <MusicContainer type={"your-music"} tracks={MusicData}/>
                <AddMusicPageButton onClick={() => {navigate('/your_music/add')}}>
                    <h2>Add New Music</h2>
                </AddMusicPageButton>
            </GlobalContainer>
        </ThemeProvider>
    )
   
}

export default YourMusicPage;