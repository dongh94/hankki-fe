import { css } from '@emotion/react';

export type LabelProps = {
  tag: string | number;
  color?: string;
  bg?: string;
  pd?: string;
};

const base = css`
  display: inline-block;
  font-size: 14px;
  border-radius: 4px;
  background-color: var(--green-150);
  color: var(--green-250);
  padding: 6px 8px;
`;

export function Label({ tag, color, bg, pd }: LabelProps) {
  return (
    <span
      css={[base, { color: color ?? undefined, backgroundColor: bg ?? undefined, padding: pd ?? undefined }]}
    >
      {tag}
    </span>
  );
}
