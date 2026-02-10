import { atom } from 'recoil';

export const modalVisibleState = atom<boolean>({
  key: 'modalVisible',
  default: false,
});

/** 참여하기 모달에서 사용할 방 ID (포스트 페이지에서 열 때 설정) */
export const modalParticipateRoomIdState = atom<number | null>({
  key: 'modalParticipateRoomId',
  default: null,
});
