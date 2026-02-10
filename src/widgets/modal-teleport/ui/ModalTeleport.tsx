import { createPortal } from 'react-dom';
import { useRecoilState } from 'recoil';
import { modalVisibleState } from '@/features/modal';
import { ModalContent } from '@/widgets/modal-content';

const teleportEl = document.getElementById('teleport');

const overlayStyle: React.CSSProperties = {
  position: 'fixed',
  inset: 0,
  background: 'rgba(0,0,0,0.3)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 999,
};

const boxStyle: React.CSSProperties = {
  backgroundColor: '#fff',
  padding: '40px 40px',
  margin: '0 40px',
  width: 500,
  minHeight: 220,
  borderRadius: 12,
};

export function ModalTeleport() {
  const [visible, setVisible] = useRecoilState(modalVisibleState);

  if (!teleportEl || !visible) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      style={overlayStyle}
      onClick={() => setVisible(false)}
    >
      <div
        style={boxStyle}
        onClick={(e) => e.stopPropagation()}
      >
        <ModalContent />
      </div>
    </div>,
    teleportEl
  );
}
