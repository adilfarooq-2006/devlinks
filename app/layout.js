import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "DevLinks - Your all links at one place",
  description: "DevLinks is an app that stores and manages your all web links in a single page webpage with your own custom username link. Signup now and claim your own custom URL link now!",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen relative`}>
 <div className="bg-black min-h-screen">
        <Navbar />
        {children}
        <Toaster />
        <Footer />
        </div>
      </body>
    </html>
  );
}
