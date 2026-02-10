export interface RoomCreateType {
  title: string;
  description: string;
  restaurantName: string;
  restaurantLocation: string;
  locationUrl: string;
  restaurantCategory: string;
  restaurantLatitude: number;
  restaurantLongitude: number;
  lunchTime: string;
  limitedAttendees: number;
  userId: number;
}

export interface RoomUserDetail {
  userId: number | null;
  userDetails: { userId: number | null; userImage: string };
}

export interface RoomListItem {
  roomId: number;
  restaurantCategory: string;
  lunchTimeHour: number;
  lunchTimeMinute: number;
  title: string;
  restaurantName: string;
  restaurantLocation: string;
  limitedAttendees: number;
  userDetails: RoomUserDetail[];
}

export interface ErrorState {
  search: boolean;
  title: boolean;
  contents: boolean;
  hours: boolean;
  minutes: boolean;
}

export interface ErrorMsg {
  search: string;
  title: string;
  contents: string;
  hours: string;
  minutes: string;
}
