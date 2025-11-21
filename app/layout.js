import { Inter } from 'next/font/google';

import './globals.css';

const inter = Inter({
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  subsets: ['latin'],
  variable: '--inter-font',
  adjustFontFallback: false,
});

export const metadata = {
  title: 'Routine 2nd Math - 2023-2024',
  description: 'Class routine Math 2nd year - 2023-2024',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable}`}>{children}</body>
    </html>
  );
}
