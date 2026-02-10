import { useState, useEffect, useRef, useCallback } from 'react';
import { useRooms, useMyRoom } from '@/entities/room';
import { MainCardUi } from '@/widgets/main-card-ui';
import { MainFilter } from '@/widgets/main-filter';
import { AUTH_USER_ID_KEY } from '@/shared/api';
import type { RoomListItem } from '@/entities/room';

export function MainCardList() {
  const myId = Number(localStorage.getItem(AUTH_USER_ID_KEY) ?? 0);
  const [page, setPage] = useState(0);
  const [isActiveOnly, setIsActiveOnly] = useState(false);
  const [allRooms, setAllRooms] = useState<RoomListItem[]>([]);
  const triggerRef = useRef<HTMLDivElement>(null);

  const { data: pageData, isLoading } = useRooms(page);

  useEffect(() => {
    if (!pageData) return;
    setAllRooms((prev) => (page === 0 ? pageData : [...prev, ...pageData]));
  }, [pageData, page]);

  const roomsSnapshot = allRooms;
  const { myRoomInfo } = useMyRoom(roomsSnapshot, myId);
  const displayRooms = isActiveOnly
    ? (allRooms ?? []).filter((r) => r.userDetails.length !== r.limitedAttendees)
    : allRooms ?? [];
  const isEmpty = displayRooms.length === 0 && !isLoading;

  const handleIntersect = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      if (entries[0]?.isIntersecting && pageData?.length) {
        setPage((p) => p + 1);
      }
    },
    [pageData?.length]
  );

  useEffect(() => {
    const el = triggerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(handleIntersect, { threshold: 1 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [handleIntersect]);

  return (
    <>
      <div
        css={{
          display: 'flex',
          position: 'sticky',
          top: myRoomInfo ? 296 : 144,
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: 16,
          color: 'var(--gray-350)',
          margin: '0 -20px',
          padding: '0 20px',
          fontFamily: 'Pretendard-ExtraBold',
          backgroundColor: '#fff',
        }}
      >
        <p>
          총 <span style={{ color: 'var(--blue-350)' }}>{displayRooms.length}</span>개
        </p>
        <MainFilter isActive={isActiveOnly} onClick={() => setIsActiveOnly((a) => !a)} />
      </div>

      {isEmpty && (
        <div
          css={{
            width: '100%',
            textAlign: 'center',
            color: 'var(--gray-350)',
            marginTop: 150,
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              marginBottom: 12,
              background: 'no-repeat center url("/assets/icon/food-icon.svg")',
              display: 'inline-block',
            }}
          />
          <p>아직 만들어진 방이 없습니다!</p>
        </div>
      )}

      {!isEmpty && (
        <div
          css={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 24,
            '@media (max-width: 1024px)': { flexDirection: 'column' },
          }}
        >
          {displayRooms.map((room) => (
            <MainCardUi
              key={room.roomId}
              room={room}
              isMyRoom={myRoomInfo?.roomId === room.roomId}
            />
          ))}
        </div>
      )}

      <div ref={triggerRef} style={{ height: 1 }} aria-hidden />
    </>
  );
}
