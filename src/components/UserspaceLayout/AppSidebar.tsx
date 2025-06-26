'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useSelectedLayoutSegments } from 'next/navigation';
import { Calendar, CookingPot, LibraryBig } from 'lucide-react';

const links = [
  {
    label: 'kitchen.sections.root',
    links: [
      {
        label: 'kitchen.sections.root',
        link: '/cuisine',
        icon: CookingPot,
      },
      {
        label: 'kitchen.sections.recettes',
        link: '/cuisine/recettes',
        icon: LibraryBig,
      },
      {
        label: 'kitchen.sections.calendrier',
        link: '/cuisine/plannification',
        icon: Calendar,
      },
    ],
  },
];

export default function AppSidebar(
  props: React.ComponentProps<typeof Sidebar>
) {
  const t = useTranslations();
  const segments = useSelectedLayoutSegments();

  const activePath = `/dashboard${segments.length > 0 ? `/${segments.join('/')}` : ''}`;

  return (
    <Sidebar {...props}>
      <SidebarSeparator />
      <SidebarContent>
        {links.map(({ label, links }, index) => (
          <SidebarGroup key={index}>
            <SidebarGroupLabel>{t(label)}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {links.map(({ label, link, icon: Icon }, index) => (
                  <SidebarMenuItem key={index}>
                    <SidebarMenuButton asChild isActive={link === activePath}>
                      <Link href={link}>
                        <Icon />
                        {t(label)}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarSeparator />
      <SidebarRail />
      <SidebarFooter>Le footer là</SidebarFooter>
    </Sidebar>
  );
}
