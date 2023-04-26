import {
    Badge,
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Stack,
    Tab,
    TabIndicator,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Tooltip,
} from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';
import TextTranscript from '@transcription/components/transcripts/text';
import TimestampedTranscript from '@transcription/components/transcripts/timestamped';
import DownloadFiletypeMenu from '@transcription/download/components/filetype-menu';
import DownloadLanguageMenu from '@transcription/download/components/language-menu';
import { useTranscriptDownloadStore } from '@transcription/download/store/download';
import transcriptEventHandlers from '@transcription/lib/transcript-event';
import _ from 'lodash';
import { DownloadIcon, RefreshCcwIcon } from 'lucide-react';
import { Inter } from 'next/font/google';
import { useRouter } from 'next/router';

import Layout from '@/components/layouts';
import LanguageMenu from '@/features/transcription/components/language/language-menu';
import YTPlayer from '@/features/youtube-player/components/yt-player';

const inter = Inter({ subsets: ['latin'] });

export default function VideoTranscriptPage() {
    const router = useRouter();
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Layout>
            <main className="flex h-full flex-1 overflow-hidden bg-slate-50 p-8">
                <div className="flex flex-col">
                    <div className="flex flex-none overflow-hidden rounded-lg border-2 border-slate-100 bg-white">
                        <YTPlayer id={router.query.id} height={405} width={720} />
                    </div>
                    <div className="mb-2 ml-2 mt-4">
                        <Stack direction="row">
                            <h3 className={`${inter.className} text-base text-xl font-semibold`}>
                                AI Copilot
                            </h3>
                            <div className="h-full align-middle">
                                <Badge colorScheme="blue">Experimental</Badge>
                            </div>
                        </Stack>
                    </div>
                    <div className="flex flex-auto flex-col overflow-hidden rounded-lg border-2 border-slate-100 bg-white">
                        <Tabs position="relative" variant="line" height="100%">
                            <TabList>
                                <Tab>Summary</Tab>
                                <Tab>Chat</Tab>
                            </TabList>
                            <TabIndicator
                                mt="-1.5px"
                                height="1.5px"
                                bg="blue.500"
                                borderRadius="1px"
                            />
                            <TabPanels height="100%" overflowY="auto">
                                <TabPanel>
                                    <p>work in progress</p>
                                </TabPanel>
                                <TabPanel>
                                    <p>work in progress</p>
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                    </div>
                </div>
                <div className="ml-4 flex flex-auto flex-col overflow-hidden rounded-lg border-2 border-slate-100 bg-white">
                    <div className="mx-4 mt-4 flex flex-row">
                        <h3
                            className={`${inter.className} self-center pl-2 text-base text-xl font-semibold`}
                        >
                            Transcript
                        </h3>
                        <div className="ml-auto flex gap-2">
                            <div className={`${inter.className} flex items-center`}>
                                <Tooltip label="Sync transcript to video">
                                    <Button
                                        leftIcon={
                                            <RefreshCcwIcon
                                                color="gray"
                                                strokeWidth={1.5}
                                                size={15}
                                            />
                                        }
                                        border="1px"
                                        borderColor="gray.200"
                                        background=""
                                        _hover={{ background: '#f1f5f9' }}
                                        onClick={syncTranscriptMarker}
                                    >
                                        <span
                                            className={`${inter.className} text-sm font-semibold text-slate-500`}
                                        >
                                            {'Sync'}
                                        </span>
                                    </Button>
                                </Tooltip>
                            </div>
                            <LanguageMenu />
                            <Button
                                leftIcon={<DownloadIcon color="gray" strokeWidth={1.5} size={15} />}
                                border="1px"
                                borderColor="gray.200"
                                background=""
                                _hover={{ background: '#f1f5f9' }}
                                onClick={onOpen}
                            >
                                <span
                                    className={`${inter.className} text-sm font-semibold text-slate-500`}
                                >
                                    {'Download'}
                                </span>
                            </Button>
                            <Modal onClose={onClose} isOpen={isOpen} isCentered>
                                <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
                                <ModalContent>
                                    <ModalHeader>Download Transcript</ModalHeader>
                                    <ModalCloseButton />
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
                                                    DownloadData(router.query.id);
                                                }}
                                                variant="solid"
                                            >
                                                Download
                                            </Button>
                                        </div>
                                    </ModalFooter>
                                </ModalContent>
                            </Modal>
                        </div>
                    </div>
                    <div className="flex overflow-hidden">
                        <Tabs
                            position="relative"
                            variant="line"
                            display="flex"
                            flexDirection={'column'}
                            flexGrow={1}
                        >
                            <TabList paddingLeft={4} display="flex">
                                <Tab>Follow</Tab>
                                <Tab>Read</Tab>
                            </TabList>
                            <TabIndicator
                                mt="-1.5px"
                                height="1.5px"
                                bg="blue.500"
                                borderRadius="1px"
                                display="flex"
                            />
                            <TabPanels
                                height="100%"
                                onScroll={transcriptEventHandlers.ScrollHandler}
                                onWheel={transcriptEventHandlers.WheelHandler}
                                onMouseDown={transcriptEventHandlers.MouseDownHandler}
                                onMouseUp={transcriptEventHandlers.MouseUpHandler}
                                onKeyDown={transcriptEventHandlers.KeyDownHandler}
                                onKeyUp={transcriptEventHandlers.KeyUpHandler}
                                display="flex"
                                overflowY="auto"
                                scrollBehavior="smooth"
                            >
                                <TabPanel display="flex" flexGrow={1}>
                                    <TimestampedTranscript id={router.query.id} />
                                </TabPanel>
                                <TabPanel>
                                    <TextTranscript id={router.query.id} />
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                    </div>
                </div>
            </main>
        </Layout>
    );
}

const TRANSCRIPTION_API_ENDPOINT = process.env.TRANSCRIPTION_API_ENDPOINT;
function DownloadData(id) {
    const targetLanguageCode = useTranscriptDownloadStore
        .getState()
        .targetLanguageCode.toLowerCase();
    const targetFiletype = useTranscriptDownloadStore.getState().fileType.toLowerCase();

    let fileExt;
    switch (targetFiletype) {
        case 'text':
            fileExt = 'txt';
            break;
        case 'webvtt':
            fileExt = 'vtt';
            break;
        default:
            fileExt = targetFiletype;
    }

    const target_url = `${TRANSCRIPTION_API_ENDPOINT}/transcripts/?id=${id}&lang=${targetLanguageCode}&type=${targetFiletype}`;
    fetch(target_url).then((res) => {
        if (res.ok) {
            res.json().then((data) => {
                const dataBlob = new Blob(
                    [
                        processString(
                            JSON.stringify(data['transcripts'][0]['text'], null, 2),
                            targetFiletype,
                        ),
                    ],
                    { type: 'text/plain' },
                );
                const href = URL.createObjectURL(dataBlob);
                const a = Object.assign(document.createElement('a'), {
                    href,
                    style: 'display: none',
                    download: `transcript_${data['video_id']}.${fileExt}`,
                });
                document.body.appendChild(a);
                a.click();
                a.remove();
                URL.revokeObjectURL(href);
            });
        }
    });
}

function processString(str: string, filetype) {
    if (str[0] == '"' && str[str.length - 1] == '"') {
        str = str.slice(1, -1);
    }
    if (filetype == 'json') {
        str = str.replaceAll('\\n', ' ');
    } else {
        str = str.replaceAll('\\n', '\n');
        str = str.replaceAll('\\"', '"');
    }

    return str;
}

function syncTranscriptMarker() {
    const currentMarker = document.getElementsByClassName('marker-focus')[0];
    currentMarker.scrollIntoView({
        block: 'center',
    });
}
