import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface BannerProps {
    title: string;
}

const Banner: React.FC<BannerProps> = ({ title }) => {
    return (
        <Box className="page">
            <Box className="banner">
                <Box className="banner-wrapper">
                    <Box component="img" className="banner-image" src="/images/bicorne.jpg" alt="Banner Image" />
                </Box>

                <Box className="banner-content">
                    <Box component="img" src="/images/logo.png" className="page-image" />
                    <Box className="separator" />
                    <Typography variant="h1" className="title">{title}</Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default Banner;
