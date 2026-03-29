"use client";
import { ThemeProvider } from "@/context/ThemeContext";

export default function ClientProviders({ children }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
