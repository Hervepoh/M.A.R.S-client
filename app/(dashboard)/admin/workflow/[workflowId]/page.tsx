import { Suspense } from 'react';
import FormCardSkeleton from '@/components/form-card-skeleton';
import PageContainer from '@/components/layout/page-container';

import WorkflowViewPage from '@/features/workflows/components/workflow-view-page';
import { EditUserPage } from '@/features/users/components/edit-user-page';
import { EditWorkflowPage } from '@/features/workflows/components/edit-workflow-page';

export const metadata = {
  title: 'Administration workflow : modération des workflows'
};

type PageProps = {
  params: { workflowId: string }
  searchParams: { e?: boolean };
};


export default function Page({ params , searchParams}: PageProps) {
  return (
    <PageContainer scrollable>
      <div className="flex-1 space-y-4">
        <Suspense fallback={<FormCardSkeleton />}>
          {/* <WorkflowViewPage workflowId={params.workflowId} edit={searchParams.e} /> */}
          <EditWorkflowPage id={params.workflowId} />
        </Suspense>
      </div>
    </PageContainer>
  );
}
