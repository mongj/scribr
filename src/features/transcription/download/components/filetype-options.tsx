import { useTranscriptDownloadStore } from '../store/download';

export default function DownloadFiletypeOptions() {
    const targetDownloadFiletype = useTranscriptDownloadStore((state) => state.fileType);

    return (
        <div className="flex flex-col">
            {['Text', 'JSON', 'SRT', 'WebVTT'].map((type) => {
                return (
                    <a
                        key={type}
                        onClick={() => {
                            useTranscriptDownloadStore.setState({
                                fileType: type,
                            });
                        }}
                        className={`px-4 hover:bg-slate-100 ${
                            targetDownloadFiletype == type ? 'font-semibold' : null
                        } hover:font-semibold`}
                        role="button"
                    >
                        {type}
                    </a>
                );
            })}
        </div>
    );
}
