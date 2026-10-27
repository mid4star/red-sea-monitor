/**
 * Deterministic date formatting utilities for SSR & client hydration safety.
 * Avoids toLocaleDateString() locale discrepancies between Node.js server and browser.
 */

const MONTH_NAMES_SHORT = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

const MONTH_NAMES_FULL = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

export function formatDateDeterministic(
  dateInput: string | Date | number | null | undefined,
  options: { includeDay?: boolean; fullMonth?: boolean } = { includeDay: true, fullMonth: false }
): string {
  if (!dateInput) return '';

  const d = typeof dateInput === 'string' || typeof dateInput === 'number'
    ? new Date(dateInput)
    : dateInput;

  if (isNaN(d.getTime())) return '';

  const day = d.getUTCDate();
  const monthIdx = d.getUTCMonth();
  const year = d.getUTCFullYear();

  const monthName = options.fullMonth
    ? MONTH_NAMES_FULL[monthIdx]
    : MONTH_NAMES_SHORT[monthIdx];

  if (options.includeDay) {
    const paddedDay = day < 10 ? `0${day}` : `${day}`;
    return `${paddedDay} ${monthName} ${year}`;
  }

  return `${monthName} ${year}`;
}
