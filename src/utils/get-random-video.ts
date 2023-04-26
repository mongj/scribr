import data from '@/data/videos.json';

export function getRandomVideoID() {
    return data[Math.floor(Math.random() * data.length)];
}
