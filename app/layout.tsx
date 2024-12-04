import type { Metadata } from "next";
import "./globals.css";
import {Poppins} from  "next/font/google";

// define global fontStyle
const poppins = Poppins({
   subsets : ["latin"],
   weight :['100','200','300','500','600','700','800','900'],
   variable:'--font-poppins',
})

export const metadata: Metadata = {
  title: "StoreIt",
  description: "It helps you to store your data easily",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} font-poppins antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
