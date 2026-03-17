import Footer from "@/components/Footer";
import Navbar from "../../components/Navbar";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar /> {/* A Navbar agora só existe nas rotas públicas! */}
      <main>{children}</main>
      <Footer />
    </>
  );
}
