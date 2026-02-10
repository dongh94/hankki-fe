import type { PostUserList } from '@/entities/post';

export type ParticipateStatus = 'belong' | 'full' | 'none';

export type PostParticipateButtonInfo = {
  text: string;
  disable: boolean;
  status: ParticipateStatus;
};

export function getPostParticipateButtonInfo(
  userList: PostUserList,
  currentUserId: number
): PostParticipateButtonInfo {
  const isBelong = userList.userList.some((u) => u.userId === currentUserId);
  const isFull = userList.userList.length >= userList.limitedAttendees;

  if (isBelong) {
    return { text: '이미 참여중인 방입니다.', disable: true, status: 'belong' };
  }
  if (isFull) {
    return { text: '이미 인원이 마감된 방입니다.', disable: true, status: 'full' };
  }
  return { text: '점심 방 참여하기', disable: false, status: 'none' };
}
