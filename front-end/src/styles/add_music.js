import styled from '@emotion/styled';

export const AddMusicForm = styled.form`
    width: 75%;
    display: flex;
    justify-content: center;
    flex-direction: column;
`;

export const AddMusicInput = styled.input`
    background: #414141;

    border: none;
    border-radius: ${(props) => props.theme.radii.xlarge};
    color: ${(props) => props.theme.colors.textPrimary};
    width: 100%;
    outline: none;

    margin: ${(props) => props.theme.space[0]}px 0;
    padding: ${(props) => props.theme.space[2]}px ${(props) => props.theme.space[4]}px;

`;    

export const AddMusicLabel = styled.label`
    color: ${(props) => props.theme.colors.textPrimary};
    padding: ${(props) => props.theme.space[0]}px ${(props) => props.theme.space[0]}px;

`;

export const AddMusicButton = styled.button`
    background: ${(props) => props.theme.colors.primary};
    color: ${(props) => props.theme.colors.textPrimary};

    border: none;
    border-radius: ${(props) => props.theme.radii.xlarge};
    padding: ${(props) => props.theme.space[1]}px ${(props) => props.theme.space[3]}px;

    margin-top: ${(props) => props.theme.space[4]}px;
    margin-left: ${(props) => props.theme.space[5]}px;

    &:hover {
        filter: brightness(0.8);
        cursor: pointer
    }

    @media (max-width: 768px) {
        margin-left: 100px;  
    }
`;

export const AddMusicHeader = styled.div`
    color: ${(props) => props.theme.colors.textPrimary};

    margin-bottom: ${(props) => props.theme.space[2]}px;

    display: flex;
    align-items: center;

    h2 {
    margin: 15px;
    }
`;

export const GenreListContainer = styled.div`
    display: flex;
    gap: 50px;
    justify-content: left;
    margin: ${(props) => props.theme.space[2]}px 0;
`;  

export const AddMusicGenreContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: left;
    gap: ${(props) => props.theme.space[4]}px;

    margin: ${(props) => props.theme.space[2]}px 0;
`

export const AddMusicCheckboxContainer = styled.div`
    display: flex;
    justify-content: left;
    align-items: center;
    gap: ${(props) => props.theme.space[0]}px;
`

export const AddMusicCheckbox = styled.input`
    appearance: none;
    width: 17px;
    height: 17px;

    background: #fff;
    border-radius: ${(props) => props.theme.radii.medium};

    &:checked {
        background: ${(props) => props.theme.colors.primary};
        
    }
`;