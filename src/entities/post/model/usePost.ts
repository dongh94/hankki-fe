import { useQuery } from 'react-query';
import { fetchRoomDetails, fetchRoomUsers } from '../api/postApi';
import { AUTH_USER_ID_KEY } from '@/shared/api';

export function usePost(roomId: number | null) {
  const userId = localStorage.getItem(AUTH_USER_ID_KEY) ?? '0';

  const details = useQuery(
    ['room', 'details', roomId],
    () => fetchRoomDetails(roomId!, userId),
    { enabled: roomId != null && roomId > 0, staleTime: 0 }
  );

  const users = useQuery(
    ['room', 'users', roomId],
    () => fetchRoomUsers(roomId!, userId),
    { enabled: roomId != null && roomId > 0, staleTime: 0 }
  );

  return { details, users };
}
