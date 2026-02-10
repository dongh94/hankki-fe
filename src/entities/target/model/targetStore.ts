import { atom } from 'recoil';
import type { Target } from '../types';

const defaultTarget: Target = {
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

export const targetState = atom<Target>({
  key: 'target',
  default: defaultTarget,
});
