const TORONTO_TZ = "America/Toronto";

function getTimeZoneOffsetMs(date: Date, timeZone: string) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);

  const value = (type: Intl.DateTimeFormatPartTypes) =>
    Number(parts.find((part) => part.type === type)?.value ?? "0");

  const hour = value("hour") === 24 ? 0 : value("hour");
  const asUtc = Date.UTC(
    value("year"),
    value("month") - 1,
    value("day"),
    hour,
    value("minute"),
    value("second"),
  );

  return asUtc - date.getTime();
}

export function torontoInputToIso(local: string) {
  const [datePart, timePart] = local.split("T");
  if (!datePart || !timePart) {
    throw new Error("Invalid date");
  }

  const [year, month, day] = datePart.split("-").map(Number);
  const [hour, minute] = timePart.split(":").map(Number);
  const utcGuess = new Date(Date.UTC(year, month - 1, day, hour, minute));
  const offset = getTimeZoneOffsetMs(utcGuess, TORONTO_TZ);
  return new Date(utcGuess.getTime() - offset).toISOString();
}

export function isoToDatetimeLocal(iso: string) {
  const date = new Date(iso);
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: TORONTO_TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);

  const value = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value ?? "";

  return `${value("year")}-${value("month")}-${value("day")}T${value("hour")}:${value("minute")}`;
}

export function formatEventDate(iso: string) {
  return new Intl.DateTimeFormat("en-CA", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: TORONTO_TZ,
  }).format(new Date(iso));
}

export function formatEventRange(startsAt: string, endsAt: string | null) {
  const start = formatEventDate(startsAt);
  if (!endsAt) return start;
  return `${start} – ${formatEventDate(endsAt)}`;
}

export function isPastEvent(startsAt: string, endsAt?: string | null) {
  const end = new Date(endsAt ?? startsAt);
  return end.getTime() < Date.now();
}
