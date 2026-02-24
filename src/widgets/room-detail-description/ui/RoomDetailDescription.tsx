import { Label } from '@/shared/ui/Label';
import { KakaoMap } from '@/widgets/kakao-map';
import type { ParticipateStatus } from '@/features/room-participate';
import { css } from '@emotion/react';

type Props = {
  restaurantName: string;
  restaurantLocation: string;
  restaurantCategory: string;
  status: ParticipateStatus;
  hours: string;
  minutes: string;
  latitude?: number;
  longitude?: number;
  locationUrl?: string;
};

const sectionStyle = css`
  padding: 24px;
  border: solid 1px var(--gray-250);
  border-radius: 12px;
  box-shadow: 4px 4px 16px rgba(0, 0, 0, 0.05);
`;

export function RoomDetailDescription({
  restaurantName,
  restaurantLocation,
  restaurantCategory,
  status,
  hours,
  minutes,
  latitude = 0,
  longitude = 0,
  locationUrl,
}: Props) {
  return (
    <section css={sectionStyle}>
      <ul style={{ display: 'flex', gap: 6, listStyle: 'none', padding: 0, margin: 0 }}>
        {status === 'belong' && (
          <Label tag="참여중" bg="var(--blue-350)" color="var(--white-150)" />
        )}
        {status === 'full' && (
          <Label tag="마감" bg="var(--red-150)" color="var(--red-250)" />
        )}
        <Label tag={restaurantCategory} />
      </ul>
      <h2
        css={{
          fontFamily: 'Pretendard-ExtraBold',
          fontSize: 24,
          paddingTop: 8,
          paddingBottom: 14,
          borderBottom: 'solid 1px var(--gray-250)',
        }}
      >
        {restaurantName}
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, paddingTop: 14 }}>
        <div style={{ display: 'flex', gap: 8 }}>
          <img src="/assets/icon/location_icon.svg" alt="" width={24} height={24} />
          <p style={{ fontSize: 16, color: 'var(--gray-450)', margin: 0 }}>{restaurantLocation}</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <img src="/assets/icon/time_icon.svg" alt="" width={24} height={24} />
          <p style={{ fontSize: 16, color: 'var(--gray-450)', margin: 0 }}>
            {hours}시 {minutes}분 점심식사
          </p>
        </div>
      </div>
      {latitude !== 0 && longitude !== 0 && (
        <div style={{ marginTop: 12 }}>
          <KakaoMap lat={latitude} lng={longitude} placeUrl={locationUrl} />
        </div>
      )}
    </section>
  );
}
