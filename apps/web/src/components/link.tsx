import NextLink, {LinkProps} from 'next/link';
import {ReactNode} from "react";
import {getBasePath} from "../utils/helpers/getBasePath.ts";

interface CustomLinkProps extends LinkProps {
  children: ReactNode;
  className?: string;
}

export const Link = ({href, children, className, ...props}: CustomLinkProps) => {
  const basePath = getBasePath();

  return (
    <NextLink className={className} href={`${basePath}${href}`} {...props}>
      {children}
    </NextLink>
  )
}