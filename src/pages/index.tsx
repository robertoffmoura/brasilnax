import fs from "fs";
import path from "path";
import Banner from "../components/Banner";
import MarkdownParser from "../components/MarkdownParser";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Home = ({ markdown }: any) => {
    return (
        <>
            <Banner title={"Brasil Na X"} />
            <Container className="home-content">
                <MarkdownParser markdown={markdown} />
                <Box className="footer-wrapper">
                    <Typography className="footer">Direitos de imagem do conjunto do site: © Barande Jérémy</Typography>
                </Box>
            </Container>
        </>
    );
};

export async function getStaticProps() {
    const filePath = path.join(process.cwd(), "src", "content", "home.md");
    const markdown = fs.readFileSync(filePath, "utf8");

    return {
        props: {
            markdown,
        },
    };
}

export default Home;
