export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="bg-gray-100 h-screen p-4">
      <h1 className="text-2xl font-bold pb-4">About</h1>
      {children}
    </div>
  )
}
