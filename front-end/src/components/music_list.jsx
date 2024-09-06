import { MusicCardsContainer } from "../styles/containers";
import MusicCard from "./music_card";

import { useDispatch} from "react-redux";
import { setMusic } from "../redux/slices/musicSlice";
import { setNowPlayingMusicList } from "../redux/slices/nowPlayingSlice";

const MusicList = ({ tracks }) => {
    const dispatch = useDispatch();    

    const handleCardClick = (index) => {
        dispatch(setMusic(tracks[index]));
        dispatch(setNowPlayingMusicList(tracks));
    };

    return (
        <MusicCardsContainer>
            {tracks.map((music, index) => (
                <MusicCard 
                    key={index}
                    music={tracks[index]}
                    index={index}
                    onClick={() => {handleCardClick(index)}}
                />
            ))}
        </MusicCardsContainer>
    );
}

export default MusicList;