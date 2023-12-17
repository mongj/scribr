import { Button, Tooltip } from '@chakra-ui/react';
import { RefreshCcwIcon } from 'lucide-react';

export default function TranscriptSyncButton() {
    return (
        <Tooltip label="Sync transcript to video">
            <Button
                leftIcon={
                    <RefreshCcwIcon color="gray" strokeWidth={1.5} size={15} />
                }
                border="1px"
                borderColor="gray.200"
                background=""
                _hover={{ background: '#f1f5f9' }}
                onClick={syncTranscriptMarker}
            >
                <span className="text-sm font-semibold text-slate-500">
                    {'Sync'}
                </span>
            </Button>
        </Tooltip>
    );
}

function syncTranscriptMarker() {
    const currentMarker = document.getElementsByClassName('marker-focus')[0];
    currentMarker.scrollIntoView({
        block: 'center',
    });
}
