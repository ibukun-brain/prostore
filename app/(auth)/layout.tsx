
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex-center h-screen">
      <main className="flex-col wrapper">{children}</main>
    </div>
  );
}
