import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from 'react-query';
import { css } from '@emotion/react';
import { floatingButtonBase, floatingButtonTopSecond } from '@/shared/ui/FloatingButton';
import { deleteRoom } from '@/entities/room';
import { AUTH_USER_ID_KEY } from '@/shared/api';

const buttonStyle = css`
  ${floatingButtonBase};
  ${floatingButtonTopSecond};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 14px;
  font-weight: 700;
  background-image: none;
`;

type Props = { roomId: number };

export function DeleteRoomFloatingButton({ roomId }: Props) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm('이 방을 삭제할까요?')) return;
    const userId = Number(localStorage.getItem(AUTH_USER_ID_KEY) ?? 0);
    setLoading(true);
    try {
      await deleteRoom(roomId, userId);
      await queryClient.invalidateQueries({ queryKey: ['rooms'] });
      navigate('/main');
    } catch (e) {
      console.error(e);
      alert('방 삭제에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      css={buttonStyle}
      onClick={handleDelete}
      disabled={loading}
      aria-label="방 삭제"
    >
      삭제
    </button>
  );
}
