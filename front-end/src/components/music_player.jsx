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

import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setMusic } from "../redux/slices/musicSlice";

const MusicPlayer = () => {
      const dispatch = useDispatch()

      const {loggedIn} = useSelector((state) => state.auth);

      const current_track = useSelector((state) => state.track);
      const nowPlaying = useSelector((state) => state.nowPlaying);
      const { cover, audioFile, error} = useSelector((state) => state.fetchedMusic);

      const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
      const [playMode, setPlayMode] = useState('sequential');  // Mode: 'sequential' or 'random'

      useEffect(() => {
          if (!loggedIn || !current_track) return

          setCurrentTrackIndex(nowPlaying.findIndex(track => track._id === current_track._id));
      }, [dispatch, loggedIn]);

      const audioRef = useRef(null);
      const [isPlaying, setIsPlaying] = useState(true);
      const [position, setPosition] = useState(0);
      const [volume, setVolume] = useState(30);  
      const [duration, setDuration] = useState(0);

      useEffect(() => {
        if (audioRef.current && current_track) {
          const audio = audioRef.current;

          // Update duration when the metadata is loaded
          audio.onloadedmetadata = () => {
            setDuration(audio.duration);
          };

          // Update position as the audio plays
          audio.ontimeupdate = () => {
            setPosition(audio.currentTime);
          };

          audio.onended = handleTrackEnd;
          audio.play();
          setIsPlaying(true);
        }
      }, [current_track, audioFile, cover]);  // Re-run when current_track or isPlaying changes

      const formatDuration = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
      };

      const handlePlayPause = () => {
        if (isPlaying) {
          audioRef.current.pause();
        } else {
          audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
      };

      const handleSeek = (event, value) => {
        audioRef.current.currentTime = value;
        setPosition(value);
      };

      const handleVolumeChange = (event, value) => {
        audioRef.current.volume = value / 100;  // Volume should be between 0 and 1
        setVolume(value);
      };

    const handleTrackEnd = () => {
      if (playMode === 'sequential') {
        handleNextTrack();
      } 
      else if (playMode === 'random') {
        handleRandomTrack();
      }
      else if (playMode === 'repeat') {
        dispatch(setMusic(current_track));
      }
    };

    const handleNextTrack = () => {
      if (currentTrackIndex < nowPlaying.length - 1) {
          setCurrentTrackIndex((prev_index) => prev_index + 1);
      } 
      else {
        setCurrentTrackIndex(0);  // Loop back to the first track
      }
      dispatch(setMusic(nowPlaying[currentTrackIndex]));

    };

    const handlePreviousTrack = () => {
      if (currentTrackIndex > 0) {
        setCurrentTrackIndex((prev_index) => prev_index - 1);
      } else {
        setCurrentTrackIndex(nowPlaying.length - 1);  // Loop to the last track
      }
      dispatch(setMusic(nowPlaying[currentTrackIndex]));

    };

    const handleRandomTrack = () => {
      const randomIndex = Math.floor(Math.random() * nowPlaying.length);
      setCurrentTrackIndex(randomIndex);
      dispatch(setMusic(nowPlaying[currentTrackIndex]));
    };

    const togglePlayMode = () => {
      setPlayMode((prevMode) => (prevMode === 'random' ? 'sequential' : 'random'));
    };

    if (!loggedIn){
      return null
    }

    return(
      <ThemeProvider theme={my_theme}>
        <MusicPlayerContainer>
          <MusicInfoContainer>
            <MusicImageContainer src={cover}/>
            <MusicTitleContainer>
              <h3>{current_track.title}</h3>
              <p>{current_track.artist}</p>
            </MusicTitleContainer>
          </MusicInfoContainer>

          <audio ref={audioRef} src={audioFile} />

          <ControllerContainer>
            <MusicPlayerIconStyle src={bwd_icon} onClick={handlePreviousTrack} />
            <MusicPlayerIconStyle 
              src={isPlaying ? player_pause_icon : player_play_icon} 
              onClick={handlePlayPause}
            />
            <MusicPlayerIconStyle src={fwd_icon} onClick={handleNextTrack}/>
          </ControllerContainer>

          <Seeker>
            <Slider 
              aria-label="time-indicator"
              value={position}
              min={0}
              step={1}
              max={duration}
              onChange={handleSeek}
              color="secondary"
            />
            <SeekPositionContainer>
              <TinyText>{formatDuration(position)}</TinyText>
              <TinyText>-{formatDuration(duration - position)}</TinyText>
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
                onChange={handleVolumeChange}
              />
            </Stack>
          </Box>

          <UtilityContainer>
            <MusicPlayerUtilityIconStyle src={shuffle_icon} isActive={playMode === 'random'} onClick={togglePlayMode}/>
            <MusicPlayerUtilityIconStyle src={repeat_icon} isActive={playMode === 'repeat'} onClick={() => {setPlayMode("repeat")}}/>
          </UtilityContainer> 

        </MusicPlayerContainer>
      </ThemeProvider>
    )
}

export default MusicPlayer;