import { ThemeProvider } from "@emotion/react";
import { my_theme } from "../styles/theme";
import { GlobalContainer } from "../styles/containers";
import MusicContainer from "../components/music_list_container";
import { music_card } from "../assets/assets";
import { AddMusicPageButton} from "../styles/buttons";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const YourMusicPage = () => {
    const navigate = useNavigate();
    const yourMusicList = useSelector((state) => state.yourMusicList);
    
    return(
        <ThemeProvider theme={my_theme}>
            <GlobalContainer>
                <MusicContainer type={"your-music"} tracks={yourMusicList}/>
                <AddMusicPageButton onClick={() => {navigate('/your_music/add')}}>
                    <h2>Add New Music</h2>
                </AddMusicPageButton>
            </GlobalContainer>
        </ThemeProvider>
    )
   
}

export default YourMusicPage;