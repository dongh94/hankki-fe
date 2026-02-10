import { Link } from 'react-router-dom';
import { useUserName } from '@/entities/user';
import { useRooms, useMyRoom } from '@/entities/room';
import { CreateRoomFloatingButton } from '@/features/create-room-button';
import { MainInvite } from '@/widgets/main-invite';
import { MainCardList } from '@/widgets/main-card-list';
import { AUTH_USER_ID_KEY } from '@/shared/api';

const fixedAreaStyle: React.CSSProperties = {
  zIndex: 10,
  padding: '50px 20px 16px',
  position: 'sticky',
  top: 0,
  margin: '0 -20px',
  backgroundColor: '#fff',
};

export function MainPage() {
  const userId = Number(localStorage.getItem(AUTH_USER_ID_KEY) ?? 0);
  const { data: username = '' } = useUserName(userId);
  const { data: firstPageRooms } = useRooms(0);
  const { myRoomInfo, isInvite } = useMyRoom(firstPageRooms ?? [], userId);

  return (
    <>
      <CreateRoomFloatingButton />
      <h1 className="a11y-hidden">방 리스트 메인 페이지</h1>
      <div style={fixedAreaStyle}>
        <h2 style={{ fontFamily: 'Pretendard-ExtraBold', fontSize: 32 }}>
          안녕하세요{' '}
          <Link to="/mypage" style={{ color: 'inherit', textDecoration: 'underline' }}>
            {username}
          </Link>{' '}
          님
        </h2>
        <p style={{ fontSize: 20, color: 'var(--gray-450)' }}>
          오늘 점심멤버를 찾아보세요
        </p>
        {isInvite && myRoomInfo && <MainInvite myRoomInfo={myRoomInfo} />}
      </div>
      <MainCardList />
    </>
  );
}
