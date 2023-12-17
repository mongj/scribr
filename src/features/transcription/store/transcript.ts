import { create } from 'zustand';

interface langObj {
    language: string;
    languageCode: string;
}

interface TranscriptState {
    availableLanguages: Array<langObj>;
    targetLanguage: string;
    targetLanguageCode: string;
    videoId: string;
    textTranscript: object;
    timestampedTranscript: object;
}

interface TranscriptActions {
    reset: () => void;
}

const initialState: TranscriptState = {
    availableLanguages: [],
    targetLanguage: '',
    targetLanguageCode: '',
    videoId: '',
    textTranscript: {},
    timestampedTranscript: {},
};

export const useTranscriptStore = create<TranscriptState & TranscriptActions>()(
    (set) => ({
        ...initialState,

        reset: () => set(initialState),
    }),
);
