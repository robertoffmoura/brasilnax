import React from "react";
import MenuList from "@mui/material/MenuList";
import Popper from "@mui/material/Popper";
import Paper from "@mui/material/Paper";

interface SubMenuProps {
    open: boolean;
    anchorRef: React.RefObject<HTMLButtonElement>;
    handleListKeyDown: (event: React.KeyboardEvent) => void;
    handleClose: (event: Event) => void;
    children: React.ReactNode;
}

const SubMenu: React.FC<SubMenuProps> = ({ open, anchorRef, handleListKeyDown, handleClose, children }) => {
    return (
        <Popper open={open} anchorEl={anchorRef.current} placement="right-start" transition>
            <Paper>
                <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                    {children}
                </MenuList>
            </Paper>
        </Popper>
    );
};
export default SubMenu;
