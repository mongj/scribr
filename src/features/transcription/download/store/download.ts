import { useTranscriptStore } from '@transcription/store/transcript';
import { create } from 'zustand';

interface TranscriptDownloadState {
    targetLanguage: string;
    targetLanguageCode: string;
    fileType: string;
}

interface TranscriptDownloadActions {
    reset: () => void;
    initialize: () => void;
}

const initialState: TranscriptDownloadState = {
    targetLanguage: '',
    targetLanguageCode: '',
    fileType: 'Text',
};

export const useTranscriptDownloadStore = create<
    TranscriptDownloadState & TranscriptDownloadActions
>()((set) => ({
    ...initialState,

    reset: () => {
        set(initialState);
    },

    initialize: () => {
        set({
            targetLanguage: useTranscriptStore.getState().targetLanguage,
            targetLanguageCode:
                useTranscriptStore.getState().targetLanguageCode,
        });
    },
}));
