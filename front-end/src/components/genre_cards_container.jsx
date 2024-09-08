import React, { useEffect, useState } from "react";
import GenreCard from "./genre_card";
import { GenreContainer, GenreHeader, GenreCards } from "../styles/containers";
import { genre_icon, left, right } from "../assets/assets";
import { GenreIconStyle, GenreListNavIconStyle } from "../styles/icons";
import { useDispatch, useSelector } from "react-redux";

const GenreCardsContainer = ({genres}) => {
    const [startIndex, setStartIndex] = useState(0);

    const handleNext = () => {
        setStartIndex(prevIndex => (prevIndex + 4) % genres.length);
    };

    const handlePrevious = () => {
        setStartIndex(prevIndex => (prevIndex - 4 + genres.length) % genres.length);
    };

    let visibleGenres = genres.slice(startIndex, startIndex + 4);

    if (visibleGenres.length < 4) {
        const remainingGenres = 4 - visibleGenres.length;
        visibleGenres = [...visibleGenres, ...genres.slice(0, remainingGenres)];
    }

    return (
        <GenreContainer>
            <GenreHeader>
                <GenreIconStyle src={genre_icon} />
                <h2>Discover Genre</h2>
            </GenreHeader>

            <GenreCards>
                <GenreListNavIconStyle src={left} onClick={handlePrevious}/>
                {visibleGenres.map((genre, index) => (
                    <GenreCard 
                        key={index} 
                        genre={genre} 
                    />
                ))}
                <GenreListNavIconStyle src={right} onClick={handleNext}/>
            </GenreCards>
        </GenreContainer>

    );
};

export default GenreCardsContainer;