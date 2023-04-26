import { FormEvent, RefObject } from 'react';

import { useTranscriptDownloadStore } from '@transcription/download/store/download';
import { useTranscriptStore } from '@transcription/store/transcript';
import { NextRouter } from 'next/router';

export default function searchHandler(
    event: FormEvent,
    videoLink: RefObject<HTMLInputElement>,
    router: NextRouter,
) {
    useTranscriptStore.getState().reset();
    useTranscriptDownloadStore.getState().reset();
    event.preventDefault();
    const URL = videoLink.current!.value;
    if (URL == '') {
        return;
    }
    const videoID = getVideoID(URL);
    if (videoID) {
        router.push({
            pathname: '/video',
            query: { id: `${videoID}` },
        });
    } else {
        router.push('/notfound');
    }
}

function getVideoID(URL: string) {
    const re = /v=([^&]+)/;
    const match = re.exec(URL);
    if (match) {
        return match[1];
    } else {
        return null;
    }
}
