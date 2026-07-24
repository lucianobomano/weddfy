export const GREEN = '#38221F';
export const DARK_GREEN = '#38221F';
export const CREAM = '#F3EBDD';
export const WHITE = '#F3EBDD';
export const DARK = '#333333';
export const GRAY = '#888888';
export const LIGHT_GRAY = '#e0e0e0';

export interface TimelineEvent {
  time: string;
  title: string;
  location?: string;
  icon?: string;
}

export const timelineEvents: TimelineEvent[] = [
  { time: '13h30', title: 'Recepção e acomodação dos convidados' },
  { time: '14h00', title: 'Cerimónia Civil', icon: '/images/icons/cerimonia_civil.svg' },
  { time: '15h20', title: 'Organização e início do cortejo' },
  { time: '16h30', title: 'Sessão fotográfica dos noivos' },
  { time: '19h00', title: 'Regresso ao local da recepção' },
  { time: '20h00', title: 'Entrada oficial dos noivos' },
  { time: '20h30', title: 'Brinde e boas-vindas' },
  { time: '21h15', title: 'Jantar', icon: '/images/icons/jantar.svg' },
  { time: '22h35', title: 'Primeira dança dos noivos', icon: '/images/icons/primeira_dança.svg' },
  { time: '22h55', title: 'Abertura da pista de dança', icon: '/images/icons/festa.svg' },
  { time: '23h45', title: 'Corte do bolo', icon: '/images/icons/corte_de_bolo.svg' },
  { time: '00h05', title: 'Lançamento do buquê' },
  { time: '01h15', title: 'Ceia' },
  { time: '02h45', title: 'Encerramento', icon: '/images/icons/fim.svg' },
];
