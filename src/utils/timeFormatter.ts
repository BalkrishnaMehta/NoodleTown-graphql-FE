export function timeFormatter(start: number, end: number) {
  return formatTime(start) + " - " + formatTime(end);
}

function formatTime(time: number) {
  if (time > 12) {
    return `${time - 12}pm`;
  }
  return time + "am";
}
