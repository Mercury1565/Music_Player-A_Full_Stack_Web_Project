import MusicContainer from "../components/music_list_container";
import MusicPlayer from "../components/music_player";
import SearchBar from "../components/search_bar";
import SideBar from "../components/sidebar";
import { GlobalContainer} from "../styles/containers"
import { my_theme } from "../styles/theme"
import { ThemeProvider } from "@emotion/react";
import { useSelector } from "react-redux";

const SearchPage = () => {
    const searchedMusicList = useSelector((state) => state.searchedMusicList);

    return(
        <ThemeProvider theme={my_theme}>
            <GlobalContainer>
                <SearchBar />
                {searchedMusicList && <MusicContainer type={"search"} tracks={searchedMusicList}/>}
            </GlobalContainer>  
        </ThemeProvider> 
    )
}

export default SearchPage;