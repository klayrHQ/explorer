import { ReactNode } from 'react';
import NextLink from 'next/link';
import { LinkProps } from 'next/link';

export interface CustomLinkProps extends LinkProps {
  children: ReactNode;
  className?: string;
  href: string;
  outgoing?: boolean;
  basePath?: string;
}

export const Link = ({
  children,
  className,
  href,
  outgoing,
  basePath,
  ...props
}: CustomLinkProps) => {

  return !outgoing ? (
    <NextLink className={className} href={`${basePath ? basePath : ''}${href}`} {...props}>
      {children}
    </NextLink>
  ) : (
    <a className={className} href={href} target={'_blank'} rel={'noreferrer'}>
      {children}
    </a>
  );
};
