'use client';

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import CalendlyModal from './CalendlyModal';

type GetStartedContextValue = {
  isOpen: boolean;
  openGetStarted: () => void;
  closeGetStarted: () => void;
};

const GetStartedContext = createContext<GetStartedContextValue | null>(null);

export function GetStartedProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openGetStarted = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeGetStarted = useCallback(() => setIsOpen(false), []);

  const value = useMemo(
    () => ({ isOpen, openGetStarted, closeGetStarted }),
    [isOpen, openGetStarted, closeGetStarted],
  );

  return (
    <GetStartedContext.Provider value={value}>
      {children}
      <CalendlyModal isOpen={isOpen} onClose={closeGetStarted} />
    </GetStartedContext.Provider>
  );
}

export function useGetStarted(): GetStartedContextValue {
  const context = useContext(GetStartedContext);

  if (!context) {
    throw new Error('useGetStarted must be called inside <GetStartedProvider>.');
  }

  return context;
}