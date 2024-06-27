import {cloneElement, ReactNode} from "react";
import {LinkComponent} from "../../../types/types.ts";

interface LinkProps {
  children: ReactNode
  className?: string
  href: string
  component?: LinkComponent
}

export const Link = ({ children, className, href, component, }: LinkProps) => {
  
  return component ? (
    cloneElement(component, {
      href,
      className,
      children,
    })
  ) : (
    <a className={className} href={href}>{children}</a>
  )
}