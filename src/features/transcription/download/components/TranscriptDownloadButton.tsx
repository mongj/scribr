import { inter } from '@/utils/font';
import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
} from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';
import { DownloadIcon } from 'lucide-react';

import { DownloadData } from '../lib/download';
import DownloadFiletypeMenu from './DownloadFiletypeMenu';
import DownloadLanguageMenu from './DownloadLanguageMenu';

export default function TranscriptDownloadButton(props) {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Button
                leftIcon={
                    <DownloadIcon color="gray" strokeWidth={1.5} size={15} />
                }
                border="1px"
                borderColor="gray.200"
                background=""
                _hover={{ background: '#f1f5f9' }}
                onClick={onOpen}
            >
                <span className="text-sm font-semibold text-slate-500">
                    {'Download'}
                </span>
            </Button>
            <Modal onClose={onClose} isOpen={isOpen} isCentered>
                <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
                <ModalContent>
                    <ModalHeader>Download Transcript</ModalHeader>
                    <ModalBody>
                        <table>
                            <tr>
                                <td
                                    className={`${inter.className} text-sm font-semibold text-slate-800 pr-4`}
                                >
                                    Language:
                                </td>
                                <td className="py-2">
                                    <DownloadLanguageMenu />
                                </td>
                            </tr>
                            <tr>
                                <td
                                    className={`${inter.className} text-sm font-semibold text-slate-800 pr-4`}
                                >
                                    File Type:
                                </td>
                                <td className="py-2">
                                    <DownloadFiletypeMenu />
                                </td>
                            </tr>
                        </table>
                    </ModalBody>
                    <ModalFooter>
                        <div className="flex gap-2">
                            <Button onClick={onClose} variant="outline">
                                Cancel
                            </Button>
                            <Button
                                onClick={() => {
                                    DownloadData(props.id);
                                }}
                                variant="solid"
                            >
                                Download
                            </Button>
                        </div>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
