export interface RoomSortItem {
  lunchTimeHour: number;
  lunchTimeMinute: number;
}

/** 점심시간 끝나는 순으로 정렬 (늦은 시간 우선) */
export function sortedTime(a: RoomSortItem, b: RoomSortItem): number {
  const minA = a.lunchTimeHour * 60 + a.lunchTimeMinute;
  const minB = b.lunchTimeHour * 60 + b.lunchTimeMinute;
  return minB - minA;
}
