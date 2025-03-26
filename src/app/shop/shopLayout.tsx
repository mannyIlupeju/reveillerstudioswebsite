import Navigation from "@/components/Navigation/Navigation";
import Footer from "@/components/Footer/Footer";

const ShopLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation/>
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default ShopLayout;