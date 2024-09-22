import { useState, useEffect } from "react";
import { AddMusicButton, AddMusicForm, AddMusicInput, AddMusicLabel, AddMusicHeader, AddMusicCheckbox, AddMusicCheckboxContainer, AddMusicGenreContainer, GenreListContainer } from "../styles/add_music";
import { ThemeProvider } from "@emotion/react";
import { my_theme } from "../styles/theme";
import { AddMusicContainer, ErrorText, LoadingText, SuccessText } from "../styles/containers";
import { TopMusicHeaderIcon } from "../styles/icons";
import { add_music_icon } from "../assets/assets";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toggleSidebar } from "../redux/slices/sideBarSlice";

const AddMusicCard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { loggedIn } = useSelector((state) => state.auth);
    const { genreList, genreMessage, genreError } = useSelector((state) => state.genreList);
    const { yourMusicList, yourMusicLoading, yourMusicMessage, yourMusicError } = useSelector((state) => state.yourMusicList);

    const [title, setTitle] = useState("");
    const [artist, setArtist] = useState("");
    const [genre, setGenre] = useState([]);
    const [musicFile, setMusicFile] = useState(null);
    const [coverFile, setCoverFile] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        dispatch(toggleSidebar(false))

        if (!loggedIn) {
            navigate('/login');
        } else {
            dispatch({ type: 'music/fetchGenreList' });
        }
    }, [dispatch, loggedIn, navigate]);

    useEffect(() => {
        if (yourMusicError) {
            setErrorMessage('Error creating music. Please try again.');
        }
    }, [yourMusicError, navigate]);

    if (!loggedIn) {
        return null;
    }

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleArtistChange = (e) => {
        setArtist(e.target.value);
    };

    const handleGenreChange = (e) => {
        const selectedGenre = e.target.value;
        if (genre.includes(selectedGenre)) {
            setGenre(genre.filter((item) => item !== selectedGenre));
        } else {
            setGenre([...genre, selectedGenre]);
        }
    };

    const handleMusicFileChange = (e) => {
        const file = e.target.files[0];
        const validAudioTypes = ['audio/mpeg', 'audio/wav', 'audio/ogg', 'audio/mp3', 'audio/m4a'];

        if (file && validAudioTypes.includes(file.type)) {
            setMusicFile(file);
            setErrorMessage(""); 
        } else {
            setErrorMessage("Invalid music file format. Please upload an audio file (mp3, wav, or ogg).");
            setMusicFile(null);
        }
    };

    const handleCoverFileChange = (e) => {
        const file = e.target.files[0];
        const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];

        if (file && validImageTypes.includes(file.type)) {
            setCoverFile(file);
            setErrorMessage("");  // Clear any previous error
        } else {
            setErrorMessage("Invalid cover file format. Please upload an image file (jpeg, png, or gif).");
            setCoverFile(null);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!musicFile) {
          setErrorMessage("Please ensure you have uploaded a valid music file and cover image.");
          return;
        }
      
        const audio = new Audio(URL.createObjectURL(musicFile));

        audio.addEventListener('loadedmetadata', () => {
          const audioDuration = audio.duration;
      
          dispatch({
            type: 'music/createMusic',
            payload: {
              musicData: { artist, title, genre, duration: audioDuration },
              musicFile,
              coverFile,
            },
          });      
        });
      
        // Handle errors while loading metadata (invalid file, etc.)
        audio.addEventListener('error', () => {
          setErrorMessage('Invalid audio file');
        });
      };
      

    return (
        <ThemeProvider theme={my_theme}>
            <AddMusicContainer>
                <AddMusicHeader>
                    <TopMusicHeaderIcon src={add_music_icon}/>
                    <h2>Add Music</h2>
                </AddMusicHeader>
                <AddMusicForm onSubmit={handleSubmit}>
                    <AddMusicLabel>
                        Title:
                        <AddMusicInput type="text" value={title} onChange={handleTitleChange} />
                    </AddMusicLabel>
                    <br />
                    <AddMusicLabel>
                        Artist:
                        <AddMusicInput type="text" value={artist} onChange={handleArtistChange} />
                    </AddMusicLabel>
                    <br />
                    <AddMusicLabel>
                        Genre:
                        <GenreListContainer>
                            <AddMusicGenreContainer>
                                {genreList.slice(0, 5).map((genreItem) => (
                                    <AddMusicCheckboxContainer key={genreItem.name}>
                                        <AddMusicCheckbox
                                            type="checkbox"
                                            id={genreItem.name}
                                            value={genreItem.name}
                                            checked={genre.includes(genreItem.name)}
                                            onChange={handleGenreChange}
                                        />
                                        <label htmlFor={genreItem.name}>{genreItem.name}</label>
                                    </AddMusicCheckboxContainer>
                                ))}
                            </AddMusicGenreContainer>
                            <AddMusicGenreContainer>
                                {genreList.slice(5, 10).map((genreItem) => (
                                    <AddMusicCheckboxContainer key={genreItem.name}>
                                        <AddMusicCheckbox
                                            type="checkbox"
                                            id={genreItem.name}
                                            value={genreItem.name}
                                            checked={genre.includes(genreItem.name)}
                                            onChange={handleGenreChange}
                                        />
                                        <label htmlFor={genreItem.name}>{genreItem.name}</label>
                                    </AddMusicCheckboxContainer>
                                ))}
                            </AddMusicGenreContainer>
                            <AddMusicGenreContainer>
                                {genreList.slice(10, 15).map((genreItem) => (
                                    <AddMusicCheckboxContainer key={genreItem.name}>
                                        <AddMusicCheckbox
                                            type="checkbox"
                                            id={genreItem.name}
                                            value={genreItem.name}
                                            checked={genre.includes(genreItem.name)}
                                            onChange={handleGenreChange}
                                        />
                                        <label htmlFor={genreItem.name}>{genreItem.name}</label>
                                    </AddMusicCheckboxContainer>
                                ))}
                            </AddMusicGenreContainer>
                            <AddMusicGenreContainer>
                                {genreList.slice(15, 20).map((genreItem) => (
                                    <AddMusicCheckboxContainer key={genreItem.name}>
                                        <AddMusicCheckbox
                                            type="checkbox"
                                            id={genreItem.name}
                                            value={genreItem.name}
                                            checked={genre.includes(genreItem.name)}
                                            onChange={handleGenreChange}
                                        />
                                        <label htmlFor={genreItem.name}>{genreItem.name}</label>
                                    </AddMusicCheckboxContainer>
                                ))}
                            </AddMusicGenreContainer>
                        </GenreListContainer>
                    </AddMusicLabel>
                    <br />
                    <AddMusicLabel>
                        Music File:
                        <AddMusicInput type="file" onChange={handleMusicFileChange} />
                    </AddMusicLabel>
                    <AddMusicLabel>
                        Cover Image:
                        <AddMusicInput type="file" onChange={handleCoverFileChange} />
                    </AddMusicLabel>
                    <AddMusicButton type="submit">Add Music</AddMusicButton>
                </AddMusicForm>

                {errorMessage && <ErrorText>*{errorMessage}</ErrorText>}
                {yourMusicMessage && <SuccessText>HORRAH!!! Music Added Successfully!!!</SuccessText>}
                {yourMusicLoading && <LoadingText>Adding Music...</LoadingText>}
            </AddMusicContainer>
        </ThemeProvider>
    );
};


export default AddMusicCard;