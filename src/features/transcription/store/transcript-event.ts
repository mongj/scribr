import { create } from 'zustand';

interface TranscriptEventState {
    isScrolling: boolean;
    isWheeling: boolean;
    isMouseDown: boolean;
    isKeyDown: boolean;
    isTouchStart: boolean;
    autoscroll: boolean;
}

interface TranscriptEventActions {
    updateScrolling: (status: boolean) => void;
    updateWheeling: (status: boolean) => void;
    updateMouseDown: (status: boolean) => void;
    updateKeyDown: (status: boolean) => void;
    updateTouchStart: (status: boolean) => void;
    updateAutoscroll: (status: boolean) => void;
    reset: () => void;
}

const initialState: TranscriptEventState = {
    isScrolling: false,
    isWheeling: false,
    isMouseDown: false,
    isKeyDown: false,
    isTouchStart: false,
    autoscroll: true,
};

export const useTranscriptEventStore = create<
    TranscriptEventState & TranscriptEventActions
>()((set) => ({
    ...initialState,

    updateScrolling: (status) => set({ isScrolling: status }),
    updateWheeling: (status) => set({ isWheeling: status }),
    updateMouseDown: (status) => set({ isMouseDown: status }),
    updateKeyDown: (status) => set({ isKeyDown: status }),
    updateTouchStart: (status) => set({ isTouchStart: status }),
    updateAutoscroll: (status) => set({ autoscroll: status }),
    reset: () => set(initialState),
}));
