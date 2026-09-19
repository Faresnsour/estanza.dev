type IconProps = {
  name: string;
  className?: string;
  filled?: boolean;
};

const ICON_PATHS: Record<string, string> = {
  arrow_forward: 'M4 12h15m-6-6 6 6-6 6',
  arrow_back: 'M20 12H5m6-6-6 6 6 6',
  bolt: 'm13 2-9 12h7l-1 8 9-12h-7l1-8Z',
  calendar_month: 'M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2ZM3 9h18M8 2v4m8-4v4M7 13h2m3 0h2m3 0h2M7 17h2m3 0h2',
  calendar_today: 'M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2ZM3 9h18M8 2v4m8-4v4',
  chat: 'M4 4h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H9l-5 4v-4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z',
  check_circle: 'm8 12 3 3 5-6m8 3a10 10 0 1 1-20 0 10 10 0 0 1 20 0Z',
  close: 'm6 6 12 12M18 6 6 18',
  contact_page: 'M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Zm4 4h6m-6 4h6m-6 4h4',
  dataset: 'M5 4h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm3 4h8m-8 4h8m-8 4h5',
  edit_calendar: 'M5 4h11a2 2 0 0 1 2 2v3M3 9h15m-11-7v4m8-4v4m-9 15 2.5-.5L21 8.5a2.1 2.1 0 0 0-3-3l-11.5 11.5L6 19Z',
  filter_alt: 'M4 5h16l-6 7v6l-4 2v-8L4 5Z',
  hub: 'M7 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm10 14a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM7 19a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm0-5V8m3-3h4m0 14h-4',
  link: 'm10 13 4-4m-7 8-2 2a4 4 0 0 1-6-6l4-4a4 4 0 0 1 6 0m2-2 2-2a4 4 0 0 1 6 6l-4 4a4 4 0 0 1-6 0',
  live_help: 'M12 22a10 10 0 1 1 10-10 10 10 0 0 1-10 10Zm0-5v.01M9.5 9a2.5 2.5 0 1 1 4.4 1.6c-1.1 1.1-1.9 1.4-1.9 3',
  menu: 'M4 7h16M4 12h16M4 17h16',
  pause: 'M8 5v14m8-14v14',
  phone_in_talk: 'M6 3h4l2 5-2.5 1.5a12 12 0 0 0 5 5L16 12l5 2v4a2 2 0 0 1-2 2C10 20 4 14 4 5a2 2 0 0 1 2-2Zm10-1a8 8 0 0 1 7 7m-7-3a4 4 0 0 1 3 3',
  play_arrow: 'm9 5 11 7-11 7V5Z',
  play_circle: 'm10 8 6 4-6 4V8Zm12 4a10 10 0 1 1-20 0 10 10 0 0 1 20 0Z',
  public: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Zm0-20c2.5 2.7 3.5 6 3.5 10S14.5 19.3 12 22m0-20C9.5 4.7 8.5 8 8.5 12s1 7.3 3.5 10M2 12h20',
  record_voice_over: 'M12 14a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm0-10v2m0 12v2m-8-8h2m12 0h2m-3.5-5.5 1.5-1.5m-9 1.5L5.5 3m12 14.5 1.5 1.5m-14-1.5L3.5 19',
  ring_volume: 'M3 17a9 9 0 0 1 18 0M6 17h12M8 7l-2-3m10 3 2-3',
  schedule_send: 'M12 21a9 9 0 1 1 9-9m-9-5v5l3 2m3 2 4 4m0-4h-4v4',
  sync: 'M20 11a8 8 0 0 0-14-5L3 8m0-5v5h5m-5 3a8 8 0 0 0 14 5l3-2m0 5v-5h-5',
  touch_app: 'M8 13V5a2 2 0 0 1 4 0v5m0-2a2 2 0 0 1 4 0v3m0-1a2 2 0 0 1 4 0v3a8 8 0 0 1-8 8h-1a8 8 0 0 1-6.5-3.3L4 14a2 2 0 0 1 4-1Z',
  trending_up: 'm3 17 6-6 4 4 8-8m-5 0h5v5',
  verified: 'M12 3 5 6v5c0 4.5 2.8 8.5 7 10 4.2-1.5 7-5.5 7-10V6l-7-3Zm-3 9 2 2 4-4',
  verified_user: 'M12 3 5 6v5c0 4.5 2.8 8.5 7 10 4.2-1.5 7-5.5 7-10V6l-7-3Zm-3 9 2 2 4-4',
  warning: 'M12 3 2 21h20L12 3Zm0 6v5m0 3v.01',
};

export default function Icon({ name, className = '', filled = false }: IconProps) {
  const path = ICON_PATHS[name] ?? ICON_PATHS.verified;

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`inline-block h-[1em] w-[1em] shrink-0 leading-none ${className}`}
    >
      <path d={path} />
    </svg>
  );
}
