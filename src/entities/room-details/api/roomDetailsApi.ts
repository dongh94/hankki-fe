import { http } from '@/shared/api';
import { apiURL } from '@/shared/api';
import type { RoomDetails, RoomParticipants } from '../types';

export async function fetchRoomDetails(roomId: number, userId: string): Promise<RoomDetails> {
  const { data } = await http.get<RoomDetails>(apiURL.rooms.details(roomId), {
    headers: { 'USER-ID': userId },
  });
  return data;
}

export async function fetchRoomUsers(roomId: number, userId: string): Promise<RoomParticipants> {
  const { data } = await http.get<RoomParticipants>(apiURL.rooms.users(roomId), {
    headers: { 'USER-ID': userId },
  });
  return data;
}
