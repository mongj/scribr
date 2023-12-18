import Layout from '@/components/layouts';
import TranscriptLanguageMenu from '@transcription/components/language/TranscriptLanguageMenu';
import TimestampedTranscript from '@transcription/components/transcripts/TimestampedTranscript';
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
                className={`${inter.className} flex flex-col xl:flex-row h-full overflow-hidden bg-slate-50 sm:p-8 sm:gap-4`}
            >
                <div className="w-full max-xl:max-w-[800px] max-xl:m-auto">
                    <div className="w-full max-h-full aspect-video overflow-hidden sm:rounded-lg shadow">
                        <YTPlayer
                            id={router.query.id}
                            height="100%"
                            width="100%"
                        />
                    </div>
                </div>
                <div className="w-full flex flex-grow flex-col sm:rounded-lg overflow-y-clip min-h-0 border border-slate-100 bg-white shadow max-w-[800px] max-xl:m-auto">
                    <div className="flex p-4 place-content-between place-items-center">
                        <p className="pl-2 pr-6 font-medium text-lg">
                            Transcript
                        </p>
                        <div className="flex gap-2">
                            <TranscriptDownloadButton id={router.query.id} />
                            <TranscriptLanguageMenu />
                        </div>
                    </div>
                    <hr />
                    <div className="flex flex-auto overflow-auto relative">
                        <TimestampedTranscript id={router.query.id} />
                    </div>
                </div>
            </main>
        </Layout>
    );
}
