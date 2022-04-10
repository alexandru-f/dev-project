import { createTheme } from '@mui/material/styles';
import { blue } from '@mui/material/colors';

export const theme = createTheme({
    palette: {
        primary: {
            main: blue[700]
        }
    },
    mainButton: {
        backgroundColor: "red",
        color: "white",
        border: "1px solid black"
    }
});