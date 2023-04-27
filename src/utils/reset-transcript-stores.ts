import { useTranscriptDownloadStore } from '@transcription/download/store/download';
import { useTranscriptStore } from '@transcription/store/transcript';
import { useTranscriptEventStore } from '@transcription/store/transcript-event';

export function resetTranscriptStores() {
    useTranscriptStore.getState().reset();
    useTranscriptDownloadStore.getState().reset();
    useTranscriptEventStore.getState().reset();
}
