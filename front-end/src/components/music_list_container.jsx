import React from 'react';
import { MusicListContainer, TopMusicHeader} from '../styles/containers';
import { TopMusicHeaderIcon } from '../styles/icons';
import { top_music_header_icon, favourtie_music_header_icon, genre_icon } from '../assets/assets';
import MusicList from './music_list';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';


const MusicContainer = ({type, tracks}) => {  
    const dispatch = useDispatch();    

    let head_icon;
    let head_title;

    useEffect(() => {
        dispatch({ type: 'music/fetchFavouriteMusicList' });
    }, [dispatch]);

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
            {tracks && <MusicList tracks={tracks} type={type}/>}
            {(!tracks || tracks.length === 0) && <h3>Nothing to display here...</h3>}
        </MusicListContainer>
    );
};

export default MusicContainer;