const SDK_URL = 'https://dapi.kakao.com/v2/maps/sdk.js';
const LIBRARIES = 'services,drawing';
const LOCAL_KEYWORD_URL = 'https://dapi.kakao.com/v2/local/search/keyword.json';

let loadPromise: Promise<void> | null = null;

declare global {
  interface Window {
    kakao?: { maps?: unknown; [key: string]: unknown };
  }
}

export function loadKakaoMapScript(appKey: string): Promise<void> {
  if (typeof window !== 'undefined' && window.kakao?.maps) {
    return Promise.resolve();
  }
  if (loadPromise) return loadPromise;
  loadPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = `${SDK_URL}?appkey=${appKey}&autoload=false&libraries=${LIBRARIES}`;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Kakao Map SDK load failed'));
    document.head.appendChild(script);
  });
  return loadPromise;
}

export type PlaceItem = {
  id: string;
  place_name: string;
  address_name: string;
  road_address_name: string;
  category_name: string;
  x: string;
  y: string;
  place_url: string;
  [key: string]: string;
};

export async function searchPlacesByKeyword(
  restApiKey: string,
  keyword: string,
  options?: {
    x?: string;
    y?: string;
    radius?: number;
    size?: number;
    sort?: 'accuracy' | 'distance';
  }
): Promise<PlaceItem[]> {
  if (!keyword.trim()) return [];
  const params = new URLSearchParams();
  params.set('query', keyword.trim());
  if (options?.x != null) params.set('x', options.x);
  if (options?.y != null) params.set('y', options.y);
  if (options?.radius != null) params.set('radius', String(options.radius));
  if (options?.size != null) params.set('size', String(options.size));
  if (options?.sort) params.set('sort', options.sort);

  const res = await fetch(`${LOCAL_KEYWORD_URL}?${params.toString()}`, {
    method: 'GET',
    headers: { Authorization: `KakaoAK ${restApiKey}` },
  });
  if (!res.ok) throw new Error(`Kakao Local API error: ${res.status}`);
  const json = (await res.json()) as { documents?: Array<Record<string, string>> };
  const documents = json.documents ?? [];
  return documents.map((item) => ({
    id: item.id ?? '',
    place_name: item.place_name ?? '',
    address_name: item.address_name ?? '',
    road_address_name: item.road_address_name ?? '',
    category_name: item.category_name ?? '',
    place_url: item.place_url ?? '',
    x: item.x ?? '',
    y: item.y ?? '',
  }));
}
