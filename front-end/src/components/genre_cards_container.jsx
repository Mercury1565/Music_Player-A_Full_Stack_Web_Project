import React, { useState } from "react";
import GenreCard from "./genre_card";
import { acoustic } from '../assets/assets';
import { ThemeProvider } from "@emotion/react";
import { GenreContainer, GenreHeader, GenreCards } from "../styles/containers";
import { theme } from "../styles/theme";
import { genre_icon, left, right } from "../assets/assets";
import { GenreIconStyle, GenreListNavIconStyle } from "../styles/icons";

const GenreCardsContainer = () => {
    const genres = [
        {
            name: '1',
            count: 98,
            image: acoustic
        },
        {
            name: '2',
            count: 143,
            image: acoustic
        },
        {
            name: '3',
            count: 98,
            image: acoustic
        },
        {
            name: '4',
            count: 143,
            image: acoustic
        },{
            name: '5',
            count: 98,
            image: acoustic
        },
        {
            name: '6',
            count: 143,
            image: acoustic
        },{
            name: '7',
            count: 98,
            image: acoustic
        },
        {
            name: '8',
            count: 143,
            image: acoustic
        },{
            name: '9',
            count: 98,
            image: acoustic
        },
        {
            name: '10',
            count: 143,
            image: acoustic
        },
    ];

    const [startIndex, setStartIndex] = useState(0);

    const handleNext = () => {
        setStartIndex(prevIndex => (prevIndex + 3) % genres.length);
    };

    const handlePrevious = () => {
        setStartIndex(prevIndex => (prevIndex - 3 + genres.length) % genres.length);
    };

    let visibleGenres = genres.slice(startIndex, startIndex + 3);

    if (visibleGenres.length < 3) {
        const remainingGenres = 3 - visibleGenres.length;
        visibleGenres = [...visibleGenres, ...genres.slice(0, remainingGenres)];
    }

    return(
    <ThemeProvider theme={theme}>
        <GenreContainer>
            <GenreHeader>
                <GenreIconStyle src={genre_icon} />
                <h2>Discover Genre</h2>
            </GenreHeader>

            <GenreCards>
                <GenreListNavIconStyle src={left} onClick={handlePrevious}/>
                {visibleGenres.map((genre, index) => (
                    <GenreCard key={index} genre={genre} />
                ))}
                <GenreListNavIconStyle src={right} onClick={handleNext}/>
            </GenreCards>
        </GenreContainer>
    </ThemeProvider>);
};

export default GenreCardsContainer;