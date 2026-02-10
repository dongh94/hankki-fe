import { useNavigate } from 'react-router-dom';
import { Label } from '@/shared/ui/Label';
import { MainUserList } from './MainUserList';
import type { RoomListItem } from '@/entities/room';
import { css } from '@emotion/react';

type Props = { room: RoomListItem; isMyRoom: boolean };

function timeLabel(room: RoomListItem): string {
  if (room.lunchTimeMinute === 0) return `${room.lunchTimeHour}시 점심시간`;
  return `${room.lunchTimeHour}시 ${room.lunchTimeMinute}분 점심시간`;
}

const cardStyle = css`
  display: block;
  width: calc(50% - 12px);
  padding: 24px;
  border: 1px solid var(--gray-250);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.08);
  text-decoration: none;
  color: inherit;
  @media (max-width: 1024px) {
    width: 100%;
  }
  &:hover {
    background-color: #f9f9f9;
  }
  &:active {
    transform: scale(0.98);
  }
`;

export function MainCardUi({ room, isMyRoom }: Props) {
  const navigate = useNavigate();

  return (
    <article
      css={cardStyle}
      onClick={() => navigate(`/${room.roomId}`)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && navigate(`/${room.roomId}`)}
    >
      <div css={{ marginBottom: 8 }}>
        <Label tag={room.restaurantCategory} />
        <span style={{ marginLeft: 8 }}><Label tag={timeLabel(room)} /></span>
      </div>
      <h3
        style={{
          fontFamily: 'Pretendard-ExtraBold',
          fontSize: 22,
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
        }}
      >
        {room.title}
      </h3>
      <hr style={{ border: '0.25px solid var(--gray-250)', margin: '12px 0' }} />
      <h4 style={{ fontFamily: 'Pretendard-ExtraBold', fontSize: 16 }}>{room.restaurantName}</h4>
      <p
        style={{
          fontSize: 14,
          color: 'var(--gray-450)',
          marginTop: 12,
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
        }}
      >
        {room.restaurantLocation}
      </p>
      <MainUserList
        limit={room.limitedAttendees}
        userCount={room.userDetails.length}
        roomId={room.roomId}
        isMyRoom={isMyRoom}
        isFull={room.userDetails.length >= room.limitedAttendees}
      />
    </article>
  );
}
