import { TopMusicCardContainer, TopMusicCardDescription, TopMusicCardImage, Styled_h4, Styled_p, StyledLength} from "../styles/top_musics";
import { TopMusicCardPlayPauseIconStyle } from "../styles/icons";
import { music_card_play_icon, music_card_pause_icon } from "../assets/assets";

const TopMusicCard = ({ music, isSelected, onClick }) => {

    return (
        <TopMusicCardContainer onClick={onClick} isSelected={isSelected}>
            <TopMusicCardDescription>
                <Styled_h4 isSelected={isSelected}>
                    {music.rank}
                </Styled_h4>
                <TopMusicCardImage src={music.image} />
                <Styled_p isSelected={isSelected}>
                    {music.artist} - {music.title}
                </Styled_p>
            </TopMusicCardDescription>
            <StyledLength isSelected={isSelected}>
                {music.length}
            </StyledLength>
            <TopMusicCardPlayPauseIconStyle 
                src={ isSelected ? music_card_pause_icon: music_card_play_icon } 
                isSelected={isSelected} 
            />
        </TopMusicCardContainer>
    );
}

export default TopMusicCard;