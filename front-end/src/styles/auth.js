import styled from '@emotion/styled';

export const AuthForm = styled.form`
    width: 75%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    
`;

export const AuthInput = styled.input`
    background: #696762;

    border: none;
    border-radius: ${(props) => props.theme.radii.xlarge};
    color: ${(props) => props.theme.colors.textPrimary};
    width: 100%;
    font-size: ${(props) => props.theme.fontSizes.medium};

    margin: ${(props) => props.theme.space[0]}px 0;
    padding: ${(props) => props.theme.space[2]}px ${(props) => props.theme.space[4]}px;

`;    

export const AuthLabel = styled.label`
    color: ${(props) => props.theme.colors.textPrimary};
    padding: ${(props) => props.theme.space[0]}px ${(props) => props.theme.space[0]}px;

`;

export const AuthButton = styled.button`
    background: ${(props) => props.theme.colors.primary};
    color: ${(props) => props.theme.colors.textPrimary};

    border: none;
    border-radius: ${(props) => props.theme.radii.xlarge};
    padding: ${(props) => props.theme.space[3]}px ${(props) => props.theme.space[3]}px;

    margin-top: ${(props) => props.theme.space[4]}px;
    margin-left: ${(props) => props.theme.space[5]}px;

    font-size: ${(props) => props.theme.fontSizes.medium};

    &:hover {
        filter: brightness(0.8);
        cursor: pointer
    }
`;

export const AuthHeader = styled.div`
    color: ${(props) => props.theme.colors.textPrimary};

    margin-bottom: ${(props) => props.theme.space[2]}px;

    display: flex;
    align-items: center;
    font-size: ${(props) => props.theme.fontSizes.large};

    h2 {
    margin: 15px;
    }
`;

export const NavigatorContainer = styled.div` 
    display: flex;
    justify-content: right;
    align-items: center;
    margin-top: ${(props) => props.theme.space[2]}px;

    p {
        margin-right: ${(props) => props.theme.space[1]}px;
    }
`;

export const NavigatorP = styled.p`
    color: pink;

    &:hover {
        text-decoration: underline;
        filter: brightness(0.8);
        cursor: pointer
    }
`;