import type {Metadata} from 'next';
import { Inter } from 'next/font/google'; // Use a standard Google Font
import './globals.css';

const inter = Inter({ // Instantiate the Inter font
  variable: '--font-inter',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'IdeaSpark Validator', // Updated title
  description: 'Validate your startup idea instantly with AI.', // Updated description
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      <link rel="icon" href="/app/favicon.png" type="image/png" />
      <link rel="apple-touch-icon" href="/app/favicon.png" type="image/png" sizes="180x180" />
      </head>
      <body className={`${inter.variable} antialiased font-sans`}> {/* Use the Inter font variable */}
        {children}
      </body>
    </html>
  );
}
