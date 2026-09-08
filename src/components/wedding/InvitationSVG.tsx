import { GREEN, DARK, GRAY } from './constants';

export default function InvitationSVG() {
  return (
    <svg
      viewBox="0 0 400 560"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto max-w-[340px] sm:max-w-[380px]"
    >
      <rect x="10" y="10" width="380" height="540" rx="2" stroke={GREEN} strokeWidth="1.5" fill="none" opacity="0.4" />
      <rect x="18" y="18" width="364" height="524" rx="1" stroke={GREEN} strokeWidth="0.5" fill="none" opacity="0.25" />
      <path d="M80 55 Q140 20, 200 55 Q260 20, 320 55" stroke={GREEN} strokeWidth="1.2" fill="none" opacity="0.6" />
      <path d="M100 65 Q150 40, 200 65 Q250 40, 300 65" stroke={GREEN} strokeWidth="0.8" fill="none" opacity="0.35" />
      <path d="M200 38 L204 44 L200 50 L196 44 Z" fill={GREEN} opacity="0.5" />
      <text x="200" y="110" textAnchor="middle" fontFamily="var(--font-script)" fontSize="42" fill={GREEN}>
        Osvaldo
      </text>
      <text x="200" y="140" textAnchor="middle" fontSize="18" fill={GREEN} opacity="0.6" fontStyle="italic">
        &amp;
      </text>
      <text x="200" y="180" textAnchor="middle" fontFamily="var(--font-script)" fontSize="42" fill={GREEN}>
        Mirian
      </text>
      <line x1="120" y1="210" x2="280" y2="210" stroke={GREEN} strokeWidth="0.8" opacity="0.4" />
      <path d="M195 206 L200 200 L205 206 L200 212 Z" fill={GREEN} opacity="0.5" />
      <text x="200" y="248" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" fill={GRAY} letterSpacing="3" fontWeight="400">
        CONVIDAMOS PARA CELEBRAR
      </text>
      <text x="200" y="280" textAnchor="middle" fontFamily="var(--font-playfair)" fontSize="22" fill={DARK} fontWeight="400">
        O Nosso Casamento
      </text>
      <text x="200" y="325" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" fill={GREEN} letterSpacing="2" fontWeight="500">
        16 DE OUTUBRO DE 2026
      </text>
      <line x1="150" y1="348" x2="250" y2="348" stroke={GREEN} strokeWidth="0.5" opacity="0.3" />
      <text x="200" y="380" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" fill={GRAY} letterSpacing="1.5" fontWeight="300">
        SÃO JOSÉ DE CLUNY
      </text>
      <text x="200" y="400" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" fill={GRAY} opacity="0.7" letterSpacing="1">
        LUANDA, ANGOLA
      </text>
      <path d="M100 480 Q150 510, 200 480 Q250 510, 300 480" stroke={GREEN} strokeWidth="1.2" fill="none" opacity="0.6" />
      <path d="M120 470 Q160 490, 200 470 Q240 490, 280 470" stroke={GREEN} strokeWidth="0.8" fill="none" opacity="0.35" />
      <path d="M200 500 L204 506 L200 512 L196 506 Z" fill={GREEN} opacity="0.5" />
      <path d="M30 30 L55 30 M30 30 L30 55" stroke={GREEN} strokeWidth="1" opacity="0.3" />
      <path d="M370 30 L345 30 M370 30 L370 55" stroke={GREEN} strokeWidth="1" opacity="0.3" />
      <path d="M30 530 L55 530 M30 530 L30 505" stroke={GREEN} strokeWidth="1" opacity="0.3" />
      <path d="M370 530 L345 530 M370 530 L370 505" stroke={GREEN} strokeWidth="1" opacity="0.3" />
      <path d="M45 200 Q35 250, 45 300 Q55 250, 45 200Z" fill={GREEN} opacity="0.1" />
      <line x1="45" y1="200" x2="45" y2="300" stroke={GREEN} strokeWidth="0.5" opacity="0.2" />
      <path d="M355 200 Q365 250, 355 300 Q345 250, 355 200Z" fill={GREEN} opacity="0.1" />
      <line x1="355" y1="200" x2="355" y2="300" stroke={GREEN} strokeWidth="0.5" opacity="0.2" />
    </svg>
  );
}
