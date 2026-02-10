import { useLocation, useNavigate } from 'react-router-dom';
import { useQueryClient } from 'react-query';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { roomDraftState } from '@/entities/room';
import { createRoom } from '@/entities/room';
import { participateInRoom } from '@/entities/user';
import { modalVisibleState, modalParticipateRoomIdState } from '@/features/modal';
import { AUTH_USER_ID_KEY } from '@/shared/api';
import { css } from '@emotion/react';

const contentStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const headingStyle = css`
  font-family: Pretendard-ExtraBold;
  font-size: 20px;
  padding-bottom: 8px;
`;

const descStyle = css`
  font-family: Pretendard-Medium;
  font-size: 16px;
  color: var(--gray-450);
  padding-bottom: 40px;
`;

const buttonGroupStyle = css`
  display: flex;
  justify-content: center;
  gap: 16px;
`;

const submitBtnStyle = css`
  width: 45%;
  height: 48px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  color: white;
  background-color: var(--blue-350);
  border: 0;
  cursor: pointer;
`;

const resetBtnStyle = css`
  width: 45%;
  height: 48px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  color: black;
  background-color: var(--gray-250);
  border: 0;
  cursor: pointer;
`;

export function ModalContent() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const setModalVisible = useSetRecoilState(modalVisibleState);
  const setParticipateRoomId = useSetRecoilState(modalParticipateRoomIdState);
  const roomDraft = useRecoilValue(roomDraftState);
  const participateRoomId = useRecoilValue(modalParticipateRoomIdState);

  const isCreate = location.pathname === '/create';
  /** 참여하기 모달: Recoil에 저장된 방 ID 사용 (포스트 페이지에서 열 때 설정됨) */
  const postId = participateRoomId;
  const userId = Number(localStorage.getItem(AUTH_USER_ID_KEY) ?? 0);

  const close = () => {
    setModalVisible(false);
    setParticipateRoomId(null);
  };

  const handleCreateSubmit = async () => {
    try {
      const { roomId } = await createRoom(roomDraft, userId);
      await queryClient.invalidateQueries({ queryKey: ['rooms'] });
      close();
      navigate(`/${roomId}`);
    } catch (err) {
      console.error(err);
    }
  };

  const handlePostSubmit = async () => {
    if (postId == null) return;
    try {
      await participateInRoom(postId, userId);
      await queryClient.invalidateQueries({ queryKey: ['room', 'details', postId] });
      await queryClient.invalidateQueries({ queryKey: ['room', 'users', postId] });
      await queryClient.invalidateQueries({ queryKey: ['rooms'] });
      close();
    } catch (err) {
      console.error(err);
    }
  };

  if (isCreate) {
    return (
      <>
        <div css={contentStyle}>
          <h1 css={headingStyle}>점심 메이트를 등록하시겠습니까?</h1>
          <p css={descStyle}>점심 메이트는 한번에 한방만 참여가 가능합니다.</p>
        </div>
        <div css={buttonGroupStyle}>
          <button type="button" css={submitBtnStyle} onClick={handleCreateSubmit}>
            점심 방 만들기
          </button>
          <button type="button" css={resetBtnStyle} onClick={close}>
            나중에 만들기
          </button>
        </div>
      </>
    );
  }

  if (postId != null && postId > 0) {
    return (
      <>
        <div css={contentStyle}>
          <h1 css={headingStyle}>점심 메이트로 참여하시겠습니까?</h1>
          <p css={descStyle}>점심 메이트는 한번에 한방만 참여가 가능합니다.</p>
        </div>
        <div css={buttonGroupStyle}>
          <button type="button" css={submitBtnStyle} onClick={handlePostSubmit}>
            참여할게요
          </button>
          <button type="button" css={resetBtnStyle} onClick={close}>
            더 둘러볼게요
          </button>
        </div>
      </>
    );
  }

  return null;
}
