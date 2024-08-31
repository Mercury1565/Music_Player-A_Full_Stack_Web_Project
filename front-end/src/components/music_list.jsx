import { MusicCardsContainer } from "../styles/containers";
import TopMusicCard from "./top_music_card";

import { useState } from 'react';

const MusicList = ({ tracks }) => {
    const [selectedMusic, setSelectedMusic] = useState(null);

    const handleCardClick = (index) => {
        setSelectedMusic(index);
    };

    return (
        <MusicCardsContainer>
            {tracks.map((music, index) => (
                <TopMusicCard 
                    key={index}
                    music={music}
                    index={index}
                    selectedMusic={selectedMusic}
                    handleCardClick={handleCardClick}
                />
            ))}
        </MusicCardsContainer>
    );
}

export default MusicList;