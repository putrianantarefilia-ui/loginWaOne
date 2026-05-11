interface MaterialIconProps {
  name: string;
  className?: string;
  filled?: boolean;
}

export default function MaterialIcon({
  name,
  className = "",
  filled = false,
}: MaterialIconProps) {
  return (
    <span
      className={`material-symbols-outlined ${className}`}
      style={{
        fontVariationSettings: `'FILL' ${
          filled ? 1 : 0
        }, 'wght' 400, 'GRAD' 0, 'opsz' 24`,
      }}
    >
      {name}
    </span>
  );
}
