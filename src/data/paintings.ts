// Background paintings: one is picked at random on every page load.
// All works by Vincent van Gogh (public domain).
import starryNight from '../assets/paintings/starry-night.webp';
import wheatFieldCypresses from '../assets/paintings/wheat-field-with-cypresses.webp';
import irises from '../assets/paintings/irises.webp';
import oliveTrees from '../assets/paintings/olive-trees-yellow-sky.webp';
import mulberryTree from '../assets/paintings/mulberry-tree.webp';
import langloisBridge from '../assets/paintings/langlois-bridge.webp';
import harvest from '../assets/paintings/harvest-la-crau.webp';
import sower from '../assets/paintings/the-sower.webp';
import greenWheat from '../assets/paintings/green-wheat-field-cypress.webp';
import whiteOrchard from '../assets/paintings/white-orchard.webp';

export interface Painting {
  src: string;
  title: string;
  year: number;
}

export const PAINTINGS: Painting[] = [
  { src: starryNight, title: 'The Starry Night', year: 1889 },
  { src: wheatFieldCypresses, title: 'Wheat Field with Cypresses', year: 1889 },
  { src: irises, title: 'Irises', year: 1889 },
  { src: oliveTrees, title: 'Olive Trees with Yellow Sky and Sun', year: 1889 },
  { src: mulberryTree, title: 'The Mulberry Tree', year: 1889 },
  { src: langloisBridge, title: 'The Langlois Bridge at Arles', year: 1888 },
  { src: harvest, title: 'Harvest at La Crau', year: 1888 },
  { src: sower, title: 'The Sower', year: 1888 },
  { src: greenWheat, title: 'Green Wheat Field with Cypress', year: 1889 },
  { src: whiteOrchard, title: 'The White Orchard', year: 1888 },
];

// Avoid showing the same painting twice in a row across refreshes.
export const pickPainting = (): number => {
  let last = -1;
  try { last = Number(sessionStorage.getItem('lastPainting') ?? -1); } catch { /* ignore */ }
  let i = Math.floor(Math.random() * PAINTINGS.length);
  if (PAINTINGS.length > 1 && i === last) i = (i + 1 + Math.floor(Math.random() * (PAINTINGS.length - 1))) % PAINTINGS.length;
  try { sessionStorage.setItem('lastPainting', String(i)); } catch { /* ignore */ }
  return i;
};
