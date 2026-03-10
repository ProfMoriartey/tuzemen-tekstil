import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { UserButton } from "@clerk/nextjs";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();

  if (user?.publicMetadata?.role !== "admin") {
    redirect("/");
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <header className="flex items-center justify-between bg-slate-900 p-4 text-white">
        <h2 className="text-xl font-bold">Management</h2>
        <UserButton />
      </header>

      <main className="flex-1 p-4 md:p-8">{children}</main>
    </div>
  );
}
