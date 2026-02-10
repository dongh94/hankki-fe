import { useCallback } from 'react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth, googleAuthProvider } from '@/entities/auth';
import { http } from '@/shared/api';
import { apiURL, AUTH_TOKEN_KEY, AUTH_REFRESH_TOKEN_KEY, AUTH_USER_ID_KEY } from '@/shared/api';

type LoginResponse = { userId: number; accessToken: string; refreshToken: string };

export function useLogin() {
  const navigate = useNavigate();

  const login = useCallback(async () => {
    try {
      const response = await signInWithPopup(auth, googleAuthProvider);
      GoogleAuthProvider.credentialFromResult(response);

      const loginRes = await http.post(apiURL.users.login, {
        email: response.user.email ?? '',
        name: response.user.displayName ?? '',
        image: response.user.photoURL ?? '',
      });

      const { userId, accessToken, refreshToken } = loginRes.data as LoginResponse;
      localStorage.setItem(AUTH_TOKEN_KEY, accessToken);
      localStorage.setItem(AUTH_REFRESH_TOKEN_KEY, refreshToken);
      localStorage.setItem(AUTH_USER_ID_KEY, String(userId));
      navigate('/main');
    } catch (error) {
      console.error(error);
    }
  }, [navigate]);

  return { login };
}
