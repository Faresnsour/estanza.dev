'use client';

import { useEffect } from 'react';
import { PopupModal } from 'react-calendly';

const CALENDLY_URL = process.env.NEXT_PUBLIC_CALENDLY_URL;

interface CalendlyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CalendlyModal({ isOpen, onClose }: CalendlyModalProps) {
  const isClient = typeof window !== 'undefined';

  useEffect(() => {
    if (!CALENDLY_URL) {
      console.warn('NEXT_PUBLIC_CALENDLY_URL is not set. Calendly widget will not work.');
    }
  }, []);

  if (!CALENDLY_URL || !isClient) {
    return null;
  }

  return (
    <PopupModal
      url={CALENDLY_URL}
      open={isOpen}
      onModalClose={(e) => {
        e.preventDefault();
        onClose();
      }}
      rootElement={document.body}
    />
  );
}