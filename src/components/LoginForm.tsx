"use client";

import { useActionState } from "react";
import { signIn } from "@/app/actions/auth";

export function LoginForm() {
  const [state, action, pending] = useActionState(signIn, null);

  return (
    <form action={action} className="grid gap-5">
      <div>
        <label className="field-label" htmlFor="email">Email</label>
        <input id="email" name="email" type="email" required autoComplete="username" className="field-input" />
      </div>
      <div>
        <label className="field-label" htmlFor="password">Password</label>
        <input id="password" name="password" type="password" required autoComplete="current-password" className="field-input" />
      </div>
      {state?.error ? <p className="text-sm font-semibold text-red-600" role="alert">{state.error}</p> : null}
      <button className="btn-navy" type="submit" disabled={pending}>
        {pending ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}
