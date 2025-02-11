const ThemeColor = ({ themeColour }) => {
    switch (themeColour) {
        case 'light':
            return 'var(--colour-light)';
        case 'dark':
            return 'var(--colour-dark)';
        case 'purple':
            return 'var(--colour-purple)';
        case 'blue':
            return 'var(--colour-blue)';
        case 'green':
            return 'var(--colour-green)';
        default:
            return 'var(--colour-green-01)';
    }
};

export default ThemeColor; 