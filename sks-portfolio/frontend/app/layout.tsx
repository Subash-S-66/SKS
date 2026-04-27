import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SKS Services",
  description: "Premium Digital Platform",
  viewport: "width=device-width, initial-scale=1",
  icons: {
    icon: "/favicon.ico",
  },
};

export const dynamic = 'force-dynamic';

async function getSettings() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
    const res = await fetch(`${baseUrl}/api/settings`, {
      cache: 'no-store',
      headers: {
        'x-internal-token': process.env.INTERNAL_SECRET_TOKEN || 'this_is_a_shared_secret_for_proxy'
      }
    });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error("Failed to fetch settings:", error);
    return null;
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSettings();

  const primaryAccent = settings?.primaryAccent || '#00D4FF';
  const secondaryAccent = settings?.secondaryAccent || '#7C3AED';

  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#080B14" />
        <style dangerouslySetInnerHTML={{ __html: `
          :root {
            --primary-accent: ${primaryAccent};
            --secondary-accent: ${secondaryAccent};
            --bg-base: #080B14;
            --background: #080B14;
            --foreground: #ffffff;
          }
        `}} />
      </head>
      <body 
        className="bg-[#080B14] text-white antialiased selection:bg-[var(--primary-accent)] selection:text-white"
        suppressHydrationWarning
      >
        <div className="min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
