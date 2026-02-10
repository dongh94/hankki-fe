import React from 'react';
import { LoginButton } from '@/features/auth';

const wrapperStyle: React.CSSProperties = {
  height: 'calc(100vh - 60px)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const boxStyle: React.CSSProperties = {
  width: 640,
  maxWidth: '90vw',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 24,
  border: '1px solid var(--gray-250)',
  borderRadius: 8,
  padding: '24px 40px',
};

export function LoginPage() {
  return (
    <div style={wrapperStyle}>
      <div style={boxStyle}>
        <img
          src="/assets/img/okestro_logo.svg"
          alt="okestro logo"
          style={{ width: 140, height: 34 }}
        />
        <h1 className="a11y-hidden">한끼오케 로그인</h1>
        <h2 style={{ fontFamily: 'Pretendard-ExtraBold', fontSize: 32 }}>한끼오케</h2>
        <p style={{ color: 'var(--gray-450)', fontSize: 20 }}>
          오늘 함께할 점심 멤버를 찾아보세요!
        </p>
        <LoginButton />
      </div>
    </div>
  );
}
