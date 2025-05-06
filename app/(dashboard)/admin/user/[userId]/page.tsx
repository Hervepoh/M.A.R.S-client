import { Suspense } from 'react';
import FormCardSkeleton from '@/components/form-card-skeleton';
import PageContainer from '@/components/layout/page-container';

import UserViewPage from '@/features/users/components/user-view-page';

export const metadata = {
  title: 'Administration Utilisateurs : modération des Comptes'
};

type PageProps = {
  params: { userId: string }
  searchParams: { e?: boolean };
};


export default function Page({ params , searchParams}: PageProps) {
  return (
    <PageContainer scrollable>
      <div className="flex-1 space-y-4">
        <Suspense fallback={<FormCardSkeleton />}>
          <UserViewPage userId={params.userId} edit={searchParams.e} />
        </Suspense>
      </div>
    </PageContainer>
  );
}
