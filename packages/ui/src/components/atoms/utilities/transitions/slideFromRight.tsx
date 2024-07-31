import { CSSTransition } from 'react-transition-group';
import {cloneElement, ForwardedRef, forwardRef, ReactElement, ReactNode} from "react";

interface SlideFromRightProps {
  children: ReactElement;
  in: boolean;
}

export const SlideFromRight = forwardRef((
  { children, in: inProp }: SlideFromRightProps, ref: ForwardedRef<HTMLElement>) => {
  return (
    <CSSTransition
      in={inProp}
      timeout={300}
      classNames="slideFromRight"
      unmountOnExit
      nodeRef={ref}
    >
      {cloneElement(children, { ref })}
    </CSSTransition>
  );
});