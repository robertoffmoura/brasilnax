import React, { useState, useRef } from "react";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import Popper from "@mui/material/Popper";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/router";
import { PagesProps } from "../misc/types";

interface NestedMenuProps {
    page: PagesProps;
    depth?: number;
    onOpenChange?: (open: boolean) => void;
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
const NestedMenu: React.FC<NestedMenuProps> = ({ page, depth = 0, onOpenChange = () => {} }) => {
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const router = useRouter();
    const anchorRef = useRef<HTMLButtonElement>(null);

    const { name, showMenu, subPages } = page;

    const handleRedirect = (path: string) => {
        router.push(path);
    };

    const handleMouseOver = () => {
        setOpen(true);
        onOpenChange(true);
    };

    const handleMouseLeave = () => {
        setOpen(false);
        onOpenChange(false);
    };

    function handleListKeyDown(event: React.KeyboardEvent) {
        if (event.key === "Tab") {
            event.preventDefault();
            setOpen(false);
        }
    }

    return (
        <div onMouseEnter={handleMouseOver} onMouseLeave={handleMouseLeave}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Button ref={anchorRef} sx={{ flex: "1", "&:hover": { backgroundColor: theme.palette.primary.dark } }}>
                    <MenuItem
                        onClick={() => handleRedirect(page.path)}
                        onKeyDown={handleListKeyDown}
                        sx={{ "&:hover": { backgroundColor: "transparent" }, fontSize: "0.9em" }}
                    >
                        {name}
                    </MenuItem>
                </Button>
            </div>
            {showMenu !== false && (
                <Popper
                    open={open}
                    anchorEl={anchorRef.current}
                    placement={depth === 0 ? "bottom-start" : "right-start"}
                    transition
                    disablePortal
                >
                    {({ TransitionProps }) => (
                        <Fade {...TransitionProps} timeout={350}>
                            <Paper
                                sx={{
                                    backgroundColor: theme.palette.primary.light,
                                }}
                            >
                                {subPages?.map((subPage, index) => (
                                    <NestedMenu
                                        key={index}
                                        page={{ ...subPage, path: `${page.path}${subPage.path}` }}
                                        depth={depth + 1}
                                        onOpenChange={setOpen}
                                    />
                                ))}
                            </Paper>
                        </Fade>
                    )}
                </Popper>
            )}
        </div>
    );
};

export default NestedMenu;
