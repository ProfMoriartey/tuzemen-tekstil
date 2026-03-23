import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { PackageSearch, Boxes, Settings, Users } from "lucide-react";

export default async function AdminDashboard() {
  const user = await currentUser();

  if (user?.publicMetadata?.role !== "admin") {
    redirect("/");
  }

  const adminPanels = [
    {
      name: "Sample Requests",
      description:
        "View and manage incoming client requests for sample hangers.",
      href: "/admin/requests",
      icon: PackageSearch,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      name: "Product Catalog",
      description: "Add, edit, or remove fabric designs and color variants.",
      href: "/admin/products", // Placeholder for future route
      icon: Boxes,
      color: "text-theme-accent",
      bgColor: "bg-theme-accent/20",
    },
    // {
    //   name: "User Management",
    //   description: "View registered users and assign admin permissions.",
    //   href: "/admin/users", // Placeholder for future route
    //   icon: Users,
    //   color: "text-purple-600",
    //   bgColor: "bg-purple-100",
    // },
    // {
    //   name: "Site Settings",
    //   description: "Manage global configuration and company contact details.",
    //   href: "/admin/settings", // Placeholder for future route
    //   icon: Settings,
    //   color: "text-slate-600",
    //   bgColor: "bg-slate-100",
    // },
  ];

  return (
    <div className="container mx-auto min-h-[80vh] max-w-7xl p-4 md:p-8">
      <div className="mb-10 border-b pb-6">
        <h1 className="mb-2 text-3xl font-bold tracking-tight text-slate-900 uppercase">
          Admin Portal
        </h1>
        <p className="text-lg text-slate-500">
          Select a module below to manage your platform.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {adminPanels.map((panel) => {
          const Icon = panel.icon;
          return (
            <Link
              key={panel.name}
              href={panel.href}
              className="hover:border-theme-accent group rounded-xl border border-slate-200 bg-white p-6 transition-all hover:shadow-md"
            >
              <div
                className={`mb-4 flex h-12 w-12 items-center justify-center rounded-lg ${panel.bgColor}`}
              >
                <Icon className={`h-6 w-6 ${panel.color}`} />
              </div>
              <h2 className="group-hover:text-theme-accent mb-2 text-xl font-bold tracking-tight text-slate-900 uppercase transition-colors">
                {panel.name}
              </h2>
              <p className="text-sm leading-relaxed text-slate-500">
                {panel.description}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
