import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <aside className="w-full bg-slate-900 p-4 text-white md:w-64">
        <div className="mb-8 flex items-center justify-between md:flex-col md:items-start">
          <h2 className="mb-0 text-xl font-bold md:mb-6">Management</h2>
          <div className="md:hidden">
            <UserButton />
          </div>
        </div>

        <nav className="scrollbar-hide flex gap-4 overflow-x-auto pb-2 md:flex-col md:overflow-visible md:pb-0">
          <Link
            href="/admin/products"
            className="whitespace-nowrap hover:text-slate-300"
          >
            Fabric Inventory
          </Link>
          <Link
            href="/admin/team"
            className="whitespace-nowrap hover:text-slate-300"
          >
            Staff Directory
          </Link>
        </nav>
      </aside>

      <main className="flex-1 bg-slate-50 p-4 md:p-8">
        <div className="mb-6 hidden justify-end md:flex">
          <UserButton />
        </div>
        {children}
      </main>
    </div>
  );
}
