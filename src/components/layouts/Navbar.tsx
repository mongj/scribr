import { Link } from '@chakra-ui/next-js';
import logoIcon from '@public/scribr-logo-icon.svg';
import logoLight from '@public/scribr-logo-light.svg';
import SearchBar from '@search/components/SearchBar';
import Image from 'next/image';

export default function Navbar(props) {
    return props.showSearchBar ? (
        <nav className="flex place-items-center px-4 sm:px-8 h-16 leading-normal border-b-2 border-slate-100 gap-4">
            <Link href="/" className="min-w-[36px]">
                <div className="flex flex-none xs:gap-2">
                    <Image src={logoIcon} height={36} alt="logo icon" />
                    <Image
                        src={logoLight}
                        height={20}
                        alt="logo with words"
                        className="hidden xs:block"
                    />
                </div>
            </Link>
            <div className="flex-initial overflow-hidden w-96 sm:pl-8">
                <SearchBar iconsize={16} />
            </div>
        </nav>
    ) : (
        <nav className="flex place-content-between place-items-center px-4 sm:px-8 h-16 leading-normal border-b-2 border-slate-100 gap-4">
            <Link href="/" className="min-w-[36px]">
                <div className="flex flex-none gap-2">
                    <Image src={logoIcon} height={36} alt="logo icon" />
                    <Image src={logoLight} height={20} alt="logo with words" />
                </div>
            </Link>
            <Link
                href="https://github.com/mongj/youtube-transcriber-api"
                className="hover:underline underline-offset-4"
            >
                API
            </Link>
        </nav>
    );
}
