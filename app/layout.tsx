import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pig Guard",
  description: "Luau raw protection service"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="th"><body>{children}</body></html>;
}
