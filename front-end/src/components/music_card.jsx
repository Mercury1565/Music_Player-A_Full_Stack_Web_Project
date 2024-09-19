import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

const MusicCard = ({ music, index, onClick, type }) => {
    const dispatch = useDispatch();

    const isSelected = useSelector((state) => state.track._id === music._id);
    const audioURL = useSelector((state) => state.fetchedMusic.audioFile);
    const coverURL = useSelector((state) => state.fetchedMusic.cover);

    const [isFavourite, setIsFavourite] =  useState(favouriteMusicList && favouriteMusicList.some((m) => m._id === music._id));

    const [duration, setDuration] = useState(0);

    const formatDuration = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const handleFavourite = () => {
        if (isFavourite) {
            setIsFavourite(false);
            dispatch({ type: 'music/removeFavourite', payload: music._id });
            dispatch({ type: 'music/fetchFavouriteMusicList' });
        }
        else{
            setIsFavourite(true);
            dispatch({ type: 'music/appendFavourite', payload: music._id });
            dispatch({ type: 'music/fetchFavouriteMusicList' });
        }
      }

    const [firstClickDelete, setFirstClickDelete] = useState(false);

    const handleDelete = () => {
        if (!firstClickDelete) {
            setFirstClickDelete(true);
        }
        else{
            dispatch({ type: 'music/deleteMusic', payload: music._id });
            dispatch({ type: 'music/fetchYourMusicList' });
            setFirstClickDelete(false);
        }
    }

    useEffect(() => {
        if (music.audio_file_path) {
            dispatch({ type: 'music/fetchMusicAudio', payload: music.audio_file_path });
        }
        if (music.cover_image_path) {
            dispatch({ type: 'music/fetchMusicCover', payload: music.cover_image_path });
        }
    }, [dispatch, music.audio_file_path, music.cover_image_path]);


    useEffect(() => {
        if (!audioURL) return; 
    
        const audio = new Audio(audioURL);
    
        const handleMetadata = () => {
            setDuration(audio.duration);
        };
    
        const handleError = () => {
            setDuration(0); 
        };
    
        // Load the metadata to get the duration
        audio.addEventListener("loadedmetadata", handleMetadata);
        audio.addEventListener("error", handleError);
    
        return () => {
            audio.removeEventListener("loadedmetadata", handleMetadata);
            audio.removeEventListener("error", handleError);
            audio.pause();
            audio.src = '';
        };
    }, [audioURL]);

    return (
        <TopMusicCardContainer isSelected={isSelected}>
            <TopMusicCardDescription onClick={onClick} > 
                <Styled_h4 isSelected={isSelected}>
                    <p>{index + 1}</p>
                </Styled_h4>
                <TopMusicCardImage src={coverURL} />
                <Styled_p isSelected={isSelected}>
                    <p>{music.artist} - {music.title}</p>
                </Styled_p>
            </TopMusicCardDescription>

            <StyledLength isSelected={isSelected} onClick={onClick}>
                {formatDuration(duration)}
            </StyledLength>

            <FavouriteIconStyle 
                src= { isFavourite ? selected_favourite_icon: favourite_icon } 
                onClick={handleFavourite} 
            />

            {type === "your-music" &&
            <GarbageIconStyle
                src={trash_icon}
                onClick={handleDelete}
            />
            
            }
             {firstClickDelete && (
                <DeleteWarning>Click 🗑 again to confirm delete</DeleteWarning>
            )}
            <TopMusicCardPlayPauseIconStyle 
                src={ isSelected ? music_card_pause_icon: music_card_play_icon } 
                onClick={onClick} 
            />

        </TopMusicCardContainer>
    );
}

export default MusicCard;
