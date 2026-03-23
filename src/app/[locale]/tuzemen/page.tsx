import { SignIn } from "@clerk/nextjs";

export default function TuzemenSignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <SignIn routing="hash" />
    </div>
  );
}
