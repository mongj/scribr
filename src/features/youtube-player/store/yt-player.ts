import { YouTubePlayer } from 'youtube-player/dist/types';
import { create } from 'zustand';

interface YTPlayerState {
    player: YouTubePlayer;
}

export const useYTPlayerStore = create<YTPlayerState>()(() => ({
    player: undefined,
}));
