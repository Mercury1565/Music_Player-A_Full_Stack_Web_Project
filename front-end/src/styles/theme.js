export const theme = {
  colors: {
    background: '#000000',  // Dark background
    sidebarBackground: 'rgba(17,17,17, 0.3)',  // Slightly darker for sidebar

    primary: 'linear-gradient(90deg, #B5179E 0%, #7209B7 100%)', // Purple highlight color with linear gradient
    secondary: 'rgba(17, 17, 17)',  // accent color for the lists

    textPrimary: '#FFFFFF',  // Main text color
    textSecondary: '#B8B8B8',  // Secondary text color

    iconColor: '#B8B8B8',  // Icon color

    serachBarBackground: 'rgba(65, 65, 65, 0.65',  // Background for cards (e.g., genre)
    cardBackground: 'rgba(69, 69, 69, 0.7)',  // Button backgrounds
    
    scrollbar: '#3A3A3A',  // Scrollbar color
  },

  hover: {
    sidebarButtonHover: 'rgba(35, 35, 35)',  // Slightly less transparent for hover
    scrollbarHover: '#555555',  // Scrollbar hover state
  },

  click: {
    sidebarButtonClick: 'linear-gradient(90deg, #C629B3 0%, #7F1AC1 100%)',
  },
 
  fontSizes: {
    small: '12px',
    medium: '16px',
    large: '24px',
  },

  fontWeight: {
    medium: 500,
  },

  radii: {
    small: '6px',
    medium: '8px',
    large: '12px',
  },

  shadows: {
    card: '0px 4px 8px rgba(0, 0, 0, 0.2)',
    button: '0px 2px 4px rgba(0, 0, 0, 0.2)',
  },

  effects: {
    blurBackground: 'blur(10px)',  // Defines a 10px blur effect
  },

  space: [4, 8, 12, 16, 20, 24, 28],  // Padding and margin sizes

};

