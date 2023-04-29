import { promises } from 'dns';
import type { NextApiRequest, NextApiResponse } from 'next';

import { fetcher } from '@/utils/fetcher';

const { Configuration, OpenAIApi } = require('openai');

const reverse_proxy_key = 'pk-XCAyxZmgtmXhqauHXNkpECtsIxkbPzFprPJiPigiXhpOPTHp';
const reverse_proxy_base = 'https://api.pawan.krd/v1';

const configuration = new Configuration({
    apiKey: reverse_proxy_key,
    basePath: reverse_proxy_base,
});

const openai = new OpenAIApi(configuration);

const TRANSCRIPTION_API_ENDPOINT = process.env.TRANSCRIPTION_API_ENDPOINT;

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        if (req.query.id) {
            const target_url = `${TRANSCRIPTION_API_ENDPOINT}/transcripts/?id=${req.query.id}`;
            fetcher(target_url)
                .then((res) => res)
                .then((data) => res.status(200).json(data))
                .catch((error) => res.status(500).json(error));
            // fetch(target_url)
            //     .then((res) => res)
            //     .catch((error) => res.status(500).json(error))
            //     .then((data) => res.status(200).json(data));
        } else {
            res.status(400).json({ message: 'Video ID not provided' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}

// function fetcher(url) {
//     fetch(url).then((res) => {
//         if (res.ok) {
//             return res.json();
//         } else {
//             throw {
//                 status: `${res.status} ${res.statusText}`,
//                 message: res.json(),
//             };
//         }
//     });
// }
