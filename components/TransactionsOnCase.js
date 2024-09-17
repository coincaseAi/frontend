import { useEffect } from 'react';
import { decodeEventLog, getContract, parseAbiItem } from 'viem';
import caseAbi from '@/config/caseAbi.json';
import { useAccount, useClient, usePublicClient } from 'wagmi';

const FetchLogs = ({ caseId }) => {
    const publicClient = useClient();
    const { address } = useAccount();

    useEffect(() => {
        const fetchLogs = async () => {


            try {
                const logs = await publicClient.getLogs({
                    filter: {
                        eventName: 'TokensPurchased',
                        args: {
                            subscriber: address,
                        },
                    },
                });
                console.log('Fetched logs:', logs);
            } catch (error) {
                console.error('Error fetching logs:', error);
            }
        };

        fetchLogs();
    }, [publicClient, caseId]);


    return <div>Check console for logs</div>;
};

export default FetchLogs;
