import { green, purple, red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        primary: {
            main: '#16B1FF',
            contrastText: '#FFFFFF'
        },
    },
    spacing: (factor) => `${0.5 * factor}rem`,
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    '&:hover': {
                        textDecoration: 'none',
                        backgroundColor: 'rgb(19, 156, 224)',
                        boxShadow: 'rgb(58 53 65 / 56%) 0px 6px 18px -8px'
                    },
                    boxShadow: 'rgb(58 53 65 / 42%) 0px 4px 8px -4px'
                }
            }
        }
    }
});