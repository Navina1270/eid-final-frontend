import "./globals.css";

export const metadata = {
  title: "DomainWise App",
  description: "Created by DomainWise Team",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon-32x32.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`antialiased`}>
        {children}
      </body>
    </html>
  );
}
