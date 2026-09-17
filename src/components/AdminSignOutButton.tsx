import { signOut } from "@/app/actions/auth";

export function AdminSignOutButton() {
  return (
    <form action={signOut}>
      <button type="submit" className="text-sm font-semibold text-slate-600 hover:text-uoft-navy">
        Sign out
      </button>
    </form>
  );
}
