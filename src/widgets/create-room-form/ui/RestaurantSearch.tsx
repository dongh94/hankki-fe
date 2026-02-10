import { useState, useCallback, useRef, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { targetState } from '@/entities/target';
import type { Target } from '@/entities/target';
import { searchPlacesByKeyword } from '@/shared/lib';
import { css } from '@emotion/react';

const DEFAULT_CENTER = { x: '126.92782828003486', y: '37.5272141878929' };

type Props = {
  onSelect: (target: Target) => void;
  error: boolean;
  ok: boolean;
  onBlur?: () => void;
};

export function RestaurantSearch({ onSelect, error, ok, onBlur }: Props) {
  const [query, setQuery] = useState('');
  const [list, setList] = useState<Target[]>([]);
  const [active, setActive] = useState(true);
  const [, setTarget] = useRecoilState(targetState);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (list.length === 0) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setList([]);
        setActive(true);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [list.length]);

  const handleSearch = useCallback(async () => {
    const key = import.meta.env.VITE_KAKAO_REST_API_KEY;
    if (!key) {
      console.error('VITE_KAKAO_REST_API_KEY가 설정되지 않았습니다.');
      return;
    }
    try {
      const places = await searchPlacesByKeyword(key, query, {
        x: DEFAULT_CENTER.x,
        y: DEFAULT_CENTER.y,
        radius: 1500,
        size: 15,
        sort: 'distance',
      });
      const asTarget = places as unknown as Target[];
      setList(asTarget);
      if (asTarget.length === 0) {
        alert('검색 결과가 없습니다.');
        setActive(true);
      } else {
        setActive(false);
      }
    } catch (e) {
      console.error(e);
    }
  }, [query]);

  const handleSelect = useCallback(
    (item: Target) => {
      setTarget(item);
      onSelect(item);
      setList([]);
      setQuery('');
      setActive(true);
    },
    [onSelect, setTarget]
  );

  return (
    <div ref={containerRef} css={{ position: 'relative' }}>
      <label htmlFor="restaurant" css={{ fontFamily: 'Pretendard-ExtraBold', color: 'var(--gray-450)', marginBottom: 8, display: 'block' }}>
        음식점 검색
      </label>
      <div>
        <button
          type="button"
          onClick={handleSearch}
          aria-label="검색"
          style={{ position: 'absolute', padding: 12, left: 0, top: 32 }}
        >
          <img src="/assets/icon/search-icon.svg" alt="" width={32} height={32} />
        </button>
        <input
          id="restaurant"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          onBlur={onBlur}
          placeholder="어떤 음식점에서 드실건가요?"
          css={[
            inputStyle,
            error && { border: 'solid 1px var(--red-250)' },
            ok && { border: 'solid 2px var(--green-250)' },
          ]}
        />
        <ul
          css={[
            listStyle,
            active && list.length === 0 && { display: 'none' },
          ]}
        >
          {list.map((item) => (
            <li
              key={item.id || item.place_name}
              css={listItemStyle}
              onClick={() => handleSelect(item)}
              onKeyDown={(e) => e.key === 'Enter' && handleSelect(item)}
              role="button"
              tabIndex={0}
            >
              <p css={{ fontFamily: 'Pretendard-ExtraBold' }}>{item.place_name ?? ''}</p>
              <p css={{ fontSize: 13, color: 'var(--gray-350)' }}>
                {item.road_address_name || item.address_name || ''}
              </p>
              <p css={{ fontSize: 13, color: 'var(--blue-350)' }}>{item.category_name ?? ''}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const inputStyle = css`
  max-height: 56px;
  width: 100%;
  border: solid 1px var(--gray-250);
  border-radius: 10px;
  padding-left: 56px;
  padding-top: 16px;
  padding-bottom: 16px;
  font: inherit;
`;

const listStyle = css`
  z-index: 10;
  position: absolute;
  background: var(--white-150);
  top: 95px;
  left: 0;
  right: 0;
  border: solid 1px var(--gray-250);
  border-radius: 10px;
  max-height: 510px;
  overflow: auto;
  list-style: none;
  padding: 0;
  margin: 0;
`;

const listItemStyle = css`
  margin: 12px;
  padding: 12px;
  cursor: pointer;
  &:hover {
    background-color: var(--blue-150);
  }
`;
