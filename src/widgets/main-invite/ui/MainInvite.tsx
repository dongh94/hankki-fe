import { useNavigate } from 'react-router-dom';
import type { RoomListItem } from '@/entities/room';
import { css } from '@emotion/react';

type Props = { myRoomInfo: RoomListItem };

function countTime(room: RoomListItem): string {
  const now = new Date();
  const currentHour = now.getHours();
  const currentMin = now.getMinutes();
  let hour = room.lunchTimeHour - currentHour;
  let min = room.lunchTimeMinute - currentMin;

  if (hour <= 0 && min <= 0) return '점심 마감';
  if (hour > 0 && min < 0) {
    hour -= 1;
    min += 60;
  }
  if (hour <= 0 && min > 0) return `${min}분 뒤 점심시간`;
  return `${hour}시간 ${min}분 뒤 점심시간`;
}

const sectionStyle = css`
  width: 100%;
  padding: 16px;
  background-color: var(--blue-250);
  border-radius: 8px;
  margin-top: 24px;
  cursor: pointer;
  border: 0;
  text-align: left;
  font: inherit;
`;

export function MainInvite({ myRoomInfo }: Props) {
  const navigate = useNavigate();

  return (
    <section
      css={sectionStyle}
      onClick={() => navigate(`/${myRoomInfo.roomId}`)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && navigate(`/${myRoomInfo.roomId}`)}
    >
      <div
        css={{
          fontSize: 14,
          backgroundColor: 'var(--blue-350)',
          borderRadius: 50,
          padding: '6px 12px',
          color: 'white',
          display: 'inline-block',
        }}
      >
        참여중 <span style={{ fontFamily: 'Pretendard-ExtraBold' }}>{countTime(myRoomInfo)}</span>
      </div>
      <h3 style={{ fontSize: 18, fontFamily: 'Pretendard-ExtraBold', margin: '8px 0 4px 0' }}>
        {myRoomInfo.title}
      </h3>
      <p style={{ fontSize: 16, color: 'var(--gray-450)' }}>{myRoomInfo.restaurantName}</p>
    </section>
  );
}
