import Layout from '@/components/layouts';
import {
    Badge,
    Stack,
    Tab,
    TabIndicator,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
} from '@chakra-ui/react';
import TranscriptLanguageMenu from '@transcription/components/language/TranscriptLanguageMenu';
import TranscriptSyncButton from '@transcription/components/transcripts/TranscriptSyncButton';
import TranscriptTabs from '@transcription/components/transcripts/TranscriptTabs';
import TranscriptDownloadButton from '@transcription/download/components/TranscriptDownloadButton';
import YTPlayer from '@youtube-player/components/YTPlayer';
import _ from 'lodash';
import { Inter } from 'next/font/google';
import { useRouter } from 'next/router';

const inter = Inter({ subsets: ['latin'] });

export default function VideoTranscriptPage() {
    const router = useRouter();

    return (
        <Layout>
            <main
                className={`${inter.className} flex h-full flex-1 overflow-hidden bg-slate-50 p-8`}
            >
                <div className="flex flex-col">
                    <div className="flex flex-none overflow-hidden rounded-lg border-2 border-slate-100 bg-white">
                        <YTPlayer
                            id={router.query.id}
                            height={405}
                            width={720}
                        />
                    </div>
                    <div className="mb-2 ml-2 mt-4">
                        <Stack direction="row">
                            <h3 className="text-base font-semibold">
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
                        <h3 className="self-center pl-2 text-base font-semibold">
                            Transcript
                        </h3>
                        <div className="ml-auto flex gap-2">
                            <TranscriptSyncButton />
                            <TranscriptLanguageMenu />
                            <TranscriptDownloadButton id={router.query.id} />
                        </div>
                    </div>
                    <div className="flex overflow-hidden">
                        <TranscriptTabs id={router.query.id} />
                    </div>
                </div>
            </main>
        </Layout>
    );
}
