const { OpenAI } = require('langchain/llms/openai');

const open_api_key = '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';
const open_api_base = 'https://api.openai.com/v1';

const proxy_base = 'http://localhost:3000/api';

const model = new OpenAI(
    {
        modelName: 'text-ada-001',
        openAIApiKey: open_api_key,
        streaming: false,
    },
    { basePath: open_api_base },
);

// model.call('What would be a good company name a company that makes colorful toys?').then((data) => {
//     console.log(data);
// });

model.generate(['What is 1+1?', 'What is 2+2?']).then((data) => {
    console.log(data);
});
