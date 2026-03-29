import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { QueryProvider } from "@/context/QueryProvider";
import { Toaster } from "sonner";
import ClientProviders from "@/components/shared/ClientProviders";
import ChatNotifier from "@/components/shared/ChatNotifier";
import PWAInstall from "@/components/shared/PWAInstall";

export const metadata = {
  metadataBase: new URL("https://bonduchol.com"),
  title: {
    default: "বন্ধু চল — বন্ধু চল যাই দুনিয়া দেখি",
    template: "%s | বন্ধু চল",
  },
  description: "বন্ধু চল — বন্ধুদের সাথে ভ্রমণ, স্মৃতি ও আড্ডার একটি বিশেষ প্ল্যাটফর্ম। একসাথে নতুন স্মৃতি গড়ি।",
  keywords: ["বন্ধু চল", "বন্ধু", "ভ্রমণ", "স্মৃতি", "আড্ডা", "Bondhu Chol", "travel", "friends", "memories", "Bangladesh"],
  authors: [{ name: "BondhuChol Team" }],
  creator: "BondhuChol Team",
  publisher: "BondhuChol",
  category: "travel",
  openGraph: {
    type: "website",
    locale: "bn_BD",
    url: "https://bonduchol.com",
    siteName: "বন্ধু চল",
    title: "বন্ধু চল — বন্ধু চল যাই দুনিয়া দেখি",
    description: "বন্ধুদের সাথে ভ্রমণ, স্মৃতি ও আড্ডার একটি বিশেষ প্ল্যাটফর্ম।",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "বন্ধু চল" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "বন্ধু চল",
    description: "বন্ধুদের সাথে ভ্রমণ, স্মৃতি ও আড্ডার একটি বিশেষ প্ল্যাটফর্ম।",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    shortcut: "/favicon.ico",
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "বন্ধু চল",
  },
  formatDetection: { telephone: false },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#eab308" },
    { media: "(prefers-color-scheme: dark)", color: "#0f1117" },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="bn" suppressHydrationWarning>
      <body>
        <QueryProvider>
          <ClientProviders>
            <AuthProvider>
              {children}
              <ChatNotifier />
              <PWAInstall />
              <Toaster
                position="top-right"
                richColors
                closeButton
                toastOptions={{
                  style: { fontFamily: "inherit" },
                  duration: 4000,
                }}
              />
            </AuthProvider>
          </ClientProviders>
        </QueryProvider>
      </body>
    </html>
  );
}
