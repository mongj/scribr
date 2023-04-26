import { useRef } from 'react';
import { FormEvent } from 'react';

import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { Search } from 'lucide-react';
import { useRouter } from 'next/router';

import searchHandler from '../lib/search-handler';

export default function SearchBar(props) {
    const videoLink = useRef<HTMLInputElement>(null);
    const router = useRouter();

    function submitHandler(event: FormEvent) {
        searchHandler(event, videoLink, router);
        if (videoLink.current) {
            videoLink.current.value = '';
        }
    }

    return (
        <form className="flex w-full mt-2 mb-2" onSubmit={submitHandler}>
            <InputGroup>
                <InputLeftElement pointerEvents="none" h="100%" pl="1rem">
                    <Search color="gray" strokeWidth={1.5} size={props.iconsize} />
                </InputLeftElement>
                <Input
                    className="!shadow-[0_1px_1px_rgba(0,0,0,0.04),0_2px_10px_rgba(0,0,0,0.04)]"
                    placeholder="Enter YouTube URL"
                    size="md"
                    bg="white"
                    h="3rem"
                    pl="3.5rem"
                    _focus={{ borderColor: 'gray.300' }}
                    ref={videoLink}
                />
            </InputGroup>
        </form>
    );
}
