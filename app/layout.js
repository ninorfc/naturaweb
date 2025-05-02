export const metadata = {
  title: "Naturaweb",
  description: "Guia de ervas medicinais com IA",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt">
      <body>{children}</body>
    </html>
  );
}
