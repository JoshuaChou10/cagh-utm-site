"use client";

import { useActionState, useEffect, useState } from "react";
import { setAdminPassword } from "@/app/actions/password";
import { createBrowserSupabase } from "@/lib/supabase/browser";

export function SetPasswordForm() {
  const [state, action, pending] = useActionState(setAdminPassword, null);
  const [ready, setReady] = useState(false);
  const [linkError, setLinkError] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createBrowserSupabase();
    if (!supabase) {
      setLinkError("Admin sign-in is not configured yet.");
      return;
    }

    let cancelled = false;
    const client = supabase;

    async function syncSession() {
      const url = new URL(window.location.href);
      const code = url.searchParams.get("code");

      if (code) {
        const { error } = await client.auth.exchangeCodeForSession(code);
        if (!cancelled && error) {
          setLinkError("This invite link is invalid or has expired. Ask an admin to send a new one.");
          return;
        }
      }

      const { data: { user } } = await client.auth.getUser();
      if (!cancelled && !user) {
        setLinkError("This invite link is invalid or has expired. Ask an admin to send a new one.");
        return;
      }

      if (!cancelled) {
        setReady(true);
      }
    }

    void syncSession();

    return () => {
      cancelled = true;
    };
  }, []);

  if (linkError) {
    return <p className="font-semibold text-red-600">{linkError}</p>;
  }

  if (!ready) {
    return <p className="font-semibold text-slate-600">Checking your invite…</p>;
  }

  return (
    <form action={action} className="grid gap-5">
      <div>
        <label className="field-label" htmlFor="password">New password</label>
        <input id="password" name="password" type="password" required minLength={8} autoComplete="new-password" className="field-input" />
      </div>
      <div>
        <label className="field-label" htmlFor="confirm">Confirm password</label>
        <input id="confirm" name="confirm" type="password" required minLength={8} autoComplete="new-password" className="field-input" />
      </div>
      {state?.error ? <p className="text-sm font-semibold text-red-600" role="alert">{state.error}</p> : null}
      <button className="btn-navy" type="submit" disabled={pending}>
        {pending ? "Saving..." : "Save password and continue"}
      </button>
    </form>
  );
}
