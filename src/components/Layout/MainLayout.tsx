import { ReactNode } from 'react';
import { Sidebar } from '../Navigation/Sidebar';
import { BottomNavbar } from '../Navigation/BottomNavbar';

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="md:ml-64">
        <main className="pb-20 md:pb-0">
          {children}
        </main>
      </div>
      <BottomNavbar />
    </div>
  );
}