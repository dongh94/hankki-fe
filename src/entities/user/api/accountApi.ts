import { http } from '@/shared/api';
import { apiURL } from '@/shared/api';

export async function withdrawUser(userId: number): Promise<void> {
  await http.delete(apiURL.users.withdraw, {
    headers: { 'USER-ID': String(userId) },
  });
}
