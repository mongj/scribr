import { getRandomVideoID } from '@/utils/get-random-video';
import { resetTranscriptStores } from '@/utils/reset-transcript-stores';
import { Button } from '@chakra-ui/react';
import Navbar from '@components/layouts/Navbar';
import SearchBar from '@search/components/SearchBar';
import { Inter } from 'next/font/google';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
    const router = useRouter();

    return (
        <div className="flex flex-col h-screen overflow-hidden bg-gradient-to-br from-slate-50 from-60% via-ytred/5 via-80% to-ytred/10 to-90%">
            <Head>
                <title>Scribr: Transcribe Youtube for Free</title>
                <meta
                    name="description"
                    content="Transcribe Youtube videos and download transcripts for free. Supports text, JSON, SRT, WebVTT."
                    key="desc"
                />
                <meta property="og:title" content="Scribr" />
                <meta
                    property="og:description"
                    content="Transcribe Youtube videos and download transcripts for free. Supports text, JSON, SRT, WebVTT."
                />
                <meta property="og:type" content="website" />
                <meta
                    property="og:image"
                    content="https://scribr.vercel.app/og.png"
                />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta property="og:url" content="https://scribr.vercel.app/" />
            </Head>
            <header className="flex-none bg-slate-50">
                <Navbar showSearchBar={false} />
            </header>
            <main className="flex flex-1 flex-col font-sans items-center justify-center w-full">
                <div className="flex flex-col items-center w-full max-w-lg sm:max-w-xl mb-20 px-6 sm:px-12">
                    <div
                        className={`${inter.className} my-6 flex flex-col gap-2 sm:gap-4 bg-gradient-to-br from-black to-stone-500 bg-clip-text text-transparent font-bold text-center leading-tight drop-shadow-sm`}
                    >
                        <p className="text-5xl xs:text-5xl sm:text-6xl">
                            Transcribe
                        </p>
                        <p className="text-[2rem] leading-[2.5rem] xs:text-5xl sm:text-6xl">
                            YouTube Videos
                        </p>
                    </div>
                    <SearchBar />
                    <div className="my-6">
                        <Button
                            border="1px"
                            borderColor="gray.200"
                            background="#f8fafc"
                            _hover={{ background: '#f1f5f9' }}
                            onClick={() => {
                                resetTranscriptStores();
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
                </div>
            </main>
            <div
                className={`${inter.className} flex flex-col gap-2 place-items-center justify-center bg-transparent pb-4 text-sm text-slate-500`}
            >
                <span>
                    Made with ❤️ by{' '}
                    <Link
                        href="https://github.com/mongj"
                        className="hover:underline underline-offset-2"
                    >
                        mongj
                    </Link>
                </span>
            </div>
        </div>
    );
}
