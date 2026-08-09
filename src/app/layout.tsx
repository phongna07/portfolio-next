import "../styles/globals.css";

import Script from "next/script";
import type { Metadata, Viewport } from "next";

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#050806",
};

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ),
  title: "Nguyen Anh Phong | Electrical Engineering Portfolio",
  description:
    "Selected embedded systems and electrical engineering projects by Nguyen Anh Phong.",
  icons: {
    icon: "/favicon.png",
  },
  openGraph: {
    type: "website",
    title: "Nguyen Anh Phong | Electrical Engineering Portfolio",
    description:
      "Selected embedded systems and electrical engineering projects by Nguyen Anh Phong.",
    images: ["/avatar.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nguyen Anh Phong | Electrical Engineering Portfolio",
    description:
      "Selected embedded systems and electrical engineering projects by Nguyen Anh Phong.",
    images: ["/avatar.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              strategy="lazyOnload"
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            />
            <Script id="google-analytics" strategy="lazyOnload">
              {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
