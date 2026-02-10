/**
 * API 경로만 정의. baseURL은 http-client에서 env로 설정됨.
 */
export const apiURL = {
  auth: { refresh: 'auth/refresh' },
  rooms: {
    all: 'rooms/all',
    create: 'rooms',
    details: (roomId: number) => `rooms/${roomId}/details`,
    users: (roomId: number) => `rooms/${roomId}/users`,
    delete: (roomId: number) => `rooms/${roomId}`,
  },
  users: {
    login: 'users/login',
    getName: (userId: number) => `users/${userId}/name`,
    participation: (roomId: number) => `users/${roomId}/participation`,
    withdraw: 'users/me',
  },
} as const;
