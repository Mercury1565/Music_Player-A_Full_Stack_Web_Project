import styled from '@emotion/styled';

// golbal icon style
export const GlobalIconStyle = styled.img`
    width: 20px;
    height: 20px;
`;

// sidebar icons
export const SidebarIconStyle = styled.img`
    width: 20px;
    height: 20px;
`;

// genre section icons
export const GenreCardIconStyle = styled.img`
    width: 40px;
    height: 40px;
    &:hover {
        filter: brightness(5);
        cursor: pointer
    }
`;

export const GenreIconStyle = styled.img`
    width: 18px;
    height: 22.29px;
`;

export const GenreListNavIconStyle = styled.img`
    width: 25px;
    height: 25px;
    &:hover {
        filter: brightness(0.7);
        cursor: pointer
    }
`;

// top music icons
export const TopMusicCardPlayPauseIconStyle = styled.img`
    width: 20px;
    height: 20px;
    &:hover {
        filter: brightness(2);
        cursor: pointer
    }
`;

export const TopMusicHeaderIcon = styled.img`
    width: 25px;
    height: 25px;
`;

// music player icons
export const MusicPlayerIconStyle = styled.img`
    width: 25px;
    height: 25px;
    &:hover {
        filter: brightness(0.9);
        cursor: pointer
    }
`;

export const MusicPlayerUtilityIconStyle = styled.img`
    width: 22px;
    height: 18px;
    filter: ${({ isActive }) => (isActive ? 'brightness(2) saturate(50%) invert(30%) sepia(85%) saturate(1000%) hue-rotate(260deg) brightness(85%) contrast(90%)' : 'none')};


    &:hover {
        filter: brightness(2);
        cursor: pointer;
    }
`;

export const AddMusicIconStyle = styled.img`
    width: 25px;
    height: 25px;
`;

export const FavouriteIconStyle = styled.img`
    color: red;
    width: 22px;
    height: 18px;
    &:hover {
        filter: brightness(2);
        cursor: pointer
    }
`;
