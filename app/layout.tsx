import type { Metadata } from "next";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Dependancies
import { ToastContainer } from "react-toastify";

// Styles
import "./globals.css";

export const metadata: Metadata = {
  title: "Pak Wheels",
  description: "Users can buy, sell & rent cars on Pak Wheels",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ToastContainer />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
