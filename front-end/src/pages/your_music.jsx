import { ThemeProvider } from "@emotion/react";
import { my_theme } from "../styles/theme";
import { GlobalContainer } from "../styles/containers";
import MusicContainer from "../components/music_list_container";
import { AddMusicPageButton} from "../styles/buttons";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { toggleSidebar } from "../redux/slices/sideBarSlice";

const YourMusicPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const loggedIn = useSelector((state) => state.auth);
    const { yourMusicList, yourMusicMessage, yourMusicError} = useSelector((state) => state.yourMusicList);
    
    useEffect(() => {
        dispatch(toggleSidebar(false))

        if (!loggedIn) {
            navigate('/login');
        }
        else {
            dispatch({ type: 'music/fetchYourMusicList' });
        }
    }, [dispatch, loggedIn, navigate]);
    
    if (!loggedIn) {
        return null
    }

    return(
        <ThemeProvider theme={my_theme}>
            <GlobalContainer>
                <MusicContainer type="your-music" tracks={yourMusicList}/>
                <AddMusicPageButton onClick={() => {navigate('/your_music/add')}}>
                    <h2>Add New Music</h2>
                </AddMusicPageButton>
            </GlobalContainer>
        </ThemeProvider>
    )
   
}

export default YourMusicPage;