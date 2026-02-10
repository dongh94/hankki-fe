import { useQuery } from "react-query";
import { sortedTime } from "@/shared/lib";
import { fetchRooms } from "../api/roomsApi";
import { AUTH_USER_ID_KEY } from "@/shared/api";

export function useRooms(page: number) {
  const userId = Number(localStorage.getItem(AUTH_USER_ID_KEY) ?? 0);

  return useQuery(
    ["rooms", page, userId],
    async () => {
      const list = await fetchRooms(page, userId);
      return [...list].sort(sortedTime);
    },
    {
      enabled: userId > 0,
      // 데이터가 stale일 때만 마운트 시 refetch함. 0이면 메인 재진입 시마다 서버에 다시 요청함.
      staleTime: 0,
    },
  );
}
