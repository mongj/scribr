import { Analytics } from '@vercel/analytics/react';
import { Head, Html, Main, NextScript } from 'next/document';

import ChakraProviders from '../providers/chakra';

export default function Document() {
    return (
        <Html lang="en">
            <Head />
            <body>
                <ChakraProviders>
                    <Main />
                    <NextScript />
                    <Analytics />
                </ChakraProviders>
            </body>
        </Html>
    );
}
