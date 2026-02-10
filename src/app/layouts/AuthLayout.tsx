import { Navigate, Outlet } from 'react-router-dom';
import { AUTH_TOKEN_KEY } from '@/shared/api';

/**
 * 인증이 필요한 경로를 감싸는 레이아웃.
 * 토큰이 없으면 로그인(/)으로 리다이렉트하고,
 * 있으면 자식 라우트(Outlet)만 렌더한다.
 * 401/토큰 만료 시 로그아웃은 http 인터셉터(clearAuthAndRedirect)에서 처리.
 */
export function AuthLayout() {
  const hasToken = !!localStorage.getItem(AUTH_TOKEN_KEY);
  if (!hasToken) return <Navigate to="/" replace />;
  return <Outlet />;
}
