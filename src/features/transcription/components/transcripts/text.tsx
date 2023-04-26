import { useState } from 'react';

import SkeletonList from '@components/ui/skeleton-list';
import { useTranscriptStore } from '@transcription/store/transcript';
import _ from 'lodash';
import { Inter } from 'next/font/google';
import useSWR from 'swr';

import { fetcher } from '@/utils/fetcher';

const inter = Inter({ subsets: ['latin'] });
const TRANSCRIPTION_API_ENDPOINT = process.env.TRANSCRIPTION_API_ENDPOINT;

export default function TextTranscript(props) {
    const language = useTranscriptStore((state) => state.targetLanguage);
    const target_url = `${TRANSCRIPTION_API_ENDPOINT}/transcripts/?id=${props.id}`;
    const { data, error, isLoading } = useSWR(props.id ? target_url : null, fetcher);
    const [promiseContent, setpromiseContent] = useState('');

    if (isLoading) return <SkeletonList rowCount={25} isLoading={isLoading} />;

    if (error) {
        error.message.then((value) => {
            setpromiseContent(value['message']);
        });
        return <div className={`${inter.className}`}>{`Sorry... ${promiseContent}.`}</div>;
    }

    if (data) {
        useTranscriptStore.setState({ textTranscript: data });

        let targetTranscriptIndex;

        const targetLanguage = language != '' ? language.toLowerCase() : 'english';
        const re = new RegExp(
            `^(${targetLanguage.replaceAll('(', '\\(').replaceAll(')', '\\)')})`,
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
            targetLanguage: data['transcripts'][targetTranscriptIndex ?? 0].language,
        });

        useTranscriptStore.setState({
            targetLanguageCode: data['transcripts'][targetTranscriptIndex ?? 0].languageCode,
        });

        return (
            <div className={`${inter.className} px-4 pb-4 text-justify`}>
                {data['transcripts'][targetTranscriptIndex ?? 0]['text']}
            </div>
        );
    }
    return null;
}
