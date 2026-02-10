export interface PostData {
  title: string;
  description: string;
  restaurantCategory: string;
  restaurantLocation: string;
  locationUrl: string;
  restaurantName: string;
  lunchTime: string;
  restaurantLatitude: number;
  restaurantLongitude: number;
  /** 방 생성자 userId. 본인 방일 때만 삭제 버튼 노출 */
  creatorId?: number | null;
}

export interface UserListUser {
  name: string;
  email: string;
  image: string;
  userId: number;
}

export interface PostUserList {
  limitedAttendees: number;
  roomId: number;
  userList: UserListUser[];
}
