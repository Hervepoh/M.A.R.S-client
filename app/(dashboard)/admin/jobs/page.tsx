import { Suspense } from 'react';
import { SearchParams } from 'nuqs/server';

import { searchParamsCache, serialize } from '@/lib/searchparams';
import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import CustomerView from '@/features/customersReference/ui/customer-view';
import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton';
import NotificationView from '@/modules/notifications/ui/notification-view';
import JobView from '@/modules/jobs/ui/job-view';


export const metadata = {
  title: 'MARS notification',
};

type pageProps = {
  searchParams: Promise<SearchParams>;
};

export default async function CustomerPage(props: pageProps) {
  const searchParams = await props.searchParams;
  // Allow nested RSCs to access the search params (in a type-safe way)
  searchParamsCache.parse(searchParams);

  // This key is used for invoke suspense if any of the search params changed (used for filters).
  const key = serialize({ ...searchParams });

  return (
    <PageContainer scrollable={false}>
      <div className='flex flex-1 flex-col space-y-4'>
        <div className='flex items-start justify-between'>
          <Heading
            title="Jobs"
            description="Taches en arrière plan"
          />
        </div>
        <Separator />
        <Suspense
          key={key}
          fallback={<DataTableSkeleton columnCount={5} rowCount={10} />}
        >
          <JobView />
        </Suspense>
      </div>
    </PageContainer>
  );
}
