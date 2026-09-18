'use client';

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import GetStartedModal, { type SelectedPlan } from './GetStartedModal';

type GetStartedContextValue = {
  isOpen: boolean;
  openGetStarted: (plan?: SelectedPlan) => void;
  closeGetStarted: () => void;
};

const GetStartedContext = createContext<GetStartedContextValue | null>(null);

export function GetStartedProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<SelectedPlan>('general');

  const openGetStarted = useCallback((plan: SelectedPlan = 'general') => {
    setSelectedPlan(plan);
    setIsOpen(true);
  }, []);

  // selectedPlan is deliberately not reset here — resetting it would make the
  // card titles flip to the $299 default mid-way through the close animation.
  const closeGetStarted = useCallback(() => setIsOpen(false), []);

  const value = useMemo(
    () => ({ isOpen, openGetStarted, closeGetStarted }),
    [isOpen, openGetStarted, closeGetStarted],
  );

  return (
    <GetStartedContext.Provider value={value}>
      {children}
      <GetStartedModal isOpen={isOpen} onClose={closeGetStarted} selectedPlan={selectedPlan} />
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