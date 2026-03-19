import { Outlet } from 'react-router-dom';
import { Nav } from '../components/ui/Nav';
import { Footer } from '../components/ui/Footer';

export default function RootLayout() {
  return (
    <div className="flex min-h-screen flex-col font-sans text-neutral-900 bg-surface">
      <Nav />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
