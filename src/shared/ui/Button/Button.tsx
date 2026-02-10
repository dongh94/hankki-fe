import React from 'react';
import { css } from '@emotion/react';

export type ButtonProps = {
  children: React.ReactNode;
  type?: 'button' | 'submit';
  disabled?: boolean;
  onClick?: () => void | Promise<void>;
  className?: string;
  'aria-label'?: string;
};

const base = css`
  width: 100%;
  margin-top: 48px;
  padding: 20px 0;
  border-radius: 8px;
  color: white;
  border: 0;
  cursor: pointer;
  font: inherit;
  transition: background-color 0.3s;
`;

const abled = css`
  ${base}
  background-color: var(--blue-350);
  &:hover {
    background-color: #2c6bd1;
  }
  &:active {
    transform: scale(0.98);
  }
`;

const disabled = css`
  ${base}
  background-color: var(--blue-250);
  cursor: not-allowed;
  &:hover {
    background-color: var(--blue-250);
  }
`;

export function Button({
  children,
  type = 'button',
  disabled: isDisabled,
  onClick,
  className,
  'aria-label': ariaLabel,
}: ButtonProps) {
  return (
    <button
      type={type}
      css={isDisabled ? disabled : abled}
      disabled={isDisabled}
      onClick={onClick}
      className={className}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
