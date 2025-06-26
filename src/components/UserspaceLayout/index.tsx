'use client';

import { Breadcrumb, BreadcrumbList } from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { useSelectedLayoutSegments } from 'next/navigation';
import AppSidebar from './AppSidebar';
import { ReactNode, useMemo } from 'react';
import BreadcrumbsFromPath from './BreadcrumbsFromPath';
import Link from 'next/link';
import { Home } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function UserspaceLayout({ children }: { children: ReactNode }) {
  const t = useTranslations();
  const selectedLayoutSegments = useSelectedLayoutSegments();
  const currentPath = useMemo(
    () => ['cuisine', ...selectedLayoutSegments],
    [selectedLayoutSegments]
  );

  return (
    <SidebarProvider defaultOpen>
      <AppSidebar collapsible="icon" />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <Link href="/" className="flex flex-row">
            <Home />
            {t('home.title')}
          </Link>
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbsFromPath currentPath={currentPath} />
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
