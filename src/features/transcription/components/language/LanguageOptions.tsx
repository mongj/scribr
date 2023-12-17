import SkeletonList from '@components/ui/SkeletonList';

import { useTranscriptStore } from '../../store/transcript';

export default function LanguageOptions() {
    const targetLanguage = useTranscriptStore((state) => state.targetLanguage);
    const availableLanguages = useTranscriptStore(
        (state) => state.availableLanguages,
    );

    if (availableLanguages.length > 0) {
        const languageList = availableLanguages.map((transcript) => {
            return (
                <a
                    key={transcript.language}
                    onClick={() => {
                        useTranscriptStore.setState({
                            targetLanguage: transcript.language,
                        });
                        useTranscriptStore.setState({
                            targetLanguageCode: transcript.languageCode,
                        });
                    }}
                    className={`px-4 hover:bg-slate-100 ${
                        targetLanguage == transcript.language
                            ? 'font-semibold'
                            : null
                    } hover:font-semibold`}
                    role="button"
                    data-lang={transcript.languageCode}
                >
                    {transcript.language}
                </a>
            );
        });

        return (
            <div className="flex flex-col max-h-[50vh] overflow-auto">
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
