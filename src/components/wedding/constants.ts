export const GREEN = '#6b7c5a';
export const CREAM = '#f5f2ed';
export const WHITE = '#ffffff';
export const DARK = '#333333';
export const GRAY = '#888888';
export const LIGHT_GRAY = '#e0e0e0';

export interface TimelineEvent {
  time: string;
  title: string;
  location: string;
}

export const timelineEvents: TimelineEvent[] = [
  { time: '16h50', title: 'Cerimónia Religiosa', location: 'Igreja de São Francisco' },
  { time: '18h30', title: 'Chegada ao Salão', location: 'Salão Os Olivos' },
  { time: '19h00', title: 'Recepção', location: 'Jantar & Dança' },
];
