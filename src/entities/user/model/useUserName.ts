import { useQuery } from 'react-query';
import { http, clearAuthAndRedirect } from '@/shared/api';
import { apiURL } from '@/shared/api';

export function useUserName(userId: number | null) {
  return useQuery(
    ['user', 'name', userId],
    async () => {
      if (userId == null) return '';
      const { data } = await http.get(apiURL.users.getName(userId), {
        headers: { 'USER-ID': String(userId) },
      });
      return (data as { name: string }).name;
    },
    {
      enabled: userId != null && userId > 0,
      staleTime: 1000 * 60,
      retry: 1,
      onError: () => clearAuthAndRedirect(),
    }
  );
}
