export const GREEN = '#810100';
export const DARK_GREEN = '#810100';
export const CREAM = '#FAFAF9';
export const WHITE = '#FAFAF9';
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
  { time: '16h30', title: 'Chegada dos convidados à Igreja' },
  { time: '17h00', title: 'Cerimónia Religiosa (São José de Cluny)', icon: '/images/icons/cerimonia_civil.svg' },
  { time: '18h30', title: 'Sessão fotográfica dos noivos' },
  { time: '20h00', title: 'Recepção dos convidados (Solar do Camama)' },
  { time: '20h30', title: 'Entrada oficial dos noivos e brinde' },
  { time: '21h15', title: 'Jantar', icon: '/images/icons/jantar.svg' },
  { time: '22h35', title: 'Primeira dança dos noivos', icon: '/images/icons/primeira_dança.svg' },
  { time: '22h55', title: 'Abertura da pista de dança', icon: '/images/icons/festa.svg' },
  { time: '23h45', title: 'Corte do bolo', icon: '/images/icons/corte_de_bolo.svg' },
  { time: '00h15', title: 'Lançamento do buquê' },
  { time: '01h15', title: 'Ceia' },
  { time: '02h45', title: 'Encerramento', icon: '/images/icons/fim.svg' },
];
