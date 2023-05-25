import MarkdownParser from "../components/MarkdownParser";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SubPostList from "../components/SubPostList";
import AuthorList from "../components/AuthorList";
import { MetaDataProps } from "../misc/types";

interface PostInterface {
    metadata: MetaDataProps;
    markdown: any;
}

const Post: React.FC<PostInterface> = ({ metadata, markdown }) => {
    const { title, name, date, promotion, expertise, authors, subPostList } = metadata;
    return (
        <>
            <Container sx={{ display: "flex" }}>
                <SubPostList subPosts={subPostList}></SubPostList>
                <Box className="post-main-content">
                    {title && <Typography variant="h2">{title}</Typography>}
                    {date && <Typography variant="body2">{date}</Typography>}
                    {name || promotion || expertise && (
                        <Box>
                            {name && (<Typography variant="body1">{name}</Typography>)}
                            {promotion && (<Typography variant="body1">{promotion}</Typography>)}
                            {expertise && (<Typography variant="body1">{expertise}</Typography>)}
                        </Box>
                    )}
                    <MarkdownParser markdown={markdown} />
                </Box>
                <AuthorList authors={authors}></AuthorList>
            </Container>
        </>
    );
};

export default Post;
