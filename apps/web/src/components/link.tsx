import NextLink, { LinkProps } from 'next/link';
import { ReactNode } from 'react';
import { useBasePath } from '../utils/hooks/useBasePath.ts';

interface CustomLinkProps extends LinkProps {
  children: ReactNode;
  className?: string;
}

export const Link = ({ href, children, className, ...props }: CustomLinkProps) => {
  const basePath = useBasePath();

  return (
    <NextLink className={className} href={`${basePath}${href}`} {...props}>
      {children}
    </NextLink>
  );
};
