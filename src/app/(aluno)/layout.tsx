import NavbarAluno from "@/components/NavbarAluno";

export default function AlunoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavbarAluno />
      <main>{children}</main>
    </>
  );
}
