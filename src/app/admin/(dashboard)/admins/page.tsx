import { AddAdminForm } from "@/components/AddAdminForm";
import { RemoveAdminButton } from "@/components/RemoveAdminButton";
import { listAdmins } from "@/lib/admins";
import { getAuthenticatedAdmin } from "@/lib/supabase/server";

export const metadata = {
  title: "Admins | CAGH UTM",
};

export default async function AdminsPage() {
  const [{ user }, admins] = await Promise.all([
    getAuthenticatedAdmin(),
    listAdmins(),
  ]);

  return (
    <section className="bg-gradient-to-br from-uoft-ice to-white pt-40 pb-24">
      <div className="container-shell">
        <div className="eyebrow">Admin</div>
        <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-uoft-navy">Admins</h1>
        <p className="mt-4 max-w-2xl text-slate-600">
          Each exec is invited by email and chooses their own password. Students still sign up for events with only a name and email.
        </p>

        <div className="mt-10 rounded-[2rem] border border-slate-200 bg-white p-8">
          <h2 className="text-2xl font-bold text-uoft-navy">Add an admin</h2>
          <div className="mt-6">
            <AddAdminForm />
          </div>
        </div>

        <h2 className="mt-14 text-2xl font-bold text-uoft-navy">People with access ({admins.length})</h2>
        {admins.length === 0 ? (
          <p className="mt-6 rounded-[2rem] border border-slate-200 bg-white p-8 text-slate-600">
            No admins yet. Push the database migrations, then sign in with the account you already created.
          </p>
        ) : (
          <div className="mt-6 overflow-x-auto rounded-[2rem] border border-slate-200 bg-white">
            <table className="w-full text-left">
              <thead className="bg-uoft-ice text-sm uppercase tracking-[.12em] text-uoft-navy">
                <tr>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Added</th>
                  <th className="px-6 py-4"><span className="sr-only">Actions</span></th>
                </tr>
              </thead>
              <tbody>
                {admins.map((admin) => (
                  <tr key={admin.user_id} className="border-t border-slate-100">
                    <td className="px-6 py-4 font-semibold text-uoft-navy">
                      {admin.email}
                      {admin.user_id === user?.id ? (
                        <span className="ml-2 text-xs font-bold uppercase tracking-[.12em] text-uoft-blue">You</span>
                      ) : null}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500">
                      {new Date(admin.created_at).toLocaleString("en-CA", { timeZone: "America/Toronto" })}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-end">
                        {admin.user_id === user?.id || admins.length === 1 ? null : (
                          <RemoveAdminButton userId={admin.user_id} email={admin.email} />
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}
