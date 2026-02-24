import { useForm } from '@tanstack/react-form';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { roomDraftState } from '@/entities/room';
import { selectedPlaceState } from '@/entities/selected-place';
import { modalVisibleState } from '@/features/modal';
import { setDateString } from '@/shared/lib';
import { AUTH_USER_ID_KEY } from '@/shared/api';
import type { SelectedPlace } from '@/entities/selected-place';
import { RestaurantSearch } from './RestaurantSearch';
import { RestaurantInfoBlock } from './RestaurantInfoBlock';
import { TimeDropDown } from './TimeDropDown';
import { Button } from '@/shared/ui/Button';
import { css } from '@emotion/react';

const HOURS = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
const MINUTE_STEPS = [0, 15, 30, 45];

/** 10:00 ~ 19:45 구간을 15분 단위로 생성 (예: ['10:00', '10:15', ..., '19:45']) */
function getLunchTimeOptions(): string[] {
  const options: string[] = [];
  for (const h of HOURS) {
    for (const m of MINUTE_STEPS) {
      options.push(`${h}:${String(m).padStart(2, '0')}`);
    }
  }
  return options;
}

const LUNCH_TIME_OPTIONS = getLunchTimeOptions();

type CreateRoomFormValues = {
  title: string;
  description: string;
  lunchTime: string;
  limitedAttendees: number;
};

function validateFutureTime(lunchTime: string): string | undefined {
  const [hStr, mStr] = lunchTime.split(':');
  const h = Number(hStr);
  const m = Number(mStr ?? 0);
  const now = new Date();
  if (now.getHours() < h) return undefined;
  if (now.getHours() > h) return '현재 이후의 시간을 선택하세요.';
  if (now.getMinutes() < m) return undefined;
  return '현재 이후의 분을 선택하세요.';
}

export function CreateRoomForm() {
  const userId = Number(localStorage.getItem(AUTH_USER_ID_KEY) ?? 0);
  const setDraft = useSetRecoilState(roomDraftState);
  const setModalVisible = useSetRecoilState(modalVisibleState);
  const selectedPlace = useRecoilValue(selectedPlaceState);

  const form = useForm<CreateRoomFormValues>({
    defaultValues: {
      title: '',
      description: '',
      lunchTime: '10:00',
      limitedAttendees: 2,
    },
    onSubmit: async ({ value }) => {
      if (!selectedPlace.place_name) return;
      if (validateFutureTime(value.lunchTime)) return;
      const [h, m] = value.lunchTime.split(':').map(Number);
      setDraft((prev) => ({
        ...prev,
        userId,
        title: value.title,
        description: value.description,
        restaurantName: selectedPlace.place_name,
        restaurantLocation: selectedPlace.address_name,
        restaurantCategory: selectedPlace.category_name ?? '',
        restaurantLatitude: Number(selectedPlace.y) || 0,
        restaurantLongitude: Number(selectedPlace.x) || 0,
        locationUrl: selectedPlace.place_url,
        lunchTime: setDateString(h, m),
        limitedAttendees: value.limitedAttendees,
      }));
      setModalVisible(true);
    },
  });

  const values = form.useStore((s) => s.values);
  const submissionAttempts = form.useStore((s) => s.submissionAttempts);

  const searchError = !selectedPlace.place_name && submissionAttempts > 0;
  const timeError = validateFutureTime(values.lunchTime);

  const handleSelectRestaurant = (t: SelectedPlace) => {
    setDraft((prev) => ({
      ...prev,
      restaurantName: t.place_name,
      restaurantLocation: t.address_name,
      restaurantCategory: t.category_name ?? '',
      restaurantLatitude: Number(t.y),
      restaurantLongitude: Number(t.x),
      locationUrl: t.place_url,
    }));
  };

  return (
    <div css={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
      <div style={{ position: 'relative' }}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <RestaurantSearch
            onSelect={handleSelectRestaurant}
            error={searchError}
            ok={!!selectedPlace.place_name}
            onBlur={() => {}}
          />
          {searchError && (
            <p style={{ fontSize: 14, color: 'var(--red-250)', marginBottom: 32 }}>
              음식점을 필수로 선택해주세요.
            </p>
          )}

          <RestaurantInfoBlock />

          <form.Field
            name="title"
            validators={{
              onChange: ({ value }) =>
                !value?.trim() ? '제목을 필수로 선택해주세요.' : undefined,
              onBlur: ({ value }) =>
                !value?.trim() ? '제목을 필수로 선택해주세요.' : undefined,
              onSubmit: ({ value }) =>
                !value?.trim() ? '제목을 필수로 선택해주세요.' : undefined,
            }}
          >
            {(field) => (
              <div style={{ marginTop: 16 }}>
                <label
                  htmlFor="title"
                  style={{
                    fontFamily: 'Pretendard-ExtraBold',
                    color: 'var(--gray-450)',
                    marginBottom: 8,
                    display: 'block',
                  }}
                >
                  제목
                </label>
                <input
                  id="title"
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="오케스트로 멤버에게 어필할 제목을 입력하세요."
                  css={[
                    inputStyle,
                    field.state.meta.errors?.length && { border: 'solid 1px var(--red-250)' },
                  ]}
                />
                {field.state.meta.errors?.[0] && (
                  <p style={{ fontSize: 14, color: 'var(--red-250)' }}>{field.state.meta.errors[0]}</p>
                )}
              </div>
            )}
          </form.Field>

          <form.Field
            name="description"
            validators={{
              onChange: ({ value }) =>
                !value || value.length < 10 ? '내용을 10자 이상 입력해주세요.' : undefined,
              onBlur: ({ value }) =>
                !value || value.length < 10 ? '내용을 10자 이상 입력해주세요.' : undefined,
              onSubmit: ({ value }) =>
                !value || value.length < 10 ? '내용을 10자 이상 입력해주세요.' : undefined,
            }}
          >
            {(field) => (
              <div style={{ marginTop: 16 }}>
                <label
                  htmlFor="content"
                  style={{
                    fontFamily: 'Pretendard-ExtraBold',
                    color: 'var(--gray-450)',
                    marginBottom: 8,
                    display: 'block',
                  }}
                >
                  내용
                </label>
                <textarea
                  id="content"
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  maxLength={500}
                  placeholder="오케스트로 멤버에게 어필할 내용을 입력하세요."
                  css={[
                    textareaStyle,
                    field.state.meta.errors?.length && { border: 'solid 1px var(--red-250)' },
                  ]}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 14, color: 'var(--red-250)' }}>
                    {field.state.meta.errors?.[0]}
                  </span>
                  <span style={{ color: 'var(--gray-350)' }}>{field.state.value.length} / 500</span>
                </div>
              </div>
            )}
          </form.Field>

          <div
            style={{
              marginTop: 32,
              display: 'flex',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 16,
            }}
          >
            <div style={{ width: '60%' }}>
              <label
                style={{
                  fontFamily: 'Pretendard-ExtraBold',
                  color: 'var(--gray-450)',
                  marginBottom: 8,
                  display: 'block',
                }}
              >
                점심시간
              </label>
              <form.Field name="lunchTime">
                {(field) => (
                  <TimeDropDown
                    options={LUNCH_TIME_OPTIONS}
                    placeholder="시간 선택"
                    value={field.state.value}
                    onChange={(time) => {
                      const err = validateFutureTime(time);
                      if (err) {
                        alert(err);
                        return;
                      }
                      field.handleChange(time);
                    }}
                    error={!!timeError}
                    fullWidth
                  />
                )}
              </form.Field>
              {timeError && submissionAttempts > 0 && (
                <p style={{ fontSize: 14, color: 'var(--red-250)', marginTop: 8 }}>
                  {timeError}
                </p>
              )}
            </div>
            <div>
              <label
                style={{
                  fontFamily: 'Pretendard-ExtraBold',
                  color: 'var(--gray-450)',
                  marginBottom: 8,
                  display: 'block',
                }}
              >
                제한인원
              </label>
              <form.Field name="limitedAttendees">
                {(field) => (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <button
                      type="button"
                      onClick={() =>
                        field.handleChange(Math.max(2, field.state.value - 1))
                      }
                      style={{ width: 48, height: 48, fontSize: 24 }}
                      aria-label="인원 줄이기"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min={2}
                      max={10}
                      value={field.state.value}
                      onChange={(e) =>
                        field.handleChange(
                          Math.min(10, Math.max(2, Number(e.target.value) || 2))
                        )
                      }
                      css={limitInputStyle}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        field.handleChange(Math.min(10, field.state.value + 1))
                      }
                      style={{ width: 48, height: 48, fontSize: 24 }}
                      aria-label="인원 늘리기"
                    >
                      +
                    </button>
                  </div>
                )}
              </form.Field>
            </div>
          </div>

          <div style={{ marginTop: 128, marginBottom: 64 }}>
            <Button type="submit">
              점심 방 만들기
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

const inputStyle = css`
  width: 100%;
  max-height: 56px;
  padding: 16px;
  border: solid 1px var(--gray-250);
  border-radius: 10px;
  font: inherit;
`;

const textareaStyle = css`
  width: 100%;
  min-height: 110px;
  padding: 16px;
  border: solid 1px var(--gray-250);
  border-radius: 10px;
  resize: none;
  font: inherit;
`;

const limitInputStyle = css`
  max-width: 210px;
  width: 80px;
  height: 56px;
  border: solid 1px var(--gray-250);
  border-radius: 10px;
  text-align: center;
  font: inherit;
`;
