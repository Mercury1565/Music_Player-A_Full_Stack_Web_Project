import React from 'react';
import TopMusicCard from './top_music_card';
import { music_card } from '../assets/assets';
import { TopMusicCardsConainer, TopMusicHeader} from '../styles/containers';
import { ThemeProvider } from '@emotion/react';
import { theme } from '../styles/theme';
import { useState } from 'react';
import { TopMusicHeaderIcon } from '../styles/icons';
import { top_music_header_icon } from '../assets/assets';

const TopMusicContainer = () => {
    const [selectedMusic, setSelectedMusic] = useState(null);

    const topMusicData = [
        {
            image: music_card,
            artist: 'Maroon 5',
            title: 'Memories',
            length: '3:45', 
            rank: 10
        },
        {
            image: music_card,
            artist: 'Tilahun Gessesse',
            title: 'Monaliza',
            length: '3:45', 
            rank: 56
        },{
            image: music_card,
            artist: 'Michael Jackson',
            title: 'Thriller',
            length: '3:45', 
            rank: 98
        },
    ];

    const handleCardClick = (index) => {
        setSelectedMusic(index);
    };

    return (
        <ThemeProvider theme={theme}>
            <TopMusicHeader>
            <TopMusicHeaderIcon src={top_music_header_icon}/>
            <h2>Top Music</h2>
            </TopMusicHeader>
            <TopMusicCardsConainer>
                {topMusicData.map((music, index) => (
                    <TopMusicCard
                        key={index}
                        music={music}
                        isSelected={selectedMusic === index}
                        onClick={() => handleCardClick(index)}
                    />
                ))}
            </TopMusicCardsConainer>
        </ThemeProvider>
    );
};

export default TopMusicContainer;