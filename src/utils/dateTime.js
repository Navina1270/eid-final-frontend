import { format } from "date-fns";

export function formatForDateTimeLocal(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toISOString().slice(0, 16);
}

export function formatDateTimeChart(dateStr){
    const date = new Date(dateStr);
    return format(date, "yyyy-MM-dd HH:mm:ss");
  };
