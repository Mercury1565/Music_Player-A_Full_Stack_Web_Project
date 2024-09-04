import { ThemeProvider } from "@emotion/react"
import MusicContainer from "../components/music_list_container"
import { GlobalContainer} from "../styles/containers"
import { my_theme } from "../styles/theme"

import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"

const Favourites=() => {
    const favouriteMusicList = useSelector((state) => state.favouriteMusicList);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: 'music/fetchFavouriteMusicList' });
    }, [dispatch]);

    return(
        <ThemeProvider theme={my_theme}>
            <GlobalContainer>
                <MusicContainer type={"favourite"} tracks={favouriteMusicList}/>
            </GlobalContainer>  
        </ThemeProvider> 
    )
}

export default Favourites;