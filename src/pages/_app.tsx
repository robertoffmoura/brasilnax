import { AppProps } from "next/app";
import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles";
import NavigationBar from "../modules/NavBar";
import { defaultTheme } from "../styles/theme";
import "../styles/global.css";

const pages = [
    {
        name: "HOME",
        path: "/",
    },
    {
        name: "COMO CHEGAR",
        path: "/comochegar",
        subPages: [
            { name: "Com convênio", path: "/com-convenio", subPages: [{ name: "Poli-USP", path: "/poli-usp" }] },
            { name: "Sem convênio", path: "/sem-convenio" },
            {
                name: "Processo de Seleção",
                path: "/processo-de-selecao",
                subPages: [
                    { name: "Documentação", path: "/documentacao" },
                    { name: "A prova escrita", path: "/prova-escrita" },
                    { name: "A prova oral", path: "/prova-oral" },
                ],
            },
        ],
    },
];

const App = ({ Component, pageProps }: AppProps) => {
    return (
        <ThemeProvider theme={defaultTheme}>
            <StyledEngineProvider injectFirst>
                <div className="root">
                    <NavigationBar pages={pages} />
                    <Component {...pageProps} />
                </div>
            </StyledEngineProvider>
        </ThemeProvider>
    );
};

export default App;
