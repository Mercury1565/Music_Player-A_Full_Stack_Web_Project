import { ThemeProvider } from "@emotion/react"
import MusicContainer from "../components/music_list_container"
import { ErrorText, GlobalContainer} from "../styles/containers"
import { my_theme } from "../styles/theme"

import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const Favourites=() => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { loggedIn } = useSelector((state) => state.auth);
    const { favouriteMusicList, favouriteMusicMessage, favouriteMusicError} = useSelector((state) => state.favouriteMusicList);

    useEffect(() => {
        if (!loggedIn) {
            navigate('/login');
        }
        else {
            dispatch({ type: 'music/fetchFavouriteMusicList' });
        }
    }, [dispatch, loggedIn, navigate]);

    if (!loggedIn) {
        return null;
    }

    return(
        <ThemeProvider theme={my_theme}>
            <GlobalContainer>
                <MusicContainer type={"favourite"} tracks={favouriteMusicList}/>
                {favouriteMusicError && <ErrorText>{favouriteMusicError}</ErrorText>}
            </GlobalContainer>  
        </ThemeProvider> 
    )
}

export default Favourites;