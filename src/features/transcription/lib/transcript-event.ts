import { useTranscriptEventStore } from '@transcription/store/transcript-event';

const userScrollKeys = ['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', 'Space'];

let lastWheelTime: number = 0;
let lastScrollTime: number = 0;
let CheckWheelInterval: NodeJS.Timer;
let CheckScrollInterval: NodeJS.Timer;

function ScrollHandler() {
    lastScrollTime = Date.now();

    if (!useTranscriptEventStore.getState().isScrolling) {
        useTranscriptEventStore.setState({ isScrolling: true });
        if (
            useTranscriptEventStore.getState().isMouseDown == true ||
            useTranscriptEventStore.getState().isKeyDown == true ||
            useTranscriptEventStore.getState().isWheeling == true
        ) {
            useTranscriptEventStore.setState({ autoscroll: false });
        }
        CheckScrollInterval = setInterval(CheckIfScrolling, 100);
    }
}

function CheckIfScrolling() {
    if (Date.now() - lastScrollTime >= 50) {
        useTranscriptEventStore.setState({ isScrolling: false });
        clearInterval(CheckScrollInterval);
    }
}

function WheelHandler() {
    lastWheelTime = Date.now();

    if (!useTranscriptEventStore.getState().isWheeling) {
        useTranscriptEventStore.setState({ isWheeling: true });
        CheckWheelInterval = setInterval(CheckIfWheeling, 100);
    }
}

function CheckIfWheeling() {
    if (Date.now() - lastWheelTime >= 50) {
        useTranscriptEventStore.setState({ isWheeling: false });
        clearInterval(CheckWheelInterval);
    }
}

function MouseDownHandler() {
    useTranscriptEventStore.setState({ isMouseDown: true });
}

function MouseUpHandler() {
    useTranscriptEventStore.setState({ isMouseDown: false });
}

function KeyDownHandler(event) {
    if (userScrollKeys.includes(event.code)) {
        useTranscriptEventStore.setState({ isKeyDown: true });
    }
}

function KeyUpHandler(event) {
    if (userScrollKeys.includes(event.code)) {
        useTranscriptEventStore.setState({ isKeyDown: false });
    }
}

const transcriptEventHandlers = {
    ScrollHandler,
    MouseDownHandler,
    MouseUpHandler,
    KeyDownHandler,
    KeyUpHandler,
    WheelHandler,
};

export default transcriptEventHandlers;
