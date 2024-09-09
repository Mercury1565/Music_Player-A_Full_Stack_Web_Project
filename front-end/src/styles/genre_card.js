import styled from '@emotion/styled';

export const GenreCardContainer = styled.div`
    border-radius: ${(props) => props.theme.radii.xlarge};
    box-shadow: ${(props) => props.theme.shadows.card};
    border: none;

    width: 239px;
    height: 269px;

    position: relative;

    &:hover {
        cursor: pointer
    }

    @media (max-width: 768px) {
        width: 170px;
        height: 170px;
    }
`;

export const GenreCardImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: ${(props) => props.theme.radii.xlarge};
`;

export const GenreCardFooter = styled.div`
    background: ${(props) => props.theme.colors.cardBackground};
    color: ${(props) => props.theme.colors.textSecondary};

    border-radius: 0 0 ${(props) => props.theme.radii.xlarge} ${(props) => props.theme.radii.xlarge};
    border: none;

    font-size: ${(props) => props.theme.fontSizes.medium};
    font-weight: ${(props) => props.theme.fontWeight.medium};

    padding: ${(props) => props.theme.space[0]}px ${(props) => props.theme.space[5]}px;
    height: 60px;

    backdrop-filter: ${(props) => props.theme.effects.blurBackground};
   
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;

    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;

    @media (max-width: 768px) {
        padding: ${(props) => props.theme.space[0]}px ${(props) => props.theme.space[2]}px;
    }
`;

export const GenreCardTextContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;

    h4 {
        margin: 2px;
        font-size: ${(props) => props.theme.fontSizes.medium};
        letter-spacing: 1.5px; 
    }

    p {
        margin: 2px;
        font-size: ${(props) => props.theme.fontSizes.small};
    }
`;