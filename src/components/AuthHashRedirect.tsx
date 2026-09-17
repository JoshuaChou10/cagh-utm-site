"use client";

import { useEffect } from "react";

export function AuthHashRedirect() {
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash.startsWith("#")) return;

    const params = new URLSearchParams(hash.slice(1));
    const type = params.get("type");
    const hasInviteTokens = params.has("access_token") && (type === "invite" || type === "recovery" || type === "signup");

    if (!hasInviteTokens) return;
    if (window.location.pathname === "/admin/set-password") return;

    window.location.replace(`/admin/set-password${hash}`);
  }, []);

  return null;
}
