"use client";

import { useActionState, useEffect, useState } from "react";
import type { EmailOtpType } from "@supabase/supabase-js";
import { setAdminPassword } from "@/app/actions/password";
import { createBrowserSupabase } from "@/lib/supabase/browser";

function readOtpType(value: string | null): EmailOtpType | null {
  if (value === "invite" || value === "recovery" || value === "signup") return value;
  return null;
}

export function SetPasswordForm() {
  const [state, action, pending] = useActionState(setAdminPassword, null);
  const [ready, setReady] = useState(false);
  const [needsConfirm, setNeedsConfirm] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [linkError, setLinkError] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createBrowserSupabase();
    if (!supabase) {
      setLinkError("Admin sign-in is not configured yet.");
      return;
    }
    const client = supabase;

    const url = new URL(window.location.href);
    const tokenHash = url.searchParams.get("token_hash");
    const otpType = readOtpType(url.searchParams.get("type"));
    if (tokenHash && otpType) {
      setNeedsConfirm(true);
      return;
    }

    let cancelled = false;
    let settled = false;

    function succeed() {
      if (cancelled || settled) return;
      settled = true;
      setReady(true);
      if (window.location.hash) {
        window.history.replaceState(null, "", window.location.pathname);
      }
    }

    function fail(message?: string) {
      if (cancelled || settled) return;
      settled = true;
      setLinkError(message ?? "This invite link is invalid or has expired. Ask an admin to send a new one.");
    }

    async function syncSession() {
      const url = new URL(window.location.href);
      const code = url.searchParams.get("code");

      if (code) {
        const { error } = await client.auth.exchangeCodeForSession(code);
        if (error) {
          fail(error.message);
          return;
        }
        succeed();
        return;
      }

      // Supabase invite emails usually land with tokens in the URL hash.
      if (url.hash.startsWith("#")) {
        const params = new URLSearchParams(url.hash.slice(1));
        const accessToken = params.get("access_token");
        const refreshToken = params.get("refresh_token");
        const type = params.get("type");

        if (accessToken && refreshToken) {
          if (type && type !== "invite" && type !== "recovery" && type !== "signup") {
            fail();
            return;
          }

          const { error } = await client.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });

          if (error) {
            fail(error.message);
            return;
          }

          succeed();
          return;
        }
      }

      const { data: { session } } = await client.auth.getSession();
      if (session) {
        succeed();
        return;
      }

      fail();
    }

    const { data: listener } = client.auth.onAuthStateChange((_event, session) => {
      if (session) succeed();
    });

    void syncSession();

    return () => {
      cancelled = true;
      listener.subscription.unsubscribe();
    };
  }, []);

  async function confirmLink() {
    const supabase = createBrowserSupabase();
    if (!supabase) {
      setLinkError("Admin sign-in is not configured yet.");
      return;
    }

    const url = new URL(window.location.href);
    const tokenHash = url.searchParams.get("token_hash");
    const otpType = readOtpType(url.searchParams.get("type"));
    if (!tokenHash || !otpType) {
      setLinkError("This invite link is invalid or has expired. Ask an admin to send a new one.");
      return;
    }

    setConfirming(true);
    const { error } = await supabase.auth.verifyOtp({ token_hash: tokenHash, type: otpType });
    setConfirming(false);
    if (error) {
      setLinkError(error.message);
      return;
    }

    window.history.replaceState(null, "", window.location.pathname);
    setNeedsConfirm(false);
    setReady(true);
  }

  if (linkError) {
    return <p className="font-semibold text-red-600">{linkError}</p>;
  }

  if (needsConfirm) {
    return (
      <div className="grid gap-5">
        <p className="text-slate-600">This setup link is for your account only. Continue to choose a password.</p>
        <button className="btn-navy w-fit" type="button" onClick={() => void confirmLink()} disabled={confirming}>
          {confirming ? "Checking link..." : "Continue"}
        </button>
      </div>
    );
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
