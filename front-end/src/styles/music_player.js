import styled from '@emotion/styled';

export const MusicInfoContainer = styled.div`
    color: ${(props) => props.theme.colors.textPrimary};
   
    display: flex;
    flex-direction: row;
    align-items: center;
    
    gap: ${(props) => props.theme.space[4]}px;
    width: 18%;
`;

export const MusicImageContainer = styled.img`
    width: 58px;
    height: 58px;
    border-radius: 50%;
`;

export const MusicTitleContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: left;
    padding: ${(props) => props.theme.space[0]}px;

    h3{
        margin: 2px 0px;
    }
    p{
        margin: 2px 0px;
        font-size: 12px;
    }
`

export const ControllerContainer = styled.div`
    display: flex;
    justify-content: space-between;
    gap: ${(props) => props.theme.space[4]}px;
`;

export const Seeker = styled.div`
    width: 40%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const SeekPositionContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

`;

export const UtilityContainer = styled.div`
    display: flex;
    gap: ${(props) => props.theme.space[4]}px;
`;

export const TinyText = styled.p`
    font-size: ${(props) => props.theme.fontSizes[0]};
    opacity: 0.38;
    font-weight: 500;
    letter-spacing: 0.2;
    color: ${(props) => props.theme.colors.textPrimary};
    margin: 0px;
`;