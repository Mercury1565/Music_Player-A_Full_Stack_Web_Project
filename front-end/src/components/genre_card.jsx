import { ThemeProvider } from "@emotion/react";
import { theme } from "../styles/theme";
import { GenreCardContainer, GenreCardFooter, GenreCardImage, GenreCardTextContainer } from "../styles/genre_card";
import { GenreCardIconStyle } from "../styles/icons";

import {play_icon} from "../assets/assets";

const GenreCard = ({ genre }) => (
    <ThemeProvider theme={theme}>
        <GenreCardContainer>
            <GenreCardImage src={genre.image} alt={genre.name} />
            <GenreCardFooter>
                <GenreCardTextContainer>
                    <h4>{genre.name}</h4>
                    <p>{genre.count} Tracks</p>
                </GenreCardTextContainer>
                <GenreCardIconStyle src={play_icon} />
            </GenreCardFooter>
        </GenreCardContainer>
    </ThemeProvider>
);

export default GenreCard;
