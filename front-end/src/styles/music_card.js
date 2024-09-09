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
        cursor: pointer;
    }

    &:active {
        background: ${(props) => props.theme.colors.cardBackground};
    }

    @media (max-width: 768px) {
      width: 87%;
      padding: ${(props) => props.theme.space[0]}px ${(props) => props.theme.space[3]}px;
    }    
`;

export const TopMusicCardDescription = styled.div`
    display: flex;
    align-items: center;
    gap: ${(props) => props.theme.space[6]}px;
    width: 400px;

    @media (max-width: 768px) {
      width: 225px;
      gap: ${(props) => props.theme.space[2]}px;
    }  
`

export const TopMusicCardImage = styled.img`
    width: 58px;
    height: 58px;
    border-radius: 50%;

    @media (max-width: 768px) {
      width: 40px;
      height: 40px;
    }
`;


export const Styled_h4 = styled.div`
    font-size: ${(props) => props.theme.fontSizes.large};
    font-weight: ${(props) => props.theme.fontWeight.medium};
    width: 30px;

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

  @media (max-width: 768px) {
    font-size: ${(props) => props.theme.fontSizes.small};
    width: 15px;
  }    
`;

export const Styled_p = styled.div`
  width: 125px;
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

  @media (max-width: 768px) {
    font-size: ${(props) => props.theme.fontSizes.small};
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

  @media (max-width: 768px) {
    display: none;  
  }
`;

export const DeleteWarning = styled.p`
    color: pink;
    font-size: ${(props) => props.theme.fontSizes.small};
`;
