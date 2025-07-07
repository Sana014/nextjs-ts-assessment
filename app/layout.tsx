// app/layout.tsx
"use client";
import './globals.css';
import React, { useMemo } from 'react';
import Footer from './components/footer';
import ThemeProvider, { ThemeContext } from './components/ThemeProvider';
import Navbar from './components/Navbar';

declare global {
  interface Window {
    __searchQuery?: string;
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [search, setSearch] = React.useState(
    typeof window !== 'undefined' ? window.__searchQuery || '' : ''
  );
  const adminId = useMemo(() => Math.floor(100000 + Math.random() * 900000), []);

  // Keep window.__searchQuery in sync with state
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      window.__searchQuery = search;
    }
  }, [search]);

  return (
    <html lang="en">
      <body className="bg-primary-light dark:bg-gray-900 text-primary-dark dark:text-gray-100 font-sans min-h-screen flex flex-col">
        <ThemeProvider>
          <Navbar />
          <main className="max-w-4xl mx-auto p-4 flex-grow">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
