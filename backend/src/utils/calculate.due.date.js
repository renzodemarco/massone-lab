const HOLIDAYS = [
  "2026-01-01",
  "2026-03-02",
  "2026-03-03",
  "2026-03-24",
  "2026-04-02",
  "2026-04-03",
  "2026-05-01",
  "2026-05-25",
  "2026-06-20",
  "2026-07-09",
  "2026-08-17",
  "2026-10-12",
  "2026-11-20",
  "2026-12-08",
  "2026-12-25",
];

const DAYS_BY_STUDY = {
  cito: 2,
  hp: 14,
  ihq: 14,
};

export function calculateDueDate(entryDate, studyType) {
  const daysToAdd = DAYS_BY_STUDY[studyType] || 14;
  let date = new Date(entryDate);
  let added = 0;

  while (added < daysToAdd) {
    date.setDate(date.getDate() + 1);
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    const dateStr = date.toISOString().split("T")[0];
    const isHoliday = HOLIDAYS.includes(dateStr);

    if (!isWeekend && !isHoliday) {
      added++;
    }
  }

  return date;
}