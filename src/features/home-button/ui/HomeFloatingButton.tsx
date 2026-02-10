import { useNavigate } from 'react-router-dom';
import { css } from '@emotion/react';
import { floatingButtonBase, floatingButtonTop } from '@/shared/ui/FloatingButton';

const buttonStyle = css`
  ${floatingButtonBase};
  ${floatingButtonTop};
  background-image: url('/assets/icon/Home_fill.svg');
  &:hover {
    background-image: url('/assets/icon/Home_fill.svg');
  }
`;

export function HomeFloatingButton() {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      css={buttonStyle}
      onClick={() => navigate('/main')}
      aria-label="메인으로"
    />
  );
}
