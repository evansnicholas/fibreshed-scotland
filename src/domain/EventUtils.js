import { DateTime } from "luxon";

export function parseEventDate(date) {
  if (date.dateTime) {
    return DateTime.fromISO(date.dateTime);
  }
  return DateTime.fromISO(date.date);
}  

export function formatDate(date) {
  const parsed = parseEventDate(date);
  if (date.dateTime) {
    return parsed.toLocaleString(
      DateTime.DATETIME_FULL
    );
  }
  return parsed.toLocaleString(DateTime.DATE_FULL);
}

export function groupByYearAndDate(events) {
  const byYearAndMonth = {};
  events.forEach((e) => {
    const date = parseEventDate(e.start);
    const year = date.year;
    const month = date.month;
    let yearEvents = byYearAndMonth[year];
    if (!yearEvents) {
      yearEvents = {}
      byYearAndMonth[year] = yearEvents;
    };
    let monthEvents = yearEvents[month];
    if (!monthEvents) {
      monthEvents = [];
      yearEvents[month] = monthEvents;
    }
    monthEvents.push(e);
  });
  return byYearAndMonth;
}

export function formatMonth(monthNumber) {
  return DateTime.now().set({ month: monthNumber }).toFormat('MMMM');
}
