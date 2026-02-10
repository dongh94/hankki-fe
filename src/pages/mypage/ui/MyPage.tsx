import { useState } from 'react';
import { useUserName, withdrawUser } from '@/entities/user';
import { AUTH_USER_ID_KEY, clearAuthAndRedirect } from '@/shared/api';
import { HomeFloatingButton } from '@/features/home-button';
import { Button } from '@/shared/ui/Button';

const userId = Number(localStorage.getItem(AUTH_USER_ID_KEY) ?? 0);

export function MyPage() {
  const { data: username = '유저' } = useUserName(userId);
  const [loading, setLoading] = useState(false);

  const handleWithdraw = async () => {
    if (!window.confirm('정말 회원탈퇴 하시겠습니까? 탈퇴 후 복구할 수 없습니다.')) return;
    setLoading(true);
    try {
      await withdrawUser(userId);
      clearAuthAndRedirect();
    } catch (e) {
      console.error(e);
      alert('회원탈퇴에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <HomeFloatingButton />
      <h1 className="a11y-hidden">마이페이지</h1>
      <section style={{ padding: '48px 0', display: 'flex', flexDirection: 'column', gap: 24 }}>
        <h2 style={{ fontFamily: 'Pretendard-ExtraBold', fontSize: 28 }}>
          마이페이지
        </h2>
        <p style={{ fontSize: 18, color: 'var(--gray-450)' }}>
          {username}님으로 로그인 중입니다.
        </p>
        <div style={{ marginTop: 32 }}>
          <p style={{ fontSize: 14, color: 'var(--gray-450)', marginBottom: 8 }}>
            회원탈퇴 시 모든 데이터가 삭제되며 복구할 수 없습니다.
          </p>
          <Button disabled={loading} onClick={handleWithdraw}>
            {loading ? '처리 중...' : '회원탈퇴'}
          </Button>
        </div>
      </section>
    </>
  );
}
