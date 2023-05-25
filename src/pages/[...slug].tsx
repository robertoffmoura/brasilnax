import path from "path";
import fs from "fs";
import Post from "../modules/Post";
import PostList from "../modules/PostList";
import { MetaDataProps, PagesProps } from "../misc/types";
import Banner from "../components/Banner";

interface StaticPropsContext {
    params: {
        slug: string[];
    };
}

export default function Page({ pageData, markdown, pageType, pageMetadata }: any) {
    if (!pageData) return <div>No Page Found</div>;

    let ContentComponent;
    switch (pageType) {
        case "post":
            ContentComponent = Post;
            break;
        case "post-list":
            ContentComponent = PostList;
            break;
        default:
            ContentComponent = null;
            break;
    }

    return (
        <>
            <Banner title={pageData.name} />
            {ContentComponent && <ContentComponent metadata={pageMetadata} markdown={markdown} />}
        </>
    );
}

export async function getStaticProps({ params }: StaticPropsContext) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const pagesJson: PagesProps[] = require("../content/pages.json"); // Import pages.json

    let pageType: string | undefined;
    let markdown = "";
    let pageMetadata: MetaDataProps | null = null;

    // Find the page type for the current path in pages.json
    const pageInJson = findPageInJson(pagesJson, params.slug);
    if (pageInJson) {
        pageType = pageInJson.type;

        // Load metadata
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const metadataJson: Record<string, MetaDataProps> = require("../content/metadata.json");
        pageMetadata = metadataJson[pageInJson.id];

        if (pageMetadata) {
            const filePath = path.join(process.cwd(), "src/content", pageMetadata.path);
            markdown = fs.readFileSync(filePath, "utf8");

            if (pageMetadata.subPosts && pageInJson.subPages) {
                const subPages = pageInJson.subPages.map((subPage) => ({ path: subPage.path, name: subPage.name }));
                pageMetadata.subPostList = subPages;
            }
        }
    }

    return {
        props: {
            pageData: pageInJson || null,
            markdown,
            pageType,
            pageMetadata,
        },
    };
}

export async function getStaticPaths() {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const pagesJson: PagesProps[] = require("../content/pages.json");
    const paths = generatePathsFromPages(pagesJson);
    return {
        paths,
        fallback: false,
    };
}

function generatePathsFromPages(pages: PagesProps[], currentPath: string[] = []): { params: { slug: string[] } }[] {
    let paths: any[] = [];

    for (const page of pages) {
        const newPath = [...currentPath, page.path.replace(/^\//, "")];
        if (newPath.length > 1 || (newPath.length === 1 && newPath[0] !== "")) {
            paths.push({
                params: { slug: newPath },
            });
        }

        if (page.subPages) {
            paths = [...paths, ...generatePathsFromPages(page.subPages, newPath)];
        }
    }

    return paths;
}

function findPageInJson(pages: PagesProps[], pathArray: string[]): PagesProps | null {
    if (!pages || !pathArray.length) return null;

    for (const page of pages) {
        if (page.path === `/${pathArray[0]}`) {
            if (pathArray.length === 1) {
                return page;
            } else {
                return findPageInJson(page.subPages || [], pathArray.slice(1));
            }
        }
    }
    return null;
}
