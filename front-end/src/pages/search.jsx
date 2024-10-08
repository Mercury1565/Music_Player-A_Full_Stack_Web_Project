import MusicContainer from "../components/music_list_container";
import MusicPlayer from "../components/music_player";
import SearchBar from "../components/search_bar";
import SideBar from "../components/sidebar";
import { ErrorText, GlobalContainer} from "../styles/containers"
import { my_theme } from "../styles/theme"
import { ThemeProvider } from "@emotion/react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toggleSidebar } from "../redux/slices/sideBarSlice";

const SearchPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { loggedIn } = useSelector((state) => state.auth);
    const { searchMusicList, searchMusicMessage, searchMusicError } = useSelector((state) => state.searchedMusicList);

    useEffect(() => {
        dispatch(toggleSidebar(false))

        if (!loggedIn) {
            navigate('/login');
        }
    }, [loggedIn, navigate]);

    if (!loggedIn){
        return null
    }
    
    return(
        <ThemeProvider theme={my_theme}>
            <GlobalContainer>
                <SearchBar />
                <MusicContainer type={"search"} tracks={searchMusicList}/>
                {searchMusicError && <ErrorText>{searchMusicError}</ErrorText>}
            </GlobalContainer>  
        </ThemeProvider> 
    )
}

export default SearchPage;