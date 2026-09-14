import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Survive Uni',
  description: 'A university resource management web game.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
