import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SKS Services",
  description: "Premium Digital Platform",
};

export const dynamic = 'force-dynamic';

async function getSettings() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000'}/api/settings`, {
      cache: 'no-store',
      headers: {
        'x-internal-token': process.env.INTERNAL_SECRET_TOKEN || 'this_is_a_shared_secret_for_proxy'
      }
    });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
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
    <html lang="en" className="dark">
      <head>
        <style dangerouslySetInnerHTML={{ __html: `
          :root {
            --primary-accent: ${primaryAccent};
            --secondary-accent: ${secondaryAccent};
            --bg-base: #080B14;
          }
        `}} />
      </head>
      <body className="bg-[var(--bg-base)] text-white antialiased selection:bg-[var(--primary-accent)] selection:text-white">
        {children}
      </body>
    </html>
  );
}
