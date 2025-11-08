import { useState } from 'react';

export function useHostname() {
  const [hostname] = useState(typeof window !== 'undefined' ? window.location.hostname : '');
  return hostname;
}
