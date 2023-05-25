import ReactMarkdown from "react-markdown";
import fs from "fs";
import path from "path";
import Banner from "../components/Banner";

const Home = ({ markdown }: any) => {
    return (
        <>
            <Banner title={"Brasil Na X"} />
            <ReactMarkdown children={markdown} />
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
