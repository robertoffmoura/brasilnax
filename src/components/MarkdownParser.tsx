import React from "react";
import ReactMarkdown from "react-markdown";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import YouTubePlayer, { extractYouTubeVideoId } from "./YoutubePlayer";

const components = {
    p: ({ node, ...props }: any) => {
        const children = props.children;
        // Verify if inside there is an Image
        const hasImage = React.Children.toArray(children).some((child) => {
            return React.isValidElement(child) && child.props && child.props.node && child.props.node.tagName === "img";
        });
        // Verify if inside there is a Video
        const hasYouTubeLink = React.Children.toArray(children).some(
            (child) => React.isValidElement(child) && child.props.href && child.props.href.includes("youtube.com")
        );
        if (hasImage || hasYouTubeLink) {
            return <>{children}</>;
        }
        return <Typography {...props} />;
    },
    h1: ({ node, ...props }: any) => <Typography variant="h1" {...props} />,
    h2: ({ node, ...props }: any) => <Typography variant="h2" {...props} />,
    h3: ({ node, ...props }: any) => <Typography variant="h3" {...props} />,
    h4: ({ node, ...props }: any) => <Typography variant="h4" {...props} />,
    h5: ({ node, ...props }: any) => <Typography variant="h5" {...props} />,
    h6: ({ node, ...props }: any) => <Typography variant="h6" {...props} />,
    hr: ({ node, ...props }: any) => <Divider className="markdown-divider" {...props} />,
    img: ({ src, alt, ...props }: any) => {
        const imagePath = "/images/" + src;
        return (
            <Box className="markdown-image-wrapper">
                <Box component="img" className="markdown-image" src={imagePath} alt={alt} {...props} />
            </Box>
        );
    },
    a: ({ href, children }: any) => {
        if (href.includes("youtube.com")) {
            const videoId = extractYouTubeVideoId(href);
            if (videoId) {
                return <YouTubePlayer videoId={videoId} />;
            }
        }
        return (
            <Link className="markdown-link" href={href}>
                {children}
            </Link>
        );
    },
    blockquote: ({ ...props }: any) => {
        const children = props.children;
        return <blockquote className="markdown-blockquote">{children}</blockquote>;
    },
    ul: ({ node, ...props }: any) => <List sx={{ listStyleType: "disc", pl: 4 }} className="markdown-list">{props.children}</List>,
    li: ({ node, ...props }: any) => <ListItem sx={{ display: "list-item" }} className="markdown-list-item">{props.children}</ListItem>,
};

interface MarkdownParserProps {
    markdown: any;
}

const MarkdownParser: React.FC<MarkdownParserProps> = ({ markdown }) => {
    return <ReactMarkdown className="markdown-content" children={markdown} components={components} />;
};

export default MarkdownParser;
