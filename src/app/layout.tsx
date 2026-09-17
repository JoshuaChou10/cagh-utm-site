import type { Metadata } from "next";
import "./globals.css";
import { AuthHashRedirect } from "@/components/AuthHashRedirect";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "CAGH UTM | Global Health at UTM",
  description: "CAGH UTM connects University of Toronto Mississauga students with global health events, mentorship, research and community.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <AuthHashRedirect />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
