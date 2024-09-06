import { TopMusicCardContainer, TopMusicCardDescription, TopMusicCardImage, Styled_h4, Styled_p, StyledLength} from "../styles/top_musics";
import { FavouriteIconStyle, TopMusicCardPlayPauseIconStyle } from "../styles/icons";
import { music_card_play_icon, music_card_pause_icon, favourite_icon, selected_favourite_icon } from "../assets/assets";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const MusicCard = ({ music, index, onClick }) => {
    const dispatch = useDispatch();
    const isSelected = useSelector((state) => state.track._id === music._id);

    const favourites = useSelector((state) => state.favouriteMusicList);
    const [isFavourite, setIsFavourite] =  useState(favourites && favourites.some((m) => m._id === music._id));

    const coverImageURL = `http://localhost:8080/uploads/cover/${music.cover_image_path}`;
    const [duration, setDuration] = useState(0);

    function formatDuration(value) {
        const minute = Math.floor(value / 60);
        const secondLeft = value - minute * 60;
        return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`;
    }

    const handleFavourite = () => {
        if (isFavourite) {
            setIsFavourite(false);
            dispatch({ type: 'music/removeFavourite', payload: music._id });
        }
        else{
            setIsFavourite(true);
            dispatch({ type: 'music/appendFavourite', payload: music._id });
        }
      }

    return (
        <TopMusicCardContainer isSelected={isSelected}>
            <TopMusicCardDescription onClick={onClick} > 
                <Styled_h4 isSelected={isSelected}>
                    {index + 1}
                </Styled_h4>
                <TopMusicCardImage src={coverImageURL} />
                <Styled_p isSelected={isSelected}>
                    {music.artist} - {music.title}
                </Styled_p>
            </TopMusicCardDescription>

            <StyledLength isSelected={isSelected} onClick={onClick}>
                {formatDuration(duration)}
            </StyledLength>

            <FavouriteIconStyle 
                src= { isFavourite ? selected_favourite_icon: favourite_icon } 
                onClick={handleFavourite} 
            />

            <TopMusicCardPlayPauseIconStyle 
                src={ isSelected ? music_card_pause_icon: music_card_play_icon } 
                onClick={onClick} 
            />
        </TopMusicCardContainer>
    );
}

export default MusicCard;