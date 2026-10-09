import { ReactNode } from "react";

import Footer from "./_modules/components/footer";
import MobileBottomNav from "./_modules/components/mobile-bottom-nav";
import Navbar from "./_modules/components/navbar";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto grid min-h-screen w-full max-w-300 grid-cols-1 grid-rows-[min-content_1fr_min-content] space-y-4 pb-[calc(5rem+env(safe-area-inset-bottom)+0.75rem)] md:pb-0">
      <header className="sticky top-0 z-50 container mx-auto border-b bg-background/95 px-2 py-2 backdrop-blur supports-backdrop-filter:bg-background/80 md:px-0">
        <nav>
          <Navbar />
        </nav>
      </header>

      <main className="container mx-auto min-w-0 px-2 md:px-0">
        {children}
      </main>

      <footer className="container mx-auto">
        <Footer />
      </footer>

      <MobileBottomNav />
    </div>
  );
}
