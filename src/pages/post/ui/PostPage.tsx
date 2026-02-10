import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePost } from '@/entities/post';
import { AUTH_USER_ID_KEY } from '@/shared/api';
import { HomeFloatingButton } from '@/features/home-button';
import { DeleteRoomFloatingButton } from '@/features/delete-room-button';
import { Button } from '@/shared/ui/Button';
import { modalVisibleState, modalParticipateRoomIdState } from '@/features/modal';
import { useSetRecoilState } from 'recoil';
import { setTimeDigit } from '@/shared/lib';
import { PostHeader } from '@/widgets/post-header';
import { PostDescription } from '@/widgets/post-description';
import { PostUserList } from '@/widgets/post-user-list';
import { getPostParticipateButtonInfo } from '@/features/post-participate';

export function PostPage() {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const setModalVisible = useSetRecoilState(modalVisibleState);
  const setParticipateRoomId = useSetRecoilState(modalParticipateRoomIdState);
  const roomId = postId ? Number(postId) : null;
  const { details, users } = usePost(roomId);

  useEffect(() => {
    if (!localStorage.getItem(AUTH_USER_ID_KEY)) {
      alert('회원이 아닙니다.');
      navigate('/');
    }
  }, [navigate]);

  if (details.isLoading || users.isLoading) return <div>로딩 중...</div>;
  if (details.error || users.error) {
    navigate('/main');
    return null;
  }
  const post = details.data;
  const userList = users.data;
  if (!post || !userList) return null;

  const currentUserId = Number(localStorage.getItem(AUTH_USER_ID_KEY) ?? 0);
  const btnInfo = getPostParticipateButtonInfo(userList, currentUserId);
  const hours = setTimeDigit(new Date(post.lunchTime).getHours());
  const minutes = setTimeDigit(new Date(post.lunchTime).getMinutes());

  const isCreator = post.creatorId != null && post.creatorId === currentUserId;

  return (
    <>
      {isCreator && roomId != null && <DeleteRoomFloatingButton roomId={roomId} />}
      <HomeFloatingButton />
      <h1 className="a11y-hidden">방 상세</h1>
      <PostHeader title={post.title} description={post.description} />
      <section style={{ display: 'flex', flexDirection: 'column', gap: 24, padding: 24 }}>
        <PostDescription
          restaurantName={post.restaurantName}
          restaurantLocation={post.restaurantLocation}
          restaurantCategory={post.restaurantCategory}
          status={btnInfo.status}
          hours={hours}
          minutes={minutes}
          latitude={post.restaurantLatitude}
          longitude={post.restaurantLongitude}
          locationUrl={post.locationUrl}
        />
        <PostUserList userList={userList.userList} limitedAttendees={userList.limitedAttendees} />
        <div>
          <Button
            disabled={btnInfo.disable}
            onClick={() => {
              if (roomId != null) {
                setParticipateRoomId(roomId);
                setModalVisible(true);
              }
            }}
          >
            {btnInfo.text}
          </Button>
        </div>
      </section>
    </>
  );
}
