// import Metadata from '@/components/metadata';
// import { Header } from '@/components/header';
import KBar from '@/components/kbar';
import AppSidebar from '@/components/layout/app-sidebar';
import Header from '@/components/layout/header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import type { Metadata } from 'next';
import { cookies } from 'next/headers';

type Props = {
    children: React.ReactNode;
}

export const metadata: Metadata = {
    title: 'Next Shadcn Dashboard Starter',
    description: 'Basic dashboard with Next.js and Shadcn'
};


export default function DashboardLayout({ children }: Props) {

    // Persisting the sidebar state in the cookie.
    const cookieStore = cookies();
    const defaultOpen = cookieStore.get('sidebar:state')?.value === 'true';
    return (
        <KBar>
            {/* <SidebarProvider defaultOpen={defaultOpen}> */}
            <SidebarProvider defaultOpen={true}>
                <AppSidebar />
                <SidebarInset>
                    <Header />
                    {/* page main content */}
                    {children}
                    {/* page main content ends */}
                </SidebarInset>
            </SidebarProvider>
        </KBar>
    );
}