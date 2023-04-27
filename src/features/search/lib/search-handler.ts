import { FormEvent, RefObject } from 'react';

import { NextRouter } from 'next/router';

import { resetTranscriptStores } from '@/utils/reset-transcript-stores';

export default function searchHandler(
    event: FormEvent,
    videoLink: RefObject<HTMLInputElement>,
    router: NextRouter,
) {
    resetTranscriptStores();

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
