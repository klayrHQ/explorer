import { useEffect, useState } from 'react';

export function useHostname() {
  const [hostname, setHostname] = useState(
    typeof window !== 'undefined' ? window.location.hostname : '',
  );

  useEffect(() => {
    const updateHostname = () => setHostname(window.location.hostname);

    window.addEventListener('popstate', updateHostname);

    const originalPushState = history.pushState;
    const originalReplaceState = history.replaceState;

    history.pushState = function (...args) {
      originalPushState.apply(this, args);
      updateHostname();
    };

    history.replaceState = function (...args) {
      originalReplaceState.apply(this, args);
      updateHostname();
    };

    return () => {
      window.removeEventListener('popstate', updateHostname);
      history.pushState = originalPushState;
      history.replaceState = originalReplaceState;
    };
  }, []);

  return hostname;
}
