import { GenreCardContainer, GenreCardFooter, GenreCardImage, GenreCardTextContainer } from "../styles/genre_card";
import { GenreCardIconStyle } from "../styles/icons";

import {play_icon} from "../assets/assets";

import { useSelector, useDispatch } from "react-redux"
import { setMusic } from "../redux/slices/musicSlice";
import { setNowPlayingMusicList } from "../redux/slices/nowPlayingSlice";
import { useEffect } from "react";

const GenreCard = ({ genre}) => {
    const dispatch = useDispatch();

    const { genreMusicList, genreMusicMessage, genreMusicError } = useSelector((state) => state.genreMusicList)

    useEffect(() => {
        if (genreMusicList && genreMusicList.length > 0) {
            dispatch(setMusic(genreMusicList[0]));
            dispatch(setNowPlayingMusicList(genreMusicList));
        }
    }, [genreMusicList]);
    
    const handleCardClick = () => {
        dispatch({ type: 'music/fetchGenreMusicList', payload: genre.name });
    };

    return(
        <GenreCardContainer>
            <GenreCardImage src={genre.image} alt={genre.name} />
            <GenreCardFooter>
                <GenreCardTextContainer>
                    <h4>{genre.name}</h4>
                    <p>{genre.count} Tracks</p>
                </GenreCardTextContainer>
                <GenreCardIconStyle src={play_icon} onClick={handleCardClick} />
            </GenreCardFooter>
        </GenreCardContainer>
    );
};

export default GenreCard;
