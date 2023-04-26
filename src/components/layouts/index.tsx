import Head from 'next/head';

import Navbar from './navigation-bar';

export default function Layout({ children }) {
    return (
        <div className="flex flex-col min-h-screen max-h-screen overflow-hidden">
            <Head>
                <title>Scribr: The AI YouTube Assistant</title>
            </Head>
            <header className="flex-none bg-white">
                <Navbar showSearchBar={true} />
            </header>
            {children}
        </div>
    );
}
