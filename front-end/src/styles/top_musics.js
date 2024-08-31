import styled from '@emotion/styled';

// top music containers
export const TopMusicCardContainer = styled.div`
    background: ${(props) => props.theme.colors.musicCard};
    color: ${(props) => props.theme.colors.textPrimary};

    padding: ${(props) => props.theme.space[0]}px ${(props) => props.theme.space[6]}px;
    width: 70%;
    height: 55px;

    font-size: ${(props) => props.theme.fontSizes.medium};
    font-weight: ${(props) => props.theme.fontWeight.medium};

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: ${(props) => props.theme.space[4]}px;

    &:hover {
        background: ${(props) => props.theme.colors.cardBackground};
    }

    &:active {
        background: ${(props) => props.theme.colors.cardBackground};
    }
`;

export const TopMusicCardDescription = styled.div`
    display: flex;
    align-items: center;
    gap: ${(props) => props.theme.space[6]}px;
    width: 400px;

    h4 {
        font-size: ${(props) => props.theme.fontSizes.large};
        font-weight: ${(props) => props.theme.fontWeight.medium};
    }
`

export const TopMusicCardImage = styled.img`
    width: 58px;
    height: 58px;
    border-radius: 50%;
`;


export const Styled_h4 = styled.h4`
  ${({ isSelected, theme }) =>
    isSelected
        && `
        background: ${theme.colors.primary};
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        color: transparent;
        `
  }
`;

export const Styled_p = styled.p`
  ${({ isSelected, theme }) =>
    isSelected
        && `
        background: ${theme.colors.primary};
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        color: transparent;
        `
  }
`;

export const StyledLength = styled.p`
  ${({ isSelected, theme }) =>
    isSelected
        && `
        background: ${theme.colors.primary};
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        color: transparent;
        `
  }
`;