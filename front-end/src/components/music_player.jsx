import { ThemeProvider } from "@emotion/react";
import { MusicPlayerContainer } from "../styles/containers";
import { MusicInfoContainer, MusicImageContainer, MusicTitleContainer, ControllerContainer, Seeker, SeekPositionContainer, TinyText, UtilityContainer } from "../styles/music_player";
import { MusicPlayerIconStyle, MusicPlayerUtilityIconStyle } from "../styles/icons";
import { my_theme } from "../styles/theme";
import { fwd_icon, bwd_icon, player_play_icon, player_pause_icon, shuffle_icon, repeat_icon, favourite_icon, selected_favourite_icon } from "../assets/assets";

import Slider from '@mui/material/Slider';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import {VolumeUp} from '@mui/icons-material';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';



const MusicPlayer = () => {
  const track = useSelector((state) => state.music);

  const [position, setPosition] = useState(0);

  function formatDuration(value) {
    const minute = Math.floor(value / 60);
    const secondLeft = value - minute * 60;
    return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`;
  }

  const [volume, setVolume] = useState(30);

  const handleChange = (event, newValue) => {
    setVolume(newValue);
  };

  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause= (event) => {
    setIsPlaying(!isPlaying);
  }
  const handleFavourite = (track) => {
    if(track.isFavourite){
      console.log("Remove from favorite");
    }
    else{
      console.log("Add to favorite");
    }
  }
  
  return(
    <ThemeProvider theme={my_theme}>
      <MusicPlayerContainer>

        <MusicInfoContainer>
          <MusicImageContainer src={track.image}/>
          <MusicTitleContainer>
            <h3>{track.title}</h3>
            <p>{track.artist}</p>
          </MusicTitleContainer>
        </MusicInfoContainer>

        <ControllerContainer>
          <MusicPlayerIconStyle src={bwd_icon}/>
          <MusicPlayerIconStyle src={isPlaying ? player_pause_icon : player_play_icon} onClick={handlePlayPause}/>
          <MusicPlayerIconStyle src={fwd_icon}/>
        </ControllerContainer>

        <Seeker>
          <Slider 
            aria-label="time-indicator"
            value={position}
            min={0}
            step={1}
            max={track.length}
            onChange={(_, value) => setPosition(value)}
            color="secondary"
          />
          <SeekPositionContainer>
            <TinyText>{formatDuration(position)}</TinyText>
            <TinyText>-{formatDuration(track.length - position)}</TinyText>
          </SeekPositionContainer>
        </Seeker>

        {/* Volume Slider */}
        <Box sx={{ width: 140 }}>
          <Stack spacing={2} direction="row" sx={{ alignItems: 'center', mb: 1 }}>
            <VolumeUp style={{ color: '#ffffff' }} />
            <Slider 
              size="small"
              defaultValue={30} 
              aria-label="Volume" 
              color="secondary"
              value={volume} 
              onChange={handleChange} 
            />
          </Stack>
        </Box>

        <UtilityContainer>
          <MusicPlayerUtilityIconStyle src={shuffle_icon}/>
          <MusicPlayerUtilityIconStyle src={repeat_icon}/>
          <MusicPlayerUtilityIconStyle 
            src={track.isFavourite ? selected_favourite_icon: favourite_icon}
            onClick={() => {handleFavourite(track)}}
          />
        </UtilityContainer> 

      </MusicPlayerContainer>
    </ThemeProvider>
  )
}

export default MusicPlayer;