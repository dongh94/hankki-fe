import { Route, Routes, Navigate } from 'react-router-dom';
import { AuthLayout } from '@/app/layouts';
import { LoginPage } from '@/pages/login';
import { MainPage } from '@/pages/main';
import { PostPage } from '@/pages/post';
import { CreateRoomPage } from '@/pages/create-room';
import { MyPage } from '@/pages/mypage';
import { AUTH_TOKEN_KEY } from '@/shared/api';

function PublicOnly({ children }: { children: React.ReactNode }) {
  const hasToken = !!localStorage.getItem(AUTH_TOKEN_KEY);
  if (hasToken) return <Navigate to="/main" replace />;
  return <>{children}</>;
}

export function AppRouter() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PublicOnly>
            <LoginPage />
          </PublicOnly>
        }
      />
      <Route element={<AuthLayout />}>
        <Route path="main" element={<MainPage />} />
        <Route path="create" element={<CreateRoomPage />} />
        <Route path="mypage" element={<MyPage />} />
        <Route path=":postId" element={<PostPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
