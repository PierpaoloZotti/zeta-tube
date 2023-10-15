const LEADING_ZERO_FORMATTER = new Intl.NumberFormat(undefined, {
  minimumIntegerDigits: 2,
});

export function formatDuration(duration: number) {
  const seconds = duration % 60;
  const minutes = Math.floor(duration / 60) % 60;
  const hours = Math.floor(duration / 3600);
  return `${hours > 0 ? `${hours}:` : ''}${LEADING_ZERO_FORMATTER.format(
    minutes,
  )}:${LEADING_ZERO_FORMATTER.format(seconds)}`;
}
