import Link from "next/link";
import { LoginForm } from "@/components/LoginForm";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export const metadata = {
  title: "Admin sign in | CAGH UTM",
};

export default function AdminLoginPage() {
  return (
    <section className="bg-gradient-to-br from-uoft-ice to-uoft-pale pt-40 pb-24">
      <div className="container-shell max-w-xl">
        <div className="eyebrow">Admin</div>
        <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-uoft-navy">Sign in</h1>
        <p className="mt-4 text-slate-600">
          Club admins sign in with their own email and password to create, edit, or delete events.
        </p>
        <div className="mt-10 rounded-[2rem] border border-slate-200 bg-white p-8">
          {isSupabaseConfigured() ? (
            <LoginForm />
          ) : (
            <p className="font-semibold text-slate-600">
              Supabase is not configured yet. Add <code>NEXT_PUBLIC_SUPABASE_URL</code> and <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> to <code>.env.local</code>.
            </p>
          )}
        </div>
        <Link href="/" className="mt-8 inline-block font-semibold text-uoft-navy">← Back to the site</Link>
      </div>
    </section>
  );
}
