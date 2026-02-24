import type { UserListUser } from '@/entities/room-details';
import { css } from '@emotion/react';

type Props = { userList: UserListUser[]; limitedAttendees: number };

const articleStyle = css`
  padding: 24px 24px 0 24px;
  border: solid 1px var(--gray-250);
  border-radius: 12px;
  box-shadow: 4px 4px 16px rgba(0, 0, 0, 0.05);
`;

export function RoomParticipants({ userList, limitedAttendees }: Props) {
  return (
    <article css={articleStyle}>
      <div style={{ display: 'flex', gap: 12 }}>
        <h3 style={{ fontFamily: 'Pretendard-ExtraBold', fontSize: 16, color: 'var(--gray-450)', margin: 0 }}>
          참여중인 인원
        </h3>
        <p style={{ fontSize: 16, color: 'var(--blue-350)', margin: 0 }}>
          {userList.length} / {limitedAttendees}
        </p>
      </div>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {userList.map((user, i) => (
          <li
            key={user.userId}
            css={{
              display: 'flex',
              gap: 16,
              alignItems: 'center',
              padding: '16px 0',
              borderBottom: i === userList.length - 1 ? 'none' : 'solid 1px var(--gray-250)',
            }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                backgroundColor: 'var(--blue-350)',
                borderRadius: '100%',
              }}
            />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <h4 style={{ fontFamily: 'Pretendard-ExtraBold', fontSize: 16, margin: 0 }}>
                {user?.name}
              </h4>
              <p style={{ fontSize: 14, color: 'var(--gray-350)', margin: 0 }}>{user?.email}</p>
            </div>
          </li>
        ))}
      </ul>
    </article>
  );
}
