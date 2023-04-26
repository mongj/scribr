import { useRef, useState } from 'react';

import { Button, Menu, MenuButton, MenuList, useOutsideClick } from '@chakra-ui/react';
import { ChevronDownIcon, Globe2Icon } from 'lucide-react';
import { Inter } from 'next/font/google';

import LanguageList from './language-options';

const inter = Inter({ subsets: ['latin'] });

export default function LanguageMenu() {
    const ref = useRef(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    useOutsideClick({
        ref: ref,
        handler: () => setIsModalOpen(false),
    });

    return (
        <Menu isLazy isOpen={isModalOpen}>
            <MenuButton
                as={Button}
                leftIcon={<Globe2Icon color="gray" strokeWidth={1.5} size={20} />}
                rightIcon={<ChevronDownIcon color="gray" strokeWidth={1.5} size={20} />}
                border="1px"
                borderColor="gray.200"
                background=""
                _hover={{ background: '#f1f5f9' }}
                onClick={() => {
                    setIsModalOpen(true);
                }}
            >
                <span className={`${inter.className} text-sm font-semibold text-slate-500`}>
                    {'Language'}
                </span>
            </MenuButton>
            <MenuList>
                <LanguageList />
            </MenuList>
        </Menu>
    );
}
