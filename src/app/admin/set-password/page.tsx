import { SetPasswordForm } from "@/components/SetPasswordForm";

export const metadata = {
  title: "Set password | CAGH UTM",
};

export default function SetPasswordPage() {
  return (
    <section className="bg-gradient-to-br from-uoft-ice to-uoft-pale pt-40 pb-24">
      <div className="container-shell max-w-xl">
        <div className="eyebrow">Admin</div>
        <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-uoft-navy">Choose a password</h1>
        <p className="mt-4 text-slate-600">
          You were invited to the CAGH UTM admin team. Set a password for your own account.
        </p>
        <div className="mt-10 rounded-[2rem] border border-slate-200 bg-white p-8">
          <SetPasswordForm />
        </div>
      </div>
    </section>
  );
}
