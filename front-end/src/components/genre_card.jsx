import { GenreCardContainer, GenreCardFooter, GenreCardImage, GenreCardTextContainer } from "../styles/genre_card";
import { GenreCardIconStyle } from "../styles/icons";

import {play_icon} from "../assets/assets";

import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"

const GenreCard = ({ genre }) => {
    const genreMusicList = useSelector((state) => state.genreMusicList);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: 'music/fetchGenreMusicList', payload: genre.genre });
    }, [dispatch]);

    return(
        <GenreCardContainer>
            <GenreCardImage src={genre.image} alt={genre.name} />
            <GenreCardFooter>
                <GenreCardTextContainer>
                    <h4>{genre.genre}</h4>
                    <p>{genre.count} Tracks</p>
                </GenreCardTextContainer>
                <GenreCardIconStyle src={play_icon} />
            </GenreCardFooter>
        </GenreCardContainer>
    );
};

export default GenreCard;
