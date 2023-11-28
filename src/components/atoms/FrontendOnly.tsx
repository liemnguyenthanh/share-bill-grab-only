'use client';
import { useState, useEffect, PropsWithChildren } from 'react';

export function ClientOnly({ children }: PropsWithChildren) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (isClient) {
    return children;
  }

  return <></>;
}
