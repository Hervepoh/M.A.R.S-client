import FormCardSkeleton from '@/components/form-card-skeleton';
import PageContainer from '@/components/layout/page-container';
import { Suspense } from 'react';
import RequestViewPage from '@/modules/tickets/ui/pages/request-view-page';
import { NewAssignmentRequestPage } from '@/features/requests/components/new-assignment-request-page';

export const metadata = {
  title: 'Demandes : Detail View'
};

type PageProps = { params: Promise<{ requestId: string }> };

export default async function Page(props: PageProps) {
  const params = await props.params;
  return (
    <PageContainer scrollable>
      <div className='flex-1 space-y-4'>
        <Suspense fallback={<FormCardSkeleton />}>
          {/* <RequestViewPage requestId={params.requestId} /> */}
          <NewAssignmentRequestPage />
        </Suspense>
      </div>
    </PageContainer>
  );
}
