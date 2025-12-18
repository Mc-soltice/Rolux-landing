// app/fonts.ts
import { Playfair_Display } from 'next/font/google';

export const playfair = Playfair_Display({
  subsets: ['latin'],
  style: ['italic'],
  weight: ['400', '600'],
});
