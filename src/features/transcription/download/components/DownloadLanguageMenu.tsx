import { useRef, useState } from 'react';

import { Button, Menu, MenuButton, MenuList, useOutsideClick } from '@chakra-ui/react';
import { ChevronDownIcon } from 'lucide-react';
import { Inter } from 'next/font/google';

import { useTranscriptDownloadStore } from '../store/download';
import DownloadLanguageOptions from './DownloadLanguageOptions';

const inter = Inter({ subsets: ['latin'] });

export default function DownloadLanguageMenu() {
    const ref = useRef(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    useOutsideClick({
        ref: ref,
        handler: () => setIsModalOpen(false),
    });

    const targetDownloadLanguage = useTranscriptDownloadStore((state) => state.targetLanguage);

    return (
        <Menu isOpen={isModalOpen}>
            <MenuButton
                as={Button}
                rightIcon={<ChevronDownIcon color="gray" strokeWidth={1.5} size={20} />}
                border="1px"
                borderColor="gray.200"
                background=""
                _hover={{
                    background: '#f1f5f9',
                }}
                onClick={() => {
                    setIsModalOpen(true);
                }}
            >
                <span className={`${inter.className} text-sm font-semibold text-slate-500`}>
                    {targetDownloadLanguage}
                </span>
            </MenuButton>
            <MenuList>
                <DownloadLanguageOptions />
            </MenuList>
        </Menu>
    );
}
