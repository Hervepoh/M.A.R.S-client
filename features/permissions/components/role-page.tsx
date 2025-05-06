"use client";

import { DataTable } from '@/components/data-table';

import { useUserStore } from '@/features/users/hooks/use-user-store';
import { columns } from '@/features/permissions/components/role/columns';
import { useGetRoles } from '@/features/permissions/api/use-get-roles';


type Props = {}

export function RolePage(props: Props) {
    const { user } = useUserStore()

    const getQuery = useGetRoles();
    const data = getQuery.data || [];


    if (user?.role?.name.toUpperCase() !== 'ADMIN') return null;

    return (
        <DataTable
            columns={columns}
            data={data}
            filterKey='name'

           />
    );
}


