import { headers } from "next/headers";

export async function getSiteUrl() {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (configured && !configured.includes("localhost")) {
    return configured;
  }

  const productionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (productionHost) {
    return `https://${productionHost.replace(/\/$/, "")}`;
  }

  // Never use a Vercel preview host in invite emails. Supabase will reject it
  // and fall back to the dashboard Site URL (usually localhost).
  if (process.env.VERCEL_ENV === "preview") {
    return configured ?? "http://localhost:3000";
  }

  const headerList = await headers();
  const host = headerList.get("x-forwarded-host") ?? headerList.get("host");
  const proto = headerList.get("x-forwarded-proto") ?? "http";

  if (host && !host.includes("localhost")) {
    return `${proto}://${host}`;
  }

  return configured ?? "http://localhost:3000";
}
