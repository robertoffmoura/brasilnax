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
            primary: "#666666",
        },
    },
    typography: {
        fontFamily: "'Lato', sans-serif",
        fontSize: 15,
        h2: {
            fontSize: 40,
            fontFamily: "'Crimson Text', serif",
            fontStyle: "italic",
            fontWeight: "bold",
        }
    },
});

export { defaultTheme };
