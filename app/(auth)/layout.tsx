export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center pt-16 sm:pt-24">
      <div className="mx-auto w-full max-w-sm space-y-6 px-4">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Welcome to TUMO</h1>
          <p className="text-sm text-muted-foreground">Enter your details to continue</p>
        </div>
        {children}
      </div>
    </div>
  );
}
