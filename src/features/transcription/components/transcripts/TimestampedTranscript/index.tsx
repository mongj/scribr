import { useYTPlayerStore } from '@/features/youtube-player/store/yt-player';
import { fetcher } from '@/utils/fetcher';
import SkeletonList from '@components/ui/SkeletonList';
import {
    KeyDownHandler,
    KeyUpHandler,
    MouseDownHandler,
    MouseUpHandler,
    ScrollHandler,
    TouchEndHandler,
    TouchStartHandler,
    WheelHandler,
} from '@transcription/lib/transcript-event';
import { UpdateMarker } from '@transcription/lib/update-marker';
import { useTranscriptStore } from '@transcription/store/transcript';
import { useTranscriptEventStore } from '@transcription/store/transcript-event';
import _ from 'lodash';
import { Inter } from 'next/font/google';
import { useState } from 'react';
import useSWR from 'swr';

const inter = Inter({ subsets: ['latin'] });
const TRANSCRIPTION_API_ENDPOINT = process.env.TRANSCRIPTION_API_ENDPOINT;

export default function TimestampedTranscript(props) {
    const language = useTranscriptStore((state) => state.targetLanguage);
    const target_url = `${TRANSCRIPTION_API_ENDPOINT}/transcripts?id=${props.id}&type=json&sfx=1`;
    const { data, error, isLoading } = useSWR(
        props.id ? target_url : null,
        fetcher,
    );
    const [promiseContent, setpromiseContent] = useState('');

    if (error) {
        error.message.then((value) => {
            setpromiseContent(value['message']);
        });
        return (
            <span
                className={`${inter.className} px-6 py-2`}
            >{`Ooops, something went wrong. (Error: ${promiseContent}).`}</span>
        );
    }

    if (isLoading) return <SkeletonList rowCount={25} isLoading={isLoading} />;

    if (data) {
        useTranscriptStore.setState({ timestampedTranscript: data });
        useTranscriptStore.setState({
            availableLanguages: data['transcripts'].map(
                ({ language, languageCode }) => ({
                    language,
                    languageCode,
                }),
            ),
        });

        let targetTranscriptIndex;

        const targetLanguage =
            language != '' ? language.toLowerCase() : 'english';
        const re = new RegExp(
            `^(${targetLanguage
                .replaceAll('(', '\\(')
                .replaceAll(')', '\\)')})`,
            'g',
        );

        const transcriptCount = data['transcripts'].length;

        for (let i = 0; i < transcriptCount; i++) {
            if (re.test(data['transcripts'][i].language.toLowerCase())) {
                targetTranscriptIndex = i;
                break;
            }
        }

        useTranscriptStore.setState({
            targetLanguage:
                data['transcripts'][targetTranscriptIndex ?? 0].language,
        });

        useTranscriptStore.setState({
            targetLanguageCode:
                data['transcripts'][targetTranscriptIndex ?? 0].languageCode,
        });

        const timestampedTranscriptList =
            data['transcripts'][targetTranscriptIndex ?? 0]['text'];
        const transcript = timestampedTranscriptList.map(
            (transcriptSegment) => {
                return (
                    <a
                        className="marker rounded-md px-2 hover:bg-slate-100 hover:text-gray-800 hover:font-semibold text-sm xs:text-base"
                        key={transcriptSegment.start}
                        data-start={transcriptSegment.start}
                        data-end={
                            transcriptSegment.start + transcriptSegment.duration
                        }
                        role="button"
                        onClick={() => {
                            useYTPlayerStore
                                .getState()
                                .player.seekTo(transcriptSegment.start);
                            UpdateMarker();
                            useTranscriptEventStore.setState({
                                autoscroll: true,
                            });
                        }}
                    >
                        {transcriptSegment.text}
                    </a>
                );
            },
        );

        return (
            <div
                className="w-full overflow-auto scroll-smooth"
                onScroll={ScrollHandler}
                onWheel={WheelHandler}
                onMouseDown={MouseDownHandler}
                onMouseUp={MouseUpHandler}
                onKeyDown={KeyDownHandler}
                onKeyUp={KeyUpHandler}
                onTouchStart={TouchStartHandler}
                onTouchEnd={TouchEndHandler}
            >
                <div className={`${inter.className} flex flex-col p-4 my-4`}>
                    {transcript}
                </div>
                <div className="absolute top-0 w-full h-10 bg-gradient-to-t from-transparent from-20% to-white to-80% z-10" />
                <div className="absolute bottom-0 w-full h-10 bg-gradient-to-b from-transparent from-20% to-white to-80% z-10" />
            </div>
        );
    }
    return null;
}
