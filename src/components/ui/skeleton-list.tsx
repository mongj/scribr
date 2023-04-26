import { Skeleton, Stack } from '@chakra-ui/react';

export default function SkeletonList(props) {
    return (
        <Stack flexGrow={1}>
            {Array(props.rowCount)
                .fill(1)
                .map((_, index) => (
                    <Skeleton
                        key={index}
                        isLoaded={!props.isLoading}
                        height={`${props.rowHeight || 20}px`}
                    />
                ))}
        </Stack>
    );
}
