import { useRecoilValue } from 'recoil';
import { selectedPlaceState } from '@/entities/selected-place';
import { Label } from '@/shared/ui/Label';
import { KakaoMap } from '@/widgets/kakao-map';

const blockStyle = {
  width: '100%',
  minHeight: 165,
  border: '1px solid var(--gray-250)',
  borderRadius: 10,
  boxShadow: '4px 4px 16px rgba(0,0,0,0.05)',
  marginTop: 16,
  padding: 24,
};

export function RestaurantInfoBlock() {
  const selectedPlace = useRecoilValue(selectedPlaceState);
  const hasPlace = selectedPlace.place_name;

  if (!hasPlace) {
    return (
      <div style={{ ...blockStyle, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--gray-350)' }}>
        <img src="/assets/icon/food-icon.svg" alt="" width={56} height={56} />
        <div>음식점을 검색하세요.</div>
      </div>
    );
  }

  const lat = Number(selectedPlace.y);
  const lng = Number(selectedPlace.x);

  return (
    <div style={{ marginTop: 16, marginBottom: 8 }}>
      <div style={{ ...blockStyle, display: 'flex', flexDirection: 'column' }}>
        <Label tag={selectedPlace.category_name ?? ''} />
        <div style={{ fontFamily: 'Pretendard-ExtraBold', fontSize: 32 }}>{selectedPlace.place_name}</div>
        <hr style={{ border: '1.5px solid var(--gray-250)', margin: '4px 0' }} />
        <div style={{ display: 'flex', gap: 8 }}>
          <img src="/assets/icon/location_icon.svg" alt="" width={32} height={32} />
          <span style={{ color: 'var(--gray-450)' }}>
            {selectedPlace.road_address_name || selectedPlace.address_name}
          </span>
        </div>
      </div>
      <div style={{ marginTop: 12 }}>
        <KakaoMap lat={lat} lng={lng} placeUrl={selectedPlace.place_url} />
      </div>
    </div>
  );
}
