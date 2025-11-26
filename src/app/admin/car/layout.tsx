import MenuAdmin from "@/components/admin/MenuAdmin";

type AdminCarLayoutprops = {
  children: React.ReactNode
}

export default function AdminCarLayout({children,}: Readonly<AdminCarLayoutprops>) {
  return (
    <>
        <MenuAdmin />
        {children}
    </>
  );
}
