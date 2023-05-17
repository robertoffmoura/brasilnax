import { createTheme } from "@mui/material/styles";

const defaultTheme = createTheme({
    palette: {
        mode: "light",
        background: {
            default: "#666666",
            paper: "#ffffff",
        },
        primary: {
            dark: "#474748",
            main: "#ffffff",
            light: "#666666f2",
        },
        info: {
            main: "#d75f04",
            contrastText: "#d75f04",
        },
        secondary: {
            main: "#ffffff",
        },
        text: {
            primary: "#ffffff",
        },
    },
    typography: {
        fontFamily: "'Lato', sans-serif",
        fontSize: 15,
    },
});

export { defaultTheme };
