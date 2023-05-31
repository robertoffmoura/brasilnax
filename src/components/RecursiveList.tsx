import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { useRouter } from "next/router";
import { PagesProps } from "../misc/types";

const RecursiveList = ({ pages, currentPath, openSubMenu, handleDrawerClose }: any) => {
    const router = useRouter();

    const handleItemClick = (page: PagesProps, index: number) => {
        if (index === 0) {
            handleDrawerClose();
            if (currentPath == "") {
                router.push("/")
                return;
            }
            router.push(currentPath);
        } else if (page.showMenu !== false && page.subPages && page.subPages.length > 0) {
            openSubMenu(page, currentPath + page.path);
        } else {
            handleDrawerClose();
            router.push(currentPath + page.path);
        }
    };

    return (
        <List>
            {pages.map((page: PagesProps, index: number) => (
                <ListItemButton key={page.name} onClick={() => handleItemClick(page, index)}>
                    <ListItemText primary={page.name} />
                    {page.showMenu !== false && page.subPages && page.subPages.length > 0 && <ArrowRightIcon />}
                </ListItemButton>
            ))}
        </List>
    );
};

export default RecursiveList;
