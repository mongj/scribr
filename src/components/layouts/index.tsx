import Head from 'next/head';

import Navbar from './Navbar';

export default function Layout({ children }) {
    return (
        <div className="flex flex-col w-full">
            <div className="flex flex-col h-screen w-full overflow-hidden">
                <Head>
                    <title>Scribr: Transcribe Youtube for Free</title>
                </Head>
                <header className="flex-none bg-white">
                    <Navbar showSearchBar={true} />
                </header>
                {children}
            </div>
        </div>
    );
}
