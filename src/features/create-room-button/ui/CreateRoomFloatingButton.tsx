import { useNavigate } from 'react-router-dom';
import { css } from '@emotion/react';
import { floatingButtonBase, floatingButtonBottom } from '@/shared/ui/FloatingButton';

const buttonStyle = css`
  ${floatingButtonBase};
  ${floatingButtonBottom};
  background-image: url('/assets/icon/post_plus_icon.svg');
  &:hover {
    background-image: url('/assets/icon/post_plus_icon.svg');
  }
`;

export function CreateRoomFloatingButton() {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      css={buttonStyle}
      onClick={() => navigate('/create')}
      aria-label="점심 방 만들기"
    />
  );
}
