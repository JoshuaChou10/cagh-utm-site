import type { ReactNode } from "react";
import Link from "next/link";
import { AdminSignOutButton } from "@/components/AdminSignOutButton";

export default function AdminDashboardLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/50 bg-white/90 backdrop-blur-xl">
        <div className="container-shell flex h-20 items-center justify-between">
          <Link href="/admin" className="font-bold text-uoft-navy">CAGH UTM Admin</Link>
          <nav className="flex items-center gap-6">
            <Link href="/admin" className="text-sm font-semibold text-slate-700">Events</Link>
            <Link href="/admin/admins" className="text-sm font-semibold text-slate-700">Admins</Link>
            <Link href="/" className="text-sm font-semibold text-slate-700">View site</Link>
            <AdminSignOutButton />
          </nav>
        </div>
      </header>
      {children}
    </>
  );
}
