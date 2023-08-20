import { Tab, TabIndicator, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import {
    KeyDownHandler,
    KeyUpHandler,
    MouseDownHandler,
    MouseUpHandler,
    ScrollHandler,
    WheelHandler,
} from '@transcription/lib/transcript-event';

import TextTranscript from './TextTranscript';
import TimestampedTranscript from './TimestampedTranscript';

export default function TranscriptTabs(props) {
    return (
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
                <Tab>Outline</Tab>
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
                onScroll={ScrollHandler}
                onWheel={WheelHandler}
                onMouseDown={MouseDownHandler}
                onMouseUp={MouseUpHandler}
                onKeyDown={KeyDownHandler}
                onKeyUp={KeyUpHandler}
                display="flex"
                overflowY="auto"
                scrollBehavior="smooth"
            >
                <TabPanel display="flex" flexGrow={1}>
                    <TimestampedTranscript id={props.id} />
                </TabPanel>
                <TabPanel>
                    <TextTranscript id={props.id} />
                </TabPanel>
                <TabPanel>work in progress</TabPanel>
            </TabPanels>
        </Tabs>
    );
}
