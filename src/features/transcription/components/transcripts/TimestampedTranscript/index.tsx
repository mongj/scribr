import { useYTPlayerStore } from '@/features/youtube-player/store/yt-player';
import { fetcher } from '@/utils/fetcher';
import SkeletonList from '@components/ui/SkeletonList';
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
            <div
                className={`${inter.className}`}
            >{`Sorry... Something went wrong: ${promiseContent}.`}</div>
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
                        className="marker rounded-md px-4 hover:bg-slate-100 hover:text-gray-800 hover:font-semibold"
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
            <div className="w-full">
                <div
                    className={`${inter.className} flex flex-grow flex-col pb-4`}
                >
                    {transcript}
                </div>
                <div className="sticky bottom-0 h-10 bg-gradient-to-b from-transparent from-20% to-white to-60%"></div>
            </div>
        );
    }
    return null;
}
