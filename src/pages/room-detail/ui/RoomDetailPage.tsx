import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useRoomDetails } from '@/entities/room-details';
import { AUTH_USER_ID_KEY } from '@/shared/api';
import { HomeFloatingButton } from '@/features/home-button';
import { DeleteRoomFloatingButton } from '@/features/delete-room-button';
import { Button } from '@/shared/ui/Button';
import { modalVisibleState, modalParticipateRoomIdState } from '@/features/modal';
import { useSetRecoilState } from 'recoil';
import { setTimeDigit } from '@/shared/lib';
import { RoomDetailHeader } from '@/widgets/room-detail-header';
import { RoomDetailDescription } from '@/widgets/room-detail-description';
import { RoomParticipants } from '@/widgets/room-participants';
import { getRoomParticipateButtonInfo } from '@/features/room-participate';

export function RoomDetailPage() {
  const { roomId: roomIdParam } = useParams<{ roomId: string }>();
  const navigate = useNavigate();
  const setModalVisible = useSetRecoilState(modalVisibleState);
  const setParticipateRoomId = useSetRecoilState(modalParticipateRoomIdState);
  const roomId = roomIdParam ? Number(roomIdParam) : null;
  const { details, users } = useRoomDetails(roomId);

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
  const roomDetails = details.data;
  const roomParticipants = users.data;
  if (!roomDetails || !roomParticipants) return null;

  const currentUserId = Number(localStorage.getItem(AUTH_USER_ID_KEY) ?? 0);
  const btnInfo = getRoomParticipateButtonInfo(roomParticipants, currentUserId);
  const hours = setTimeDigit(new Date(roomDetails.lunchTime).getHours());
  const minutes = setTimeDigit(new Date(roomDetails.lunchTime).getMinutes());

  const isCreator = roomDetails.creatorId != null && roomDetails.creatorId === currentUserId;

  return (
    <>
      {isCreator && roomId != null && <DeleteRoomFloatingButton roomId={roomId} />}
      <HomeFloatingButton />
      <h1 className="a11y-hidden">방 상세</h1>
      <RoomDetailHeader title={roomDetails.title} description={roomDetails.description} />
      <section style={{ display: 'flex', flexDirection: 'column', gap: 24, padding: 24 }}>
        <RoomDetailDescription
          restaurantName={roomDetails.restaurantName}
          restaurantLocation={roomDetails.restaurantLocation}
          restaurantCategory={roomDetails.restaurantCategory}
          status={btnInfo.status}
          hours={hours}
          minutes={minutes}
          latitude={roomDetails.restaurantLatitude}
          longitude={roomDetails.restaurantLongitude}
          locationUrl={roomDetails.locationUrl}
        />
        <RoomParticipants
          userList={roomParticipants.userList}
          limitedAttendees={roomParticipants.limitedAttendees}
        />
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
