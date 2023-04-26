import { Link } from '@chakra-ui/next-js';
import logoLight from '@public/scribr-logo-light.svg';
import Image from 'next/image';

import SearchBar from '@/features/search/search-bar';

export default function Navbar(props) {
    return (
        <nav className="flex items-center px-8 h-16 leading-normal border-2 border-slate-100">
            <div className="flex-none">
                <Link href="/">
                    <Image src={logoLight} height={20} alt="logo" />
                </Link>
            </div>
            <div className="flex-initial overflow-hidden mx-8 w-96">
                {props.showSearchBar == true && <SearchBar iconsize={16} />}
            </div>
        </nav>
    );
}
