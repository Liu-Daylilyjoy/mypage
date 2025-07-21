import Navbar from "@/components/common/Navbar/Navbar";
import VisitTracker from "@/components/common/Stats/VisitTracker";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <VisitTracker />
      {children}
    </>
  )
}