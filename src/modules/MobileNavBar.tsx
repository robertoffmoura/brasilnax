import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useTheme } from "@mui/material/styles";
import { PagesProps } from "../misc/types";
import RecursiveList from "../components/RecursiveList";

interface MobileNavbarProps {
    pages: PagesProps[];
}

const MobileNavbar: React.FC<MobileNavbarProps> = ({ pages }) => {
    const [open, setOpen] = useState(false);
    const [menuStack, setMenuStack] = useState([{ pages: pages, currentPath: "" }]);
    const theme = useTheme();

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
        setMenuStack([{ pages: pages, currentPath: "" }]);
    };

    const openSubMenu = (page: PagesProps, currentPath: string) => {
        if (page.subPages) {
            const currentPage = { ...page, subPages: [] };
            const newPages = [currentPage, ...page.subPages];
            setMenuStack((prevMenuStack) => [...prevMenuStack, { pages: newPages, currentPath: currentPath }]);
        } else {
            handleDrawerClose();
        }
    };

    const goBack = () => {
        if (menuStack.length > 1) {
            setMenuStack((prevMenuStack) => prevMenuStack.slice(0, prevMenuStack.length - 1));
        } else {
            handleDrawerClose();
        }
    };

    return (
        <div>
            <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={() => handleDrawerOpen()}
            >
                <MenuIcon />
            </IconButton>
            <Drawer anchor="right" open={open} onClose={() => handleDrawerClose()}>
                <div>
                    <IconButton onClick={() => goBack()}>
                        {theme.direction === "rtl" ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </div>
                <RecursiveList
                    pages={menuStack[menuStack.length - 1].pages}
                    currentPath={menuStack[menuStack.length - 1].currentPath}
                    handleDrawerClose={handleDrawerClose}
                    openSubMenu={openSubMenu}
                />
            </Drawer>
        </div>
    );
};

export default MobileNavbar;
