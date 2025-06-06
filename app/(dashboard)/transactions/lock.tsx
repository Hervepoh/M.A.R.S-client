"use client";
import { useEffect } from 'react';

import { useGetLockRequests } from '@/features/transactions/api/use-get-lock-requests';
import { useTransactionStore } from '@/features/transactions/hooks/use-lockTransactions-store';


export const Lock = () => {
    const { setLock } = useTransactionStore();

    const getLockTransactionsQuery = useGetLockRequests();
    useEffect(() => {
        if (getLockTransactionsQuery.data) {
            const lockData = getLockTransactionsQuery.data;

            // Only update if lockData has changed
            setLock(lockData);
        }
    }, [getLockTransactionsQuery.data, setLock]); // Add dependencies to avoid infinite loop

    return <></>
}


