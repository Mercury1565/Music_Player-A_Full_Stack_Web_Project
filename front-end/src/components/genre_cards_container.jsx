import React, { useEffect, useState } from "react";
import GenreCard from "./genre_card";
import { GenreContainer, GenreHeader, GenreCards } from "../styles/containers";
import { genre_icon, left, right } from "../assets/assets";
import { GenreIconStyle, GenreListNavIconStyle } from "../styles/icons";
import { useDispatch, useSelector } from "react-redux";

const GenreCardsContainer = ({genres}) => {
    const [startIndex, setStartIndex] = useState(0);
    const [cardsToShow, setCardsToShow] = useState(4); // Default to 4 cards

    // Detect screen size and adjust the number of cards to show
    useEffect(() => {
        const updateCardsToShow = () => {
            if (window.innerWidth <= 768) {
                setCardsToShow(2); // Show 2 cards on small screens
            } else {
                setCardsToShow(4); // Show 4 cards on larger screens
            }
        };

        // Initial check
        updateCardsToShow();

        // Add resize event listener to dynamically adjust cards
        window.addEventListener("resize", updateCardsToShow);

        // Cleanup event listener on component unmount
        return () => window.removeEventListener("resize", updateCardsToShow);
    }, []);

    const handleNext = () => {
        setStartIndex(prevIndex => (prevIndex + cardsToShow) % genres.length);
    };

    const handlePrevious = () => {
        setStartIndex(prevIndex => (prevIndex - cardsToShow + genres.length) % genres.length);
    };

    let visibleGenres = genres.slice(startIndex, startIndex + cardsToShow);

    if (visibleGenres.length < cardsToShow) {
        const remainingGenres = cardsToShow - visibleGenres.length;
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