import { Suspense } from 'react';
import FormCardSkeleton from '@/components/form-card-skeleton';
import PageContainer from '@/components/layout/page-container';

import RoleViewPage from '@/features/permissions/components/role-view-page';

export const metadata = {
  title: 'Administration Utilisateurs : modération des Comptes'
};

type PageProps = {
  params: { roleId: string }
  searchParams: { e?: boolean };
};


export default function Page({ params , searchParams}: PageProps) {
  return (
    <PageContainer scrollable>
      <div className="flex-1 space-y-4">
        <Suspense fallback={<FormCardSkeleton />}>
          <RoleViewPage roleId={params.roleId} edit={searchParams.e} />
        </Suspense>
      </div>
    </PageContainer>
  );
}
