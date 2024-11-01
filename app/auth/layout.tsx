export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col bg-blue-500 w-screen h-screen     items-center justify-center min-h-screen py-2">
      {children}
    </div>
  )
}