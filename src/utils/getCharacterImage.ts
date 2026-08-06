import { extractId } from './extractId';

const FEATURED_PHOTOS = [
  'photo-1451187580459-43490279c0fa', // Space Nebula
  'photo-1470071459604-3b5ec3a7fe05', // Foggy Nature Forest
  'photo-1564349683136-77e08dba1ef9', // Giant Panda Animal
  'photo-1555169062-013468b47731', // Colorful Parrot Bird
  'photo-1462331940025-496dfbfc7564', // Deep Space Galaxy
  'photo-1464822759023-fed622ff2c3b', // Mountain Landscape Nature
  'photo-1534188753412-3e26d0d618d6', // Majestic Lion Animal
  'photo-1444464666168-49d633b86797', // Tropical Bird
  'photo-1506703719100-a0f3a48c0f86', // Cosmic Stars Space
  'photo-1426604966848-d7adac402bff', // Mountain Lake Nature
  'photo-1535083783855-76ae62b2914e', // Deer Wildlife Animal
  'photo-1452570053594-1b985d6ea890', // Owl Bird
  'photo-1446776811953-b23d57bd21aa', // Earth Space Orbit
  'photo-1472214103451-9374bd1c798e', // Green Valley Nature
  'photo-1546182990-dffeafbe841d', // Wild Tiger/Lion Animal
  'photo-1552053831-71594a27632d', // Golden Dog Animal
  'photo-1518709268805-4e9042af9f23', // Cosmic Galaxy Space
  'photo-1441974231531-c6227db76b6e', // Woodland Sunbeams Nature
  'photo-1517849845537-4d257902454a', // Cute Pet Animal
  'photo-1507525428034-b723cf961d3e', // Sunset Ocean Beach Nature
];

export function getCharacterImageUrl(url: string): string {
  const id = extractId(url);
  const photoId = FEATURED_PHOTOS[Math.abs(id) % FEATURED_PHOTOS.length] || FEATURED_PHOTOS[0];
  return `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=400&h=250&q=80`;
}

export function getFallbackImageUrl(): string {
  return `https://images.unsplash.com/${FEATURED_PHOTOS[0]}?auto=format&fit=crop&w=400&h=250&q=80`;
}
