import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Link from "@mui/material/Link";
import { useRouter } from 'next/router'

interface SubPostListProps {
    subPosts?: { name: string; path: string; }[];
}

const SubPostList: React.FC<SubPostListProps> = ({ subPosts }) => {
    const router = useRouter()

    return (
        <Box className="side-panel" sx={{marginRight: "15px"}}>
            {subPosts && (
                <>
                    <Typography variant="h6" sx={{fontWeight: "bold", marginBottom: "10px"}}>Ver também</Typography>
                    <List>
                        {subPosts.map((subPost, index) => (
                            <ListItem disablePadding key={subPost.name} sx={{}}>
                                <Link href={`${router.pathname}${subPost.path}`}>{subPost.name}</Link>
                            </ListItem>
                        ))}
                    </List>
                </>
            )}
        </Box>
    );
};

export default SubPostList;
