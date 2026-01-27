import { ReactNode, memo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Background3D from "@/components/Background3D";

interface LayoutProps {
  children: ReactNode;
  showBackground?: boolean;
}

// Memoized Background3D to prevent re-renders
const MemoizedBackground3D = memo(Background3D);

const Layout = ({ children, showBackground = true }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {showBackground && <MemoizedBackground3D />}
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
