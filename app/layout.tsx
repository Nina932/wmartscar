import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Way Mart Careers — შენი ახალი გზა აქ იწყება",
  description: "Way Mart-ის კარიერის გვერდი: გუნდი, გარემო, ლოკაციები და ვაკანსიები SOCAR-ის სადგურებზე.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ka">
      <body className="antialiased">{children}</body>
    </html>
  );
}

