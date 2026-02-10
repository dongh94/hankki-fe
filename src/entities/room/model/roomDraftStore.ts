import { atom } from 'recoil';
import type { RoomCreateType } from '../types';

const defaultDraft: RoomCreateType = {
  title: '',
  description: '',
  restaurantName: '',
  restaurantLocation: '',
  locationUrl: '',
  restaurantCategory: '',
  restaurantLatitude: 0,
  restaurantLongitude: 0,
  lunchTime: '',
  limitedAttendees: 2,
  userId: 0,
};

export const roomDraftState = atom<RoomCreateType>({
  key: 'roomDraft',
  default: defaultDraft,
});
