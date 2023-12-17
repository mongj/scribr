import { WarningTwoIcon } from '@chakra-ui/icons';
import { Heading, Text } from '@chakra-ui/react';
import Layout from '@components/layouts';
import Link from 'next/link';

export default function NotFoundPage() {
    return (
        <Layout>
            <div className="flex flex-col flex-grow items-center justify-center bg-slate-50 px-6 pb-12 text-center">
                <WarningTwoIcon boxSize={'50px'} color={'orange.300'} />
                <Heading as="h2" size="xl" mt={6} mb={2}>
                    {"Sorry, we couldn't find what you are searching for"}
                </Heading>
                <Text color={'gray.500'}>
                    Try searching something else, or{' '}
                    <Link href="/" className="underline">
                        return home
                    </Link>
                </Text>
            </div>
        </Layout>
    );
}
