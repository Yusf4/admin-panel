// src/app/layout.tsx
import { ReactNode } from 'react';
import './globals.css'; // Global styles

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Tailwind CSS CDN */}
        <link
          href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css"
          rel="stylesheet"
        />
      </head>
      <body className="bg-gray-50">
        <div className="container mx-auto p-4">
          {children} {/* This will render the content of the page */}
        </div>
      </body>
    </html>
  );
}
