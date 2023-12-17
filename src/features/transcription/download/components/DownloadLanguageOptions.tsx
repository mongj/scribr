import { useOutsideClick } from '@chakra-ui/react';
import SkeletonList from '@components/ui/SkeletonList';
import { useTranscriptStore } from '@transcription/store/transcript';
import { useRef, useState } from 'react';

import { useTranscriptDownloadStore } from '../store/download';

export default function DownloadLanguageOptions() {
    const ref = useRef(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    useOutsideClick({
        ref: ref,
        handler: () => setIsModalOpen(false),
    });

    const targetDownloadLanguage = useTranscriptDownloadStore(
        (state) => state.targetLanguage,
    );
    const availableLanguages = useTranscriptStore(
        (state) => state.availableLanguages,
    );

    if (targetDownloadLanguage == '') {
        useTranscriptDownloadStore.getState().initialize();
    }

    if (availableLanguages.length > 0) {
        const languageList = availableLanguages.map((lang) => {
            return (
                <a
                    key={lang.language}
                    onClick={() => {
                        useTranscriptDownloadStore.setState({
                            targetLanguage: lang.language,
                        });
                        useTranscriptDownloadStore.setState({
                            targetLanguageCode: lang.languageCode,
                        });
                    }}
                    className={`px-4 hover:bg-slate-100 ${
                        targetDownloadLanguage == lang.language
                            ? 'font-semibold'
                            : null
                    } hover:font-semibold`}
                    role="button"
                >
                    {lang.language}
                </a>
            );
        });

        return (
            <div className="flex flex-col max-h-[30vh] overflow-auto">
                {languageList}
            </div>
        );
    }
    return (
        <div className="px-2">
            <SkeletonList rowCount={2} isLoading={true} />
        </div>
    );
}
