import { create } from 'zustand';

interface TranscriptEventState {
    isScrolling: boolean;
    isWheeling: boolean;
    isMouseDown: boolean;
    isKeyDown: boolean;
    autoscroll: boolean;
    updateScrolling: (status: boolean) => void;
    updateWheeling: (status: boolean) => void;
    updateMouseDown: (status: boolean) => void;
    updateKeyDown: (status: boolean) => void;
    updateAutoscroll: (status: boolean) => void;
}

export const useTranscriptEventStore = create<TranscriptEventState>()((set) => ({
    isScrolling: false,
    isWheeling: false,
    isMouseDown: false,
    isKeyDown: false,
    autoscroll: true,
    updateScrolling: (status) => set({ isScrolling: status }),
    updateWheeling: (status) => set({ isWheeling: status }),
    updateMouseDown: (status) => set({ isMouseDown: status }),
    updateKeyDown: (status) => set({ isKeyDown: status }),
    updateAutoscroll: (status) => set({ autoscroll: status }),
}));
