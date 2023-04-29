import type { NextApiRequest, NextApiResponse } from 'next';

const { Configuration, OpenAIApi } = require('openai');

const reverse_proxy_key = 'pk-XCAyxZmgtmXhqauHXNkpECtsIxkbPzFprPJiPigiXhpOPTHp';
const reverse_proxy_base = 'https://api.pawan.krd/v1';

const configuration = new Configuration({
    apiKey: reverse_proxy_key,
    basePath: reverse_proxy_base,
});

const openai = new OpenAIApi(configuration);

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        let formattedReq = req.body;
        console.log(formattedReq);
        formattedReq['prompt'] = req.body['prompt'][0];

        openai.createCompletion(formattedReq).then((response) => {
            const data = response['data'];
            data['id'] = null;
            data['created'] = null;
            res.status(200).json(data);
        });
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
