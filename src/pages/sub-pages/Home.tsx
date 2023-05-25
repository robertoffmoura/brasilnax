import { BasePageProps } from "../../misc/types";

const Home: React.FC<BasePageProps> = ({ metadata, htmlContent }) => {
    return <h1>Home</h1>;
};

export default Home;
/*

import Banner from "../../components/Banner";
import ReactMarkdown from "react-markdown";
import fs from "fs";
import path from "path";
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
*/
