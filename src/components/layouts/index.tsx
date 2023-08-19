import Dreamer from '@public/dreamer.svg';
import Head from 'next/head';
import Image from 'next/image';

import Navbar from './Navbar';

export default function Layout({ children }) {
    return (
        <div className="flex flex-col w-full">
            <div className="max-[1350px]:hidden flex flex-col min-h-screen max-h-screen w-full overflow-hidden">
                <Head>
                    <title>Scribr: The AI YouTube Assistant</title>
                </Head>
                <header className="flex-none bg-white">
                    <Navbar showSearchBar={true} />
                </header>
                {/* Below is just a temporary fix, the window width is only compared once when the component is first mounted and it does not track the changes in window width if the window is resized later on */}
                {window.innerWidth > 1350 ? children : null}
            </div>
            <div className="min-[1350px]:hidden flex flex-col min-h-screen max-h-screen w-full overflow-hidden p-8 justify-center bg-slate-50">
                <div className="flex flex-col items-center">
                    <Image src={Dreamer} alt="dreamer" className="w-4/5 md:w-1/2 mb-8" />
                    <h1 className="text-center text-3xl font-bold mb-4">{'Working on it!'}</h1>
                    <p className="text-md md:text-xl text-center text-neutral-800">
                        {
                            "We're working hard to bring the mobile version to you. In meantime, please use the app on a computer."
                        }
                    </p>
                </div>
            </div>
        </div>
    );
}
