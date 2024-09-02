import React from 'react';
import { MusicListContainer, TopMusicHeader} from '../styles/containers';
import { TopMusicHeaderIcon } from '../styles/icons';
import { top_music_header_icon, favourtie_music_header_icon, genre_icon } from '../assets/assets';
import MusicList from './music_list';

const MusicContainer = ({type, tracks}) => {  
    let head_icon;
    let head_title;

    switch(type){
        case "top":
            head_icon = top_music_header_icon;
            head_title = "Top Music";
            break;
        case "favourite":
            head_icon = favourtie_music_header_icon
            head_title = "Your Favourites";
            break;
        case "genre":
            head_icon = genre_icon;
            head_title = "Pop Music"; // Not finished here
            break;
        case "your-music":
            head_icon = top_music_header_icon;
            head_title = "Your Music";
            break;
        case "search":
            head_icon = top_music_header_icon;
            head_title = "Your Search Results";
            break;
    }

    return (
        <MusicListContainer>
            <TopMusicHeader>
                <TopMusicHeaderIcon src={head_icon}/>
                <h2>{head_title}</h2>
            </TopMusicHeader>
            <MusicList tracks={tracks}/>
        </MusicListContainer>
    );
};

export default MusicContainer;