import MenuAdmin from "@/components/admin/MenuAdmin";
import { requireLoginSessionForApiOrRedirect } from "@/lib/login/manage-login";

type AdminCarLayoutprops = {
  children: React.ReactNode
}

export default async function AdminCarLayout({children}: Readonly<AdminCarLayoutprops>) {
  await requireLoginSessionForApiOrRedirect()

  return (
    <>
        <MenuAdmin />
        {children}
    </>
  );
}
