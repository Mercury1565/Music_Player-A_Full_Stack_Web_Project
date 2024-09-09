import styled from '@emotion/styled';

export const SearchBarContainerStyle = styled.div`
    background: #414141;

    display: flex;
    justify-content: left;
    align-items: center;

    padding: ${(props) => props.theme.space[0]}px ${(props) => props.theme.space[4]}px;
    border-radius: ${(props) => props.theme.radii.xlarge};

    margin-top: 60px;
    width: 600px;
    height: 30px;

    @media (max-width: 768px) {
        width: 325px;
    }

`

export const SearchBarStyle = styled.input`
    background: #414141;
    border: none;
    color: ${(props) => props.theme.colors.textPrimary};
    width: 100%;
    outline: none;

    margin-left: ${(props) => props.theme.space[2]}px;
    font-size: ${(props) => props.theme.fontSizes.xsmall};
    font-weight: ${(props) => props.theme.fontWeight.medium};
`;