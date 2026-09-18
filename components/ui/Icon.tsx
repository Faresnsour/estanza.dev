type IconProps = {
  /** Material Symbols ligature name, e.g. "arrow_forward" */
  name: string;
  className?: string;
  /** Renders the filled variant of the glyph */
  filled?: boolean;
};

export default function Icon({ name, className = '', filled = false }: IconProps) {
  return (
    <span
      aria-hidden="true"
      className={`material-symbols-outlined leading-none select-none ${className}`}
      style={filled ? { fontVariationSettings: "'FILL' 1" } : undefined}
    >
      {name}
    </span>
  );
}
