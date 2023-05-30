import MarkdownParser from "../components/MarkdownParser";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import SubPostList from "../components/SubPostList";
import AuthorList from "../components/AuthorList";
import { MetaDataProps } from "../misc/types";

interface PostInterface {
    metadata: MetaDataProps;
    markdown: string;
}

const Post: React.FC<PostInterface> = ({ metadata, markdown }) => {
    const { title, name, date, promotion, expertise, authors, subPostList } = metadata;
    const hasAny = name || promotion || expertise;

    return (
        <Container sx={{ display: "flex" }}>
            <SubPostList subPosts={subPostList}></SubPostList>
            <Box className="post-main-content">
                {title && <Typography variant="h2">{title}</Typography>}
                {date && <Typography variant="body2">{date}</Typography>}
                {hasAny && (
                    <>
                        <Box marginTop="10px">
                            {name && (
                                <Typography variant="body1">
                                    <strong>Nome:</strong> {name}
                                </Typography>
                            )}
                            {promotion && (
                                <Typography variant="body1">
                                    <strong>Promoção:</strong>
                                    {promotion}
                                </Typography>
                            )}
                            {expertise && (
                                <Typography variant="body1">
                                    <strong>Área de atuação:</strong>
                                    {expertise}
                                </Typography>
                            )}
                        </Box>
                        <Divider sx={{margin: "10px 0px"}} />
                    </>
                )}
                <MarkdownParser markdown={markdown} />
            </Box>
            <AuthorList authors={authors}></AuthorList>
        </Container>
    );
};

export default Post;
