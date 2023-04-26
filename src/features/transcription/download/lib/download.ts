import { useTranscriptDownloadStore } from '../store/download';

export function DownloadData(id) {
    const TRANSCRIPTION_API_ENDPOINT = process.env.TRANSCRIPTION_API_ENDPOINT;
    const targetLanguageCode = useTranscriptDownloadStore
        .getState()
        .targetLanguageCode.toLowerCase();
    const targetFiletype = useTranscriptDownloadStore.getState().fileType.toLowerCase();

    let fileExt;
    switch (targetFiletype) {
        case 'text':
            fileExt = 'txt';
            break;
        case 'webvtt':
            fileExt = 'vtt';
            break;
        default:
            fileExt = targetFiletype;
    }

    const target_url = `${TRANSCRIPTION_API_ENDPOINT}/transcripts/?id=${id}&lang=${targetLanguageCode}&type=${targetFiletype}`;
    fetch(target_url).then((res) => {
        if (res.ok) {
            res.json().then((data) => {
                const dataBlob = new Blob(
                    [
                        processString(
                            JSON.stringify(data['transcripts'][0]['text'], null, 2),
                            targetFiletype,
                        ),
                    ],
                    { type: 'text/plain' },
                );
                const href = URL.createObjectURL(dataBlob);
                const a = Object.assign(document.createElement('a'), {
                    href,
                    style: 'display: none',
                    download: `transcript_${data['video_id']}.${fileExt}`,
                });
                document.body.appendChild(a);
                a.click();
                a.remove();
                URL.revokeObjectURL(href);
            });
        }
    });
}

function processString(str: string, filetype) {
    if (str[0] == '"' && str[str.length - 1] == '"') {
        str = str.slice(1, -1);
    }
    if (filetype == 'json') {
        str = str.replaceAll('\\n', ' ');
    } else {
        str = str.replaceAll('\\n', '\n');
        str = str.replaceAll('\\"', '"');
    }

    return str;
}
