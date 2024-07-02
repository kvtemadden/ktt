export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-fit flex-col items-center justify-center">
      <div className="container flex max-w-[1175px] flex-col items-center justify-center gap-12 py-16">
        {children}
      </div>
    </main>
  );
}
