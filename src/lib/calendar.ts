/**
 * Generates an iCalendar (.ics) format string for application deadlines.
 */
export function generateIcsFile({
  title,
  description,
  location,
  deadline,
  url,
}: {
  title: string;
  description: string;
  location?: string;
  deadline: Date;
  url: string;
}): string {
  const formatDate = (date: Date) => {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };

  const start = formatDate(deadline);
  // Default reminder 1 hour event on the deadline
  const end = formatDate(new Date(deadline.getTime() + 60 * 60 * 1000));
  const stamp = formatDate(new Date());
  const uid = `opp-${deadline.getTime()}@redseamonitor.org`;

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Red Sea Monitor//Opportunities Calendar//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${stamp}`,
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `SUMMARY:Deadline: ${title.replace(/\n/g, ' ')}`,
    `DESCRIPTION:${description.replace(/\n/g, '\\n')}\\n\\nApply here: ${url}`,
    location ? `LOCATION:${location.replace(/\n/g, ' ')}` : '',
    `URL:${url}`,
    'BEGIN:VALARM',
    'TRIGGER:-P2D', // 2-day reminder
    'ACTION:DISPLAY',
    'DESCRIPTION:Reminder: 48 hours remaining until deadline',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ]
    .filter(Boolean)
    .join('\r\n');
}
