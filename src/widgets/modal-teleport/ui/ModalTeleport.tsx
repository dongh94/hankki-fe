import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { css, keyframes } from '@emotion/react';
import { useRecoilState } from 'recoil';
import { modalVisibleState } from '@/features/modal';
import { ModalContent } from '@/widgets/modal-content';

const ANIMATION_MS = 200;

const overlayFadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const overlayStyle = (isClosing: boolean) => css`
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  background: rgba(15, 23, 42, 0.38);
  backdrop-filter: blur(2px);
  opacity: ${isClosing ? 0 : 1};
  transition: opacity ${ANIMATION_MS}ms ease;
  animation: ${overlayFadeIn} ${ANIMATION_MS}ms ease;
`;

const panelStyle = (isClosing: boolean) => css`
  width: min(560px, calc(100vw - 32px));
  background: #fff;
  border-radius: 20px;
  padding: 40px;
  min-height: 220px;
  box-shadow: 0 16px 50px rgba(15, 23, 42, 0.2);
  opacity: ${isClosing ? 0 : 1};
  transform: ${isClosing ? 'translateY(16px) scale(0.98)' : 'translateY(0) scale(1)'};
  transition:
    transform ${ANIMATION_MS}ms ease,
    opacity ${ANIMATION_MS}ms ease;

  @media (max-width: 640px) {
    padding: 28px 22px;
    border-radius: 16px;
  }
`;

function getFocusableElements(root: HTMLElement) {
  return Array.from(
    root.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
  ).filter((el) => !el.hasAttribute('disabled') && el.getAttribute('aria-hidden') !== 'true');
}

export function ModalTeleport() {
  const panelRef = useRef<HTMLDivElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useRecoilState(modalVisibleState);
  const [rendered, setRendered] = useState(visible);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (visible) {
      setRendered(true);
      setIsClosing(false);
      return;
    }

    if (!rendered) return;
    setIsClosing(true);
    const timer = window.setTimeout(() => {
      setRendered(false);
      setIsClosing(false);
      returnFocusRef.current?.focus();
    }, ANIMATION_MS);

    return () => window.clearTimeout(timer);
  }, [visible, rendered]);

  useEffect(() => {
    if (!rendered || isClosing) return;
    returnFocusRef.current = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const panel = panelRef.current;
    const focusables = panel ? getFocusableElements(panel) : [];
    (focusables[0] ?? panel)?.focus();

    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [rendered, isClosing]);

  useEffect(() => {
    if (!rendered) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setVisible(false);
        return;
      }

      if (event.key !== 'Tab') return;

      const panel = panelRef.current;
      if (!panel) return;

      const focusables = getFocusableElements(panel);
      if (focusables.length === 0) {
        event.preventDefault();
        panel.focus();
        return;
      }

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [rendered, setVisible]);

  if (!rendered) return null;

  return createPortal(
    <div
      css={overlayStyle(isClosing)}
      role="dialog"
      aria-modal="true"
      aria-label="점심 메이트 확인 모달"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          setVisible(false);
        }
      }}
    >
      <div
        ref={panelRef}
        css={panelStyle(isClosing)}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        <ModalContent />
      </div>
    </div>,
    document.body
  );
}
