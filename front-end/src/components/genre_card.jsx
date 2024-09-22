import { GenreCardContainer, GenreCardFooter, GenreCardImage, GenreCardTextContainer } from "../styles/genre_card";
import { GenreCardIconStyle } from "../styles/icons";

import {play_icon} from "../assets/assets";

import { useSelector, useDispatch } from "react-redux"
import { setMusic } from "../redux/slices/musicSlice";
import { setNowPlayingMusicList } from "../redux/slices/nowPlayingSlice";
import { useState, useEffect } from "react";

const GenreCard = ({ genre}) => {
    const dispatch = useDispatch();

    const { genreMusicList, genreMusicMessage, genreMusicError } = useSelector((state) => state.genreMusicList);
    const [isClicked, setIsClicked] = useState(false);
    
    const handleCardClick = () => {
        dispatch({ type: 'music/fetchGenreMusicList', payload: genre.name });
        setIsClicked(true);
    };

    // This effect triggers when the genreMusicList updates
    useEffect(() => {
        if (isClicked  && genreMusicList && genreMusicList.length > 0) {
            dispatch(setMusic(genreMusicList[0]));
            dispatch(setNowPlayingMusicList(genreMusicList));
            setIsClicked(false);
        }
    }, [dispatch, genreMusicList, isClicked]); 

    return(
        <GenreCardContainer onClick={handleCardClick}>
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
