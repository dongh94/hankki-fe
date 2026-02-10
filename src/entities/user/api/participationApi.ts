import { http } from '@/shared/api';
import { apiURL } from '@/shared/api';

export async function participateInRoom(roomId: number, userId: number): Promise<void> {
  await http.patch(apiURL.users.participation(roomId), {}, {
    headers: { 'USER-ID': String(userId) },
  });
}
