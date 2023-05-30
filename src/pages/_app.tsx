import { AppProps } from "next/app";
import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import NavigationBar from "../modules/NavBar";
import Head from "next/head";
import { defaultTheme } from "../styles/theme";
import "../styles/global.scss";
import pages from "../content/pages.json";

const App = ({ Component, pageProps }: AppProps) => {
    const AnyComponent = Component as any;
    return (
        <ThemeProvider theme={defaultTheme}>
            <StyledEngineProvider injectFirst>
                <Head>
                    <title>Brasil na X</title>
                </Head>
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
