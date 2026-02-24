import { css } from '@emotion/react';

type Props = { title: string; description: string };

const titleStyle = css`
  font-family: Pretendard-ExtraBold;
  font-size: 32px;
  padding-top: 80px;
  padding-bottom: 24px;
`;
const descStyle = css`
  font-size: 20px;
  color: var(--gray-450);
  padding-bottom: 40px;
`;

export function RoomDetailHeader({ title, description }: Props) {
  return (
    <div>
      <h1 css={titleStyle}>{title}</h1>
      <p css={descStyle}>{description}</p>
    </div>
  );
}
