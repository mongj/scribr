import { Button } from '@chakra-ui/react';
import Navbar from '@components/layouts/Navbar';
import SearchBar from '@search/components/SearchBar';
import { Inter } from 'next/font/google';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { getRandomVideoID } from '@/utils/get-random-video';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
    const router = useRouter();

    return (
        <div className="flex flex-col min-h-screen max-h-screen overflow-hidden bg-gradient-to-br from-slate-50 from-60% via-ytred/5 via-80% to-ytred/10 to-90%">
            <Head>
                <title>Scribr: The AI YouTube Assistant</title>
            </Head>
            <header className="flex-none bg-slate-50">
                <Navbar showSearchBar={false} />
            </header>
            <main className="flex flex-1 flex-col p-8 font-sans items-center justify-center w-full">
                <div className="flex flex-col items-center justify-center">
                    <div className="flex flex-col items-center w-full max-w-xl">
                        <div
                            className={`${inter.className} bg-gradient-to-br from-black to-stone-500 bg-clip-text text-transparent font-bold text-center leading-tight drop-shadow-sm`}
                        >
                            <p className="text-5xl sm:text-6xl mb-2 sm:mb-3">Supercharge</p>
                            <p className="text-4xl sm:text-6xl mt-2 sm:mb-3">YouTube Videos</p>
                        </div>
                        <div className="text-slate-500 text-lg sm: text-base text-center mt-6 mb-6">
                            AI-powered transcription, summarisation, and generative Q&A
                        </div>
                        <SearchBar />
                        <div className="mb-6 mt-6">
                            <Button
                                border="1px"
                                borderColor="gray.200"
                                background="#f8fafc"
                                _hover={{ background: '#f1f5f9' }}
                                onClick={() => {
                                    router.push({
                                        pathname: '/video',
                                        query: { id: getRandomVideoID() },
                                    });
                                }}
                            >
                                <span
                                    className={`${inter.className} font-normal text-sm text-slate-500`}
                                >
                                    {'Surprise me'}
                                </span>
                            </Button>
                        </div>
                        <div className="pt-24"></div>
                    </div>
                </div>
            </main>
            <div
                className={`${inter.className} flex justify-center bg-transparent pb-4 text-sm text-slate-500`}
            >
                <span>
                    Made with ❤️ by <a href="https://github.com/mongj">mongj</a>
                </span>
            </div>
        </div>
    );
}
