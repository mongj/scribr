import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';

import '@/styles/globals.css';

export const metadata = {
    title: 'Scibr',
    description: 'AI YouTube Assistant',
};

export default function App({ Component, pageProps }: AppProps) {
    return (
        <ChakraProvider>
            <Component {...pageProps} />
        </ChakraProvider>
    );
}
