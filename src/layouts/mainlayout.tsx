export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="p-4 bg-slate-100 rounded max-w-4xl mx-auto m-4">
      {children}
    </div>
  );
}
