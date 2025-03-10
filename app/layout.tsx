import { Metadata } from "next";
import React from "react";
import "./globals.css";
import "./reset.css";

export const metadata: Metadata = {
  title: "Clonnerboxd • Social film discovery",
  description: "Letterboxd Clone by JanaIsCoding",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
