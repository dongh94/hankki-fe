import { atom } from 'recoil';
import type { SelectedPlace } from '../types';

const defaultSelectedPlace: SelectedPlace = {
  address_name: '',
  category_group_code: '',
  category_group_name: '',
  category_name: '',
  distance: '',
  id: '',
  phone: '',
  place_name: '',
  place_url: '',
  road_address_name: '',
  x: '',
  y: '',
};

export const selectedPlaceState = atom<SelectedPlace>({
  key: 'selectedPlace',
  default: defaultSelectedPlace,
});
