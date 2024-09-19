import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';

const VideoStreaming = ({ initialStreamUrl }) => {
    const [streamUrl, setStreamUrl] = useState(initialStreamUrl);

    //Remove this entire useEffect on implementation, we get the streamUrl through the props:
    useEffect(() => {
        // Simulate fetching a stream URL from an API
        const fetchStreamUrl = async () => {
        // This is just a placeholder. Replace it with your actual fetch call
        // For example: const response = await fetch('your-api-endpoint');
        // const data = await response.json();
        // setStreamUrl(data.streamUrl);

        // Simulating a response with a timeout
        setTimeout(() => {
            const simulatedResponseUrl = "https://stream.mux.com/jtWsSvIKOwsShwND2dxoKqOZ8xjgGO3lj67QC1rfYzE.m3u8";
            setStreamUrl(simulatedResponseUrl);
        }, 1000); // Simulate network request delay
        };

        fetchStreamUrl();
    }, []); // Empty dependency array means this effect runs once on mount

    return (
        <div className='player-wrapper' style={{ position: 'relative', paddingTop: '56.25%' /* 16:9 Aspect Ratio */ }}>
        <ReactPlayer
            url={streamUrl}
            width='100%'
            height='100%'
            style={{ position: 'absolute', top: '0', left: '0' }}
            controls={true}
            playing={true}
            light={false}
            pip={true}
            config={{
            file: {
                attributes: {
                crossOrigin: 'anonymous',
                },
            },
            }}
        />
        </div>
    );
};

export default VideoStreaming;