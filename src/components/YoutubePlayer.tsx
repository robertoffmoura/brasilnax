import Box from "@mui/material/Box";

export const extractYouTubeVideoId = (url: string) => {
    const match = url.match(
        /(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?/]+)/i
    );
    console.log(match && match[1]);
    return match && match[1];
};

interface YouTubePlayerProps {
    videoId: string;
}

const YouTubePlayer: React.FC<YouTubePlayerProps> = ({ videoId }) => {
    return (
        <Box className="markdown-youtube-wrapper">
            <iframe
                className="markdown-youtube"
                src={`https://www.youtube.com/embed/${videoId}`}
                title="YouTube Video"
                allowFullScreen
            ></iframe>
        </Box>
    );
};

export default YouTubePlayer;
