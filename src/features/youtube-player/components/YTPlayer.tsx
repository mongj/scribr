import { useYTPlayerStore } from '@/features/youtube-player/store/yt-player';
import { UpdateMarkerIfPlaying } from '@transcription/lib/update-marker';
import YouTube, { YouTubeProps } from 'react-youtube';

let isSyncIntervalSet: Boolean = false;

function YTPlayer({ id, height, width }) {
    const onPlayerReady: YouTubeProps['onReady'] = (event) => {
        useYTPlayerStore.setState({ player: event.target });
        if (!isSyncIntervalSet) {
            setInterval(UpdateMarkerIfPlaying, 100);
            isSyncIntervalSet = true;
        }
    };

    const opts: YouTubeProps['opts'] = {
        height: height,
        width: width,
        playerVars: {
            autoplay: 1,
            modestbranding: 1,
            rel: 0,
        },
    };

    return <YouTube videoId={id} opts={opts} onReady={onPlayerReady} />;
}

export default YTPlayer;
