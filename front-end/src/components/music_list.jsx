import { MusicCardsContainer } from "../styles/containers";
import MusicCard from "./music_card";

import { useState } from 'react';
import { useDispatch} from "react-redux";
import { setMusic } from "../redux/slices/musicSlice";

const MusicList = ({ tracks }) => {
    const [selectedMusic, setSelectedMusic] = useState(null);

    const dispatch = useDispatch();    

    const handleCardClick = (index) => {
        setSelectedMusic(index);
        dispatch(setMusic(tracks[index]));
    };

    return (
        <MusicCardsContainer>
            {tracks.map((music, index) => (
                <MusicCard 
                    key={index}
                    music={tracks[index]}
                    index={index}
                    isSelected={selectedMusic == index}
                    onClick={() => {handleCardClick(index)}}
                />
            ))}
        </MusicCardsContainer>
    );
}

export default MusicList;