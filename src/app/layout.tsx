import type { Metadata } from "next";
import Script from "next/script";
import { QueryProvider } from "@/components/providers/QueryProvider";
import { AuthProvider } from "@/components/providers/AuthProvider";
import { PCLayout } from "@/components/layout/PCLayout";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const serviceDescription = "안되는 시간 빼고 널널한 시간 찾기";

export const metadata: Metadata = {
  title: "NULLNULL",
  description: serviceDescription,
  openGraph: {
    title: "NULLNULL",
    description: serviceDescription,
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "NULLNULL",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="ko" className={`h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}');
              `}
            </Script>
          </>
        )}
        <QueryProvider>
          <AuthProvider>
            <PCLayout>
              {children}
              <Toaster position="top-center" />
            </PCLayout>
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
