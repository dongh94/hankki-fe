import { css } from '@emotion/react';

/** 플로팅 버튼 공통: 흰색 레이아웃 안에 고정(absolute), 위치·크기·반응형 통일 */
export const floatingButtonBase = css`
  z-index: 10;
  width: 56px;
  height: 56px;
  border-radius: 100%;
  position: absolute;
  right: 24px;
  border: 0;
  cursor: pointer;
  background-color: var(--blue-350);
  background-repeat: no-repeat;
  background-position: center;
  background-size: 28px 28px;
  transition: background-color 0.2s, transform 0.2s;
  &:hover {
    background-color: #2c6bd1;
  }
  &:active {
    transform: scale(0.92);
  }
  @media (min-width: 768px) {
    width: 64px;
    height: 64px;
    right: 40px;
    background-size: 32px 32px;
  }
  @media (min-width: 1024px) {
    width: 72px;
    height: 72px;
    right: 48px;
    background-size: 36px 36px;
  }
`;

/** 메인(/) 기준 하단 고정 — 방 만들기(+) 버튼 */
export const floatingButtonBottom = css`
  bottom: 24px;
  @media (min-width: 768px) {
    bottom: 32px;
  }
  @media (min-width: 1024px) {
    bottom: 40px;
  }
`;

/** 메인(/) 기준 상단 고정 — 홈 버튼 */
export const floatingButtonTop = css`
  top: 24px;
  @media (min-width: 768px) {
    top: 32px;
  }
  @media (min-width: 1024px) {
    top: 40px;
  }
`;

/** 홈 버튼 왼쪽 — 삭제 등 두 번째 상단 버튼 */
export const floatingButtonTopSecond = css`
  top: 24px;
  right: 92px;
  @media (min-width: 768px) {
    top: 32px;
    right: 116px;
  }
  @media (min-width: 1024px) {
    top: 40px;
    right: 132px;
  }
`;
