import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import NestedMenu from "../components/NestedMenu";
import { useTheme } from "@mui/material/styles";
import { PagesProps } from "../misc/types";

interface NavigationBarProps {
    pages: PagesProps[];
}

const NavigationBar: React.FC<NavigationBarProps> = ({ pages }) => {
    const theme = useTheme();
    return (
        <Box sx={{ width: "100%", backgroundColor: theme.palette.primary.light, right: 0, position: "fixed", zIndex: 1000 }}>
            <Box sx={{ maxWidth: "1100px", width: "100%", margin: "0 auto", boxSizing: "border-box" }}>
                <AppBar elevation={0} position="static" sx={{ backgroundColor: "transparent" }}>
                    <Toolbar variant="dense">
                        {pages.map((page, index) => (
                            <NestedMenu key={index} page={page} />
                        ))}
                    </Toolbar>
                </AppBar>
            </Box>
        </Box>
    );
};

export default NavigationBar;