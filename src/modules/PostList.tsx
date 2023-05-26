import React from "react";
import { MetaDataProps, PagesProps } from "../misc/types";
import { useRouter } from "next/router";
import Container from "@mui/material/Container";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

interface PostListInterface {
    pageData: PagesProps;
}

const PostList: React.FC<PostListInterface> = ({ pageData }) => {
    const router = useRouter();
    const theme = useTheme();
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const metadataJson: Record<string, MetaDataProps> = require("../content/metadata.json");

    const handleRedirect = (path: string) => {
        router.push(path);
    };

    return (
        <Container>
            <Box sx={{maxWidth: "70%", margin: "auto"}}>
            <List sx={{ paddingTop: "0px" }}>
                {pageData.subPages?.map((subPage, index) => {
                    const { name, promotion, expertise, date, title } = metadataJson[subPage.id];
                    const hasAny = name || promotion || expertise;
                    return (
                        <ListItem sx={{ paddingTop: "0px" }} key={index}>
                            <ListItemText sx={{ marginTop: "0px" }}>
                                <Link
                                    component="button"
                                    variant="h2"
                                    color={theme.palette.text.secondary}
                                    underline="none"
                                    style={{ fontStyle: "normal" }}
                                    onClick={() => handleRedirect(`${router.asPath}${subPage.path}`)}
                                >
                                    {title}
                                </Link>
                                {date && <Typography variant="body2">{date}</Typography>}
                                {hasAny && (
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
                                )}
                            </ListItemText>
                        </ListItem>
                    );
                })}
            </List>
            </Box>
        </Container>
    );
};

export default PostList;
