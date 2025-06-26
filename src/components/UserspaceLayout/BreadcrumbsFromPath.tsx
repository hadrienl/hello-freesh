'use client';

import { ReactNode } from 'react';
import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '../ui/breadcrumb';
import { useTranslations } from 'next-intl';

interface BreadcrumbsFromPathProps {
  currentPath: string[];
  prevPath?: string[];
}

const emptyArray: string[] = [];

export default function BreadcrumbsFromPath({
  currentPath: segments,
  prevPath = emptyArray,
}: BreadcrumbsFromPathProps): ReactNode {
  const t = useTranslations();
  const [segment, ...nextSegments] = segments;
  const isFirst = prevPath.length === 0;
  const isLast = nextSegments.length === 0;
  const currentPath = [...prevPath, segment];
  const [, ...currentLocalPath] = currentPath;
  const label = t(
    currentLocalPath.length === 0
      ? 'kitchen.sections.root'
      : `kitchen.sections.${currentLocalPath.join('/')}`
  );

  return (
    <>
      {!isFirst && <BreadcrumbSeparator className="hidden md:block" />}
      <BreadcrumbItem>
        {isLast && <BreadcrumbPage>{label}</BreadcrumbPage>}
        {!isLast && (
          <BreadcrumbLink href={`/${currentPath.join('/')}`}>
            {label}
          </BreadcrumbLink>
        )}
      </BreadcrumbItem>
      {!isLast && (
        <BreadcrumbsFromPath
          currentPath={nextSegments}
          prevPath={currentPath}
        />
      )}
    </>
  );
}
