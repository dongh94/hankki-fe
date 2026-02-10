import { Button } from '@/shared/ui/Button';
import { useLogin } from '../model/useLogin';

export function LoginButton() {
  const { login } = useLogin();

  return (
    <Button onClick={login} aria-label="구글 로그인">
      구글 로그인
    </Button>
  );
}
