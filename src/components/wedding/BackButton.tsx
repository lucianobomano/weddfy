import { GREEN } from './constants';

interface BackButtonProps {
  onClick: () => void;
  className?: string;
}

export default function BackButton({ onClick, className = '' }: BackButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`fixed z-50 w-9 h-9 rounded-full flex items-center justify-center bg-white shadow-md border border-[#e0e0e0] transition-colors hover:bg-gray-50 ${className}`}
      title="Voltar"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke={GREEN}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M19 12H5" />
        <path d="M12 19l-7-7 7-7" />
      </svg>
    </button>
  );
}
