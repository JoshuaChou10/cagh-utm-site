"use client";

import { useActionState } from "react";
import { addAdmin } from "@/app/actions/admins";

export function AddAdminForm() {
  const [state, action, pending] = useActionState(addAdmin, null);

  return (
    <form action={action} className="grid gap-5">
      <div>
        <label className="field-label" htmlFor="admin-email">Email</label>
        <input id="admin-email" name="email" type="email" required autoComplete="off" className="field-input" placeholder="exec@mail.utoronto.ca" />
        <p className="mt-2 text-sm text-slate-500">We’ll email them an invite. They set their own password. You never see it.</p>
      </div>
      {state?.error ? <p className="text-sm font-semibold text-red-600" role="alert">{state.error}</p> : null}
      {state?.success ? <p className="text-sm font-semibold text-emerald-700" role="status">{state.success}</p> : null}
      <button className="btn-navy w-fit" type="submit" disabled={pending}>
        {pending ? "Sending invite..." : "Send invite"}
      </button>
    </form>
  );
}
