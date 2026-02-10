import { useState } from 'react';
import { css } from '@emotion/react';

type Props = {
  options: string[];
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  error?: boolean;
  fullWidth?: boolean;
};

const wrapStyle = (fullWidth?: boolean) => css`
  position: relative;
  width: ${fullWidth ? '100%' : '44%'};
  height: 56px;
  border: solid 1px var(--gray-250);
  border-radius: 10px;
  color: var(--gray-350);
  display: flex;
  padding: 16px;
  gap: 16px;
  cursor: pointer;
  align-items: center;
  font: inherit;
`;

export function TimeDropDown({ options, placeholder, value, onChange, error, fullWidth }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div
      css={[wrapStyle(fullWidth), open && { outline: '2px solid var(--blue-350)' }, error && { border: 'solid 1px var(--red-250)' }]}
      onClick={() => setOpen((o) => !o)}
      role="combobox"
      aria-expanded={open}
      aria-haspopup="listbox"
    >
      <span style={{ flex: 1, textAlign: 'center', color: value ? 'black' : undefined }}>
        {value || placeholder}
      </span>
      <img src="/assets/icon/arrow-icon.svg" alt="" width={12} height={12} />
      {open && (
        <ul
          css={{
            position: 'absolute',
            top: '100%',
            left: -2,
            right: -2,
            margin: 0,
            padding: 8,
            listStyle: 'none',
            background: '#fff',
            border: '1px solid var(--gray-250)',
            borderRadius: 8,
            maxHeight: 160,
            overflowY: 'auto',
            boxShadow: '4px 4px 10px rgba(0,0,0,0.1)',
            zIndex: 10,
          }}
          role="listbox"
        >
          {options.map((opt) => (
            <li
              key={opt}
              role="option"
              aria-selected={opt === value}
              onClick={(e) => {
                e.stopPropagation();
                onChange(opt);
                setOpen(false);
              }}
              css={{
                padding: '6px',
                textAlign: 'center',
                cursor: 'pointer',
                backgroundColor: opt === value ? 'var(--blue-150)' : undefined,
                color: opt === value ? 'var(--blue-350)' : undefined,
                fontFamily: opt === value ? 'Pretendard-ExtraBold' : undefined,
              }}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
