"use client";

import { useActionState, useState } from "react";
import { addAdmin } from "@/app/actions/admins";

export function AddAdminForm() {
  const [state, action, pending] = useActionState(addAdmin, null);
  const [copied, setCopied] = useState(false);

  async function copyLink() {
    if (!state?.inviteLink) return;
    await navigator.clipboard.writeText(state.inviteLink);
    setCopied(true);
  }

  return (
    <form action={action} className="grid gap-5">
      <div>
        <label className="field-label" htmlFor="admin-email">Email</label>
        <input id="admin-email" name="email" type="email" required autoComplete="off" className="field-input" placeholder="exec@mail.utoronto.ca" />
        <p className="mt-2 text-sm text-slate-500">No email is sent. You’ll get a private link to give them.</p>
      </div>
      {state?.error ? <p className="text-sm font-semibold text-red-600" role="alert">{state.error}</p> : null}
      {state?.success ? <p className="text-sm font-semibold text-emerald-700" role="status">{state.success}</p> : null}
      {state?.inviteLink ? (
        <div className="grid gap-3">
          <label className="field-label" htmlFor="invite-link">Setup link</label>
          <input id="invite-link" readOnly value={state.inviteLink} className="field-input" />
          <button className="btn-gold w-fit" type="button" onClick={() => void copyLink()}>
            {copied ? "Copied" : "Copy link"}
          </button>
        </div>
      ) : null}
      <button className="btn-navy w-fit" type="submit" disabled={pending}>
        {pending ? "Creating link..." : "Create setup link"}
      </button>
    </form>
  );
}
