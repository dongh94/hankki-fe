import type { RoomListItem } from '../types';

export function useMyRoom(rooms: RoomListItem[], myId: number) {
  const myRoomInfo = rooms.find((room) =>
    room.userDetails.some((u) => u.userId != null && u.userId === myId)
  );
  const isInvite = !!myRoomInfo;
  return { myRoomInfo: myRoomInfo ?? null, isInvite };
}
