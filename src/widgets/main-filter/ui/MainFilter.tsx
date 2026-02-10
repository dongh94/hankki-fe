import { css } from '@emotion/react';

type Props = { isActive: boolean; onClick: () => void };

const buttonStyle = css`
  color: var(--gray-300);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 14px;
  border: 0;
  background: none;
  cursor: pointer;
  font: inherit;
`;

const checkStyle = (active: boolean) => css`
  display: inline-block;
  margin-right: 8px;
  width: 24px;
  height: 24px;
  border-radius: 100%;
  background: ${active ? 'var(--blue-350)' : 'var(--gray-300)'} no-repeat center
    url('/assets/icon/check-icon.svg');
`;

export function MainFilter({ isActive, onClick }: Props) {
  return (
    <button
      type="button"
      css={[buttonStyle, { color: isActive ? 'var(--gray-450)' : undefined }]}
      onClick={onClick}
      aria-pressed={isActive}
      aria-label="활성화만 보기"
    >
      <span css={checkStyle(isActive)} />
      활성화만 보기
    </button>
  );
}
