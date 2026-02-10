import { useEffect, useRef, useCallback } from 'react';

// Kakao Maps SDK types are loaded globally; use loose typing to avoid conflict with shared/lib
/* eslint-disable @typescript-eslint/no-explicit-any */
type KakaoMaps = any;

type Props = {
  lat: number;
  lng: number;
  placeUrl?: string;
  className?: string;
};

export function KakaoMap({ lat, lng, placeUrl, className }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const markerRef = useRef<any>(null);
  const listenerRef = useRef<any>(null);

  const loadMap = useCallback(() => {
    const container = containerRef.current;
    const kakao = (window as any).kakao as KakaoMaps;
    if (!container || !kakao?.maps || Number.isNaN(lat) || Number.isNaN(lng)) return;

    const position = new kakao.maps.LatLng(lat, lng);

    const openUrl = () => {
      if (placeUrl) window.open(placeUrl, '_blank');
    };

    if (mapRef.current) {
      mapRef.current.setCenter(position);
      if (markerRef.current) {
        if (listenerRef.current && kakao.maps.event.removeListener) {
          kakao.maps.event.removeListener(listenerRef.current);
        }
        markerRef.current.setMap(null);
      }
      markerRef.current = new kakao.maps.Marker({ position });
      markerRef.current.setMap(mapRef.current);
      listenerRef.current = kakao.maps.event.addListener(markerRef.current, 'click', openUrl);
      return;
    }

    const options = { center: position, level: 5 };
    mapRef.current = new kakao.maps.Map(container, options);
    mapRef.current.setDraggable(true);
    markerRef.current = new kakao.maps.Marker({ position });
    markerRef.current.setMap(mapRef.current);
    listenerRef.current = kakao.maps.event.addListener(markerRef.current, 'click', openUrl);
  }, [lat, lng, placeUrl]);

  useEffect(() => {
    const appKey = import.meta.env.VITE_KAKAO_APP_KEY;
    if (!appKey || Number.isNaN(lat) || Number.isNaN(lng)) return;

    const run = () => {
      const kakao = (window as any).kakao as KakaoMaps;
      if (kakao?.maps?.load) {
        kakao.maps.load(() => setTimeout(loadMap, 100));
      } else if (kakao?.maps) {
        setTimeout(loadMap, 100);
      } else {
        import('@/shared/lib').then(({ loadKakaoMapScript }) => {
          loadKakaoMapScript(appKey).then(() => {
            const k = (window as any).kakao as KakaoMaps;
            if (k?.maps?.load) {
              k.maps.load(() => setTimeout(loadMap, 150));
            } else {
              setTimeout(loadMap, 150);
            }
          });
        });
      }
    };
    const t = setTimeout(run, 200);
    return () => clearTimeout(t);
  }, [lat, lng, loadMap]);

  const hasCoords = !Number.isNaN(lat) && !Number.isNaN(lng) && lat !== 0 && lng !== 0;

  if (!hasCoords) return null;

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        width: '100%',
        minHeight: 200,
        height: 200,
        marginTop: 12,
        borderRadius: 4,
        background: 'var(--gray-250, #f0f0f0)',
      }}
      aria-hidden
    />
  );
}
