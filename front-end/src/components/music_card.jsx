import { TopMusicCardContainer, TopMusicCardDescription, TopMusicCardImage, Styled_h4, Styled_p, StyledLength} from "../styles/top_musics";
import { FavouriteIconStyle, TopMusicCardPlayPauseIconStyle } from "../styles/icons";
import { music_card_play_icon, music_card_pause_icon, favourite_icon, selected_favourite_icon } from "../assets/assets";

const MusicCard = ({ music, index, isSelected, onClick }) => {
    function formatDuration(value) {
        const minute = Math.floor(value / 60);
        const secondLeft = value - minute * 60;
        return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`;
    }

    const handleFavourite = (music) => {
        if(music.isFavourite){
          console.log("Remove from favorite");
        }
        else{
          console.log("Add to favorite");
        }
      }

    return (
        <TopMusicCardContainer onClick={onClick} isSelected={isSelected}>
            <TopMusicCardDescription>
                <Styled_h4 isSelected={isSelected}>
                    {index + 1}
                </Styled_h4>
                <TopMusicCardImage src={music.image} />
                <Styled_p isSelected={isSelected}>
                    {music.artist} - {music.title}
                </Styled_p>
            </TopMusicCardDescription>

            <StyledLength isSelected={isSelected}>
                {formatDuration(music.length)}
            </StyledLength>

            <FavouriteIconStyle 
                src= {music.isFavourite ? selected_favourite_icon: favourite_icon } 
                onClick={handleFavourite(music)} 
            />

            <TopMusicCardPlayPauseIconStyle 
                src={ isSelected ? music_card_pause_icon: music_card_play_icon } 
            />
        </TopMusicCardContainer>
    );
}

export default MusicCard;