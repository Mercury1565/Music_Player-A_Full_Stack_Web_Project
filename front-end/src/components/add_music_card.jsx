import { useState } from "react";
import { AddMusicButton, AddMusicForm, AddMusicInput, AddMusicLabel, AddMusicHeader, AddMusicCheckbox, AddMusicCheckboxContainer, AddMusicGenreContainer } from "../styles/add_music";
import { ThemeProvider } from "@emotion/react";
import { my_theme } from "../styles/theme";
import { AddMusicContainer } from "../styles/containers";
import { TopMusicHeaderIcon } from "../styles/icons";
import { add_music_icon } from "../assets/assets";

const AddMusicCard = () => {
    const [title, setTitle] = useState("");
    const [artist, setArtist] = useState("");
    const [genre, setGenre] = useState("");
    const [musicFile, setMusicFile] = useState(null);

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleArtistChange = (e) => {
        setArtist(e.target.value);
    };

    const handleGenreChange = (e) => {
        setGenre(e.target.value);
    };

    const handleMusicFileChange = (e) => {
        setMusicFile(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Perform the logic to add the music using the provided data
        // For example, you can send an API request to the server to save the music
        console.log("Title:", title);
        console.log("Artist:", artist);
        console.log("Genre:", genre);
        console.log("Music File:", musicFile);
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
                    <AddMusicGenreContainer>
                        <AddMusicCheckboxContainer>
                            <AddMusicCheckbox type="checkbox" id="rock" value="rock" checked={genre === "rock"} onChange={handleGenreChange} />
                            <label htmlFor="rock">Rock</label>
                        </AddMusicCheckboxContainer>
                        <AddMusicCheckboxContainer>
                            <AddMusicCheckbox type="checkbox" id="pop" value="pop" checked={genre === "pop"} onChange={handleGenreChange} />
                            <label htmlFor="pop">Pop</label>
                        </AddMusicCheckboxContainer>
                        <AddMusicCheckboxContainer>
                            <AddMusicCheckbox type="checkbox" id="hiphop" value="hiphop" checked={genre === "hiphop"} onChange={handleGenreChange} />
                            <label htmlFor="hiphop">Hip Hop</label>
                        </AddMusicCheckboxContainer>
                    </AddMusicGenreContainer>
                </AddMusicLabel>
                <br />
                <AddMusicLabel>
                    Music File:
                    <AddMusicInput type="file" onChange={handleMusicFileChange} />
                </AddMusicLabel>
                <br />
                <AddMusicButton type="submit">Add Music</AddMusicButton>
            </AddMusicForm>
            </AddMusicContainer>
        </ThemeProvider>
    );
};


export default AddMusicCard;