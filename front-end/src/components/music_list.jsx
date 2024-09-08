import { MusicCardsContainer } from "../styles/containers";
import MusicCard from "./music_card";

import { useDispatch} from "react-redux";
import { setMusic } from "../redux/slices/musicSlice";
import { setNowPlayingMusicList } from "../redux/slices/nowPlayingSlice";

const MusicList = ({ tracks, type }) => {
    const dispatch = useDispatch();    

    const handleCardClick = (index) => {
        dispatch(setMusic(tracks[index]));
        dispatch(setNowPlayingMusicList(tracks));
        
        dispatch({ type: 'music/fetchMusicAudio', payload: tracks[index].audio_file_path });
        dispatch({ type: 'music/fetchMusicCover', payload: tracks[index].cover_image_path });
    };

    return (
        <MusicCardsContainer>
            {tracks.map((music, index) => (
                <MusicCard 
                    key={index}
                    music={tracks[index]}
                    index={index}
                    onClick={() => {handleCardClick(index)}}
                    type= {type}
                />
            ))}
        </MusicCardsContainer>
    );
}

export default MusicList;