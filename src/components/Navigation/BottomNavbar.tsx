import { useLocation, useNavigate } from 'react-router-dom';
import { Home, Search, FolderOpen, MessageCircle, User } from 'lucide-react';

export function BottomNavbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { id: 'dashboard', icon: Home, label: 'Home', path: '/dashboard' },
    { id: 'marketplace', icon: Search, label: 'Explore', path: '/marketplace' },
    { id: 'projects', icon: FolderOpen, label: 'Projects', path: '/projects' },
    { id: 'posts', icon: MessageCircle, label: 'Community', path: '/posts' },
    { id: 'profile', icon: User, label: 'Profile', path: '/profile' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-1 z-50 md:hidden">
      <div className="flex justify-around items-center">
        {navItems.map(({ id, icon: Icon, label, path }) => (
          <button
            key={id}
            onClick={() => navigate(path)}
            className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
              isActive(path)
                ? 'text-purple-600 bg-purple-50'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Icon size={20} />
            <span className="text-xs mt-1 font-medium">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}