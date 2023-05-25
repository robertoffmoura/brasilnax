import { AppProps } from "next/app";
import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import NavigationBar from "../modules/NavBar";
import { defaultTheme } from "../styles/theme";
import "../styles/global.scss";
import pages from "../content/pages.json";

const App = ({ Component, pageProps }: AppProps) => {
    const AnyComponent = Component as any;
    return (
        <ThemeProvider theme={defaultTheme}>
            <StyledEngineProvider injectFirst>
                <div className="root">
                    <NavigationBar pages={pages} />
                    <AnyComponent {...pageProps} />
                    <Box height="150px" />
                </div>
            </StyledEngineProvider>
        </ThemeProvider>
    );
};

export default App;
