import MenuAdmin from "@/components/admin/MenuAdmin";
import { requireLoginSessionOrRedirect } from "@/lib/login/manage-login";

type AdminCarLayoutprops = {
  children: React.ReactNode
}

export default async function AdminCarLayout({children,}: Readonly<AdminCarLayoutprops>) {
  await requireLoginSessionOrRedirect()

  return (
    <>
        <MenuAdmin />
        {children}
    </>
  );
}
