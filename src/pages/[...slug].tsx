import metadata from "../content/metadata.json";
import path from "path";
import Image from "next/image";
import fs from "fs";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

export default function Page({ pageData, htmlContent }: any) {
    if (!pageData) return <div>No Page Found</div>;

    return (
        <Box className="page">
            <Box className="banner">
                <Image className="bannerImage" src="/images/bicorne.jpg" fill alt="banner" />
                <Box className="bannerContent">
                    <Image src="/images/logo.png" className="pageImage" layout="fixed" width={100} height={100} alt="Page" />
                    <Box className="separator" />
                    <Typography className="title">{pageData.title}</Typography>
                </Box>
            </Box>
            <Container maxWidth="md" dangerouslySetInnerHTML={{ __html: htmlContent }} />
        </Box>
    );
}

export async function getStaticProps({ params }: any) {
    const currentPath = "/" + params.slug.join("/");
    const pageMeta = metadata.find((data) => data.path === currentPath);

    let htmlContent = "";
    if (pageMeta) {
        const filePath = path.join(process.cwd(), "src/content", `${pageMeta.htmlPath}`);
        htmlContent = fs.readFileSync(filePath, "utf8");
    }

    return {
        props: {
            pageData: pageMeta || null,
            htmlContent,
        },
    };
}

export async function getStaticPaths() {
    const paths = metadata.map((data) => ({
        params: { slug: data.path.split("/").filter(Boolean) },
    }));

    return {
        paths,
        fallback: false,
    };
}
