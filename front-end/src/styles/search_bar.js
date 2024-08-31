import styled from '@emotion/styled';

export const SearchBarContainerStyle = styled.div`
    background: #414141;

    width: 600px;
    height: 30px;
    display: flex;
    justify-content: left;
    align-items: center;

    margin: ${(props) => props.theme.space[4]}px 140px;

    padding: ${(props) => props.theme.space[0]}px ${(props) => props.theme.space[4]}px;

    border-radius: ${(props) => props.theme.radii.xlarge};
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