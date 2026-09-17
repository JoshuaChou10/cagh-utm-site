"use client";

import { removeAdmin } from "@/app/actions/admins";

export function RemoveAdminButton({ userId, email }: { userId: string; email: string }) {
  return (
    <form
      action={removeAdmin.bind(null, userId)}
      onSubmit={(event) => {
        if (!window.confirm(`Remove admin access for ${email}? They will no longer be able to sign in.`)) {
          event.preventDefault();
        }
      }}
    >
      <button type="submit" className="rounded-full border border-red-200 px-4 py-2 text-sm font-bold text-red-700 hover:bg-red-50">
        Remove
      </button>
    </form>
  );
}
