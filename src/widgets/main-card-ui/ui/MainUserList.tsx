import { Label } from '@/shared/ui/Label';
import { css } from '@emotion/react';

type Props = {
  limit: number;
  userCount: number;
  roomId: number;
  isMyRoom: boolean;
  isFull: boolean;
};

const wrapStyle = css`
  display: flex;
  margin-top: 20px;
  align-items: center;
`;

const avatarStyle = css`
  width: 24px;
  height: 24px;
  border-radius: 100%;
  background-color: #ff9356;
  outline: 4px solid #ffffff;
  margin-left: -2px;
  &:first-of-type {
    margin-left: 0;
  }
`;

export function MainUserList({ limit, userCount, isMyRoom, isFull }: Props) {
  const showCount = userCount > 6 ? 5 : userCount;

  return (
    <section css={wrapStyle}>
      <ul style={{ display: 'flex', listStyle: 'none', padding: 0, margin: 0 }}>
        {Array.from({ length: showCount }).map((_, i) => (
          <li key={i} css={avatarStyle} />
        ))}
      </ul>
      <p style={{ fontSize: 13, color: 'var(--gray-450)', margin: '0 12px' }}>
        + {userCount} / {limit}
      </p>
      {isMyRoom && (
        <Label tag="참여중" color="var(--blue-350)" bg="var(--blue-150)" pd="1px 6px" />
      )}
      {isFull && (
        <Label tag="마감" color="var(--red-250)" bg="var(--red-150)" pd="1px 6px" />
      )}
    </section>
  );
}
