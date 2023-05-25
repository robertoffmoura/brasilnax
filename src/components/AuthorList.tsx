import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

interface AuthorListProps {
    authors?: string[];
}

const AuthorList: React.FC<AuthorListProps> = ({ authors }) => {
    return (
        <Box className="side-panel" sx={{marginLeft: "15px"}}>
            {authors && (
                <>
                    <Typography variant="h6" sx={{fontWeight: "bold", marginBottom: "10px"}}>Autor(es)</Typography>
                    <List>
                        {authors.map((author, index) => (
                            <ListItem disablePadding key={index}>{author}</ListItem>
                        ))}
                    </List>
                </>
            )}
        </Box>
    );
};

export default AuthorList;
