import { useYTPlayerStore } from '@/features/youtube-player/store/yt-player';

import styles from '../components/transcripts/TimestampedTranscript/index.module.css';
import { useTranscriptEventStore } from '../store/transcript-event';

let currentPlayerTime: number;

function UpdateMarkerIfPlaying() {
    // Only calls the UpdateMarker function if the video is currently playing
    if (useYTPlayerStore.getState().player.getPlayerState() == 1) {
        UpdateMarker();
    }
}

function UpdateMarker() {
    currentPlayerTime = useYTPlayerStore.getState().player.getCurrentTime();

    const transcriptArray = Array.from(
        document.getElementsByClassName('marker'),
    );

    transcriptArray.forEach((element: Element) => {
        const segmentStart = Number(element.getAttribute('data-start'));
        const segmentEnd = Number(element.getAttribute('data-end'));

        if (
            currentPlayerTime >= segmentStart &&
            currentPlayerTime <= segmentEnd
        ) {
            element.classList.add('marker-focus');
            element.classList.add(styles['marker-current']);
            element.classList.remove(styles['marker-previous']);
            element.classList.remove(styles['marker-next']);
        } else if (currentPlayerTime > segmentEnd) {
            element.classList.remove('marker-focus');
            element.classList.remove(styles['marker-current']);
            element.classList.add(styles['marker-previous']);
            element.classList.remove(styles['marker-next']);
        } else {
            element.classList.remove('marker-focus');
            element.classList.remove(styles['marker-current']);
            element.classList.remove(styles['marker-previous']);
            element.classList.add(styles['marker-next']);
        }
    });

    const currentMarkers = Array.from(
        document.getElementsByClassName('marker-focus'),
    );

    if (
        useTranscriptEventStore.getState().autoscroll &&
        !useTranscriptEventStore.getState().isScrolling
    ) {
        console.log(`scrolling marker ${currentMarkers[0]}`);
        currentMarkers[0].scrollIntoView({ block: 'center' });
    }
}

export { UpdateMarker, UpdateMarkerIfPlaying };
