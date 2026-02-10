import { http } from '@/shared/api';
import { apiURL } from '@/shared/api';
import type { PostData, PostUserList } from '../types';

export async function fetchRoomDetails(roomId: number, userId: string): Promise<PostData> {
  const { data } = await http.get<PostData>(apiURL.rooms.details(roomId), {
    headers: { 'USER-ID': userId },
  });
  return data;
}

export async function fetchRoomUsers(roomId: number, userId: string): Promise<PostUserList> {
  const { data } = await http.get<PostUserList>(apiURL.rooms.users(roomId), {
    headers: { 'USER-ID': userId },
  });
  return data;
}
