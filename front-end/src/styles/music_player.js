import styled from '@emotion/styled';

export const MusicInfoContainer = styled.div`
    color: ${(props) => props.theme.colors.textPrimary};
   
    display: flex;
    flex-direction: row;
    align-items: center;
    
    gap: ${(props) => props.theme.space[4]}px;
    width: 20%;


`;

export const MusicImageContainer = styled.img`
    width: 58px;
    height: 58px;
    border-radius: 50%;

    @media (max-width: 768px) {
        display: none;
    }    
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

export const AdjusterController = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 100px;

    width: 60%;
    padding: 0px 10px;

    @media (max-width: 768px) {
        flex-direction: column;
        padding: 0px 0px;
        gap: 3px;        
      }    
`

export const Seeker = styled.div`
    width: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    @media (max-width: 768px) {
        display: none;
    }   
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