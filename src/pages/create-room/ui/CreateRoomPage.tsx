import { useUserName } from '@/entities/user';
import { AUTH_USER_ID_KEY } from '@/shared/api';
import { HomeFloatingButton } from '@/features/home-button';
import { CreateRoomForm } from '@/widgets/create-room-form';

const userId = Number(localStorage.getItem(AUTH_USER_ID_KEY) ?? 0);

export function CreateRoomPage() {
  const { data: username = '유저' } = useUserName(userId);

  return (
    <>
      <HomeFloatingButton />
      <h1 className="a11y-hidden">점심 방 만들기</h1>
      <p style={{ fontFamily: 'Pretendard-ExtraBold', fontSize: 32, marginTop: 48 }}>
        {username}님
      </p>
      <p style={{ marginBottom: 24 }}>점심 메이트를 모집하세요</p>
      <CreateRoomForm />
    </>
  );
}
