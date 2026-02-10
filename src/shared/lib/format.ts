export const setTimeDigit = (time: number): string =>
  time < 10 ? String(time).padStart(2, '0') : String(time);

export const setDateString = (customHour: number, customMinute: number): string => {
  const date = new Date();
  const year = date.getFullYear();
  const month = setTimeDigit(date.getMonth() + 1);
  const day = setTimeDigit(date.getDate());
  return `${year}-${month}-${day}T${setTimeDigit(customHour)}:${setTimeDigit(customMinute)}:00`;
};

export const formatDate = (date: string): string =>
  new Date(date).toLocaleDateString('ko-KR');
