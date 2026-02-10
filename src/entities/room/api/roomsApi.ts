import { http } from '@/shared/api';
import { apiURL } from '@/shared/api';
import type { RoomCreateType } from '../types';
import type { RoomListItem } from '../types';

export async function fetchRooms(page: number, userId: number): Promise<RoomListItem[]> {
  const { data } = await http.get<RoomListItem[]>(apiURL.rooms.all, {
    params: { page },
    headers: { 'USER-ID': String(userId) },
  });
  return data;
}

export async function createRoom(room: RoomCreateType, userId: number): Promise<{ roomId: number }> {
  const { data } = await http.post<{ roomId: number }>(apiURL.rooms.create, room, {
    headers: { 'USER-ID': String(userId) },
  });
  return data;
}

export async function deleteRoom(roomId: number, userId: number): Promise<void> {
  await http.delete(apiURL.rooms.delete(roomId), {
    headers: { 'USER-ID': String(userId) },
  });
}
