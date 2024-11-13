import {MutableRefObject, useEffect, useRef, useState} from 'react';

export const useIsHorizontallyScrolled = (): [boolean, MutableRefObject<HTMLDivElement | null>]  => {
  const [isScrolled, setIsScrolled] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = scrollRef.current;
    if (!element) return;

    const handleScroll = () => {
      console.log('scrolling');
      setIsScrolled(element.scrollLeft > 0);
    };

    element.addEventListener('scroll', handleScroll);

    return () => {
      element.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return [isScrolled, scrollRef];
};