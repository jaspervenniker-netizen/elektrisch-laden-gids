"use client";

import { ReactNode } from 'react';
import { track } from '@vercel/analytics/react';

interface TrackingLinkProps {
  href: string;
  onClick: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  className?: string;
  target?: string;
  rel?: string;
  children: ReactNode;
}

export default function TrackingLink({
  href,
  onClick,
  className,
  target,
  rel,
  children
}: TrackingLinkProps) {
  return (
    <a 
      href={href}
      onClick={onClick}
      className={className}
      target={target}
      rel={rel}
    >
      {children}
    </a>
  );
}