import type { Metadata, Viewport } from "next";
import { defaultMetadata } from "@/lib/metadata";
import { JsonLd } from "@/components/shared/json-ld";
import { organizationSchema, localBusinessSchema } from "@/lib/structured-data";
import { fontSans, fontSerif } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import "./globals.css";

export const metadata: Metadata = defaultMetadata;

export const viewport: Viewport = {
  themeColor: "#F5EFE7",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={cn(fontSans.variable, fontSerif.variable)}>
      <body
        className="min-h-screen bg-cream text-ink antialiased"
        // Browser extensions (ColorZilla / cz-shortcut-listen, Grammarly, etc.)
        // mutate the <body> tag before React hydrates, causing a benign
        // hydration mismatch warning. Suppressing it on body only.
        suppressHydrationWarning
      >
        <JsonLd data={organizationSchema()} id="ld-organization" />
        <JsonLd data={localBusinessSchema()} id="ld-local-business" />
        {children}
      </body>
    </html>
  );
}
