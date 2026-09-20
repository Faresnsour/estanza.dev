import { ReactNode } from "react";

export type DemoStatus =
  | "idle"
  | "submitting"
  | "calling"
  | "fieldError"
  | "capacity"
  | "unsupported"
  | "unavailable";

export type DemoErrors = {
  firstName?: string;
  phone?: string;
  consent?: string;
};

export type TryItLiveProps = {
  status?: DemoStatus;
  errors?: DemoErrors;
  onSubmit?: (value: {
    firstName: string;
    phone: string;
    consent: boolean;
    turnstileToken: string;
  }) => void;
  turnstileSlot?: ReactNode;
  sampleCallSlot?: ReactNode;
  onBookCall?: () => void;
  variant?: "light" | "dark";
};