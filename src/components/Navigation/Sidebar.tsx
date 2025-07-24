import { useLocation, useNavigate } from 'react-router-dom';
import { Home, Search, FolderOpen, MessageCircle, User, Wallet, Settings, LogOut } from 'lucide-react';
import { images } from '../../constants';

export function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { id: 'dashboard', icon: Home, label: 'Dashboard', path: '/dashboard' },
    { id: 'marketplace', icon: Search, label: 'Marketplace', path: '/marketplace' },
    { id: 'projects', icon: FolderOpen, label: 'My Projects', path: '/projects' },
    { id: 'posts', icon: MessageCircle, label: 'Community', path: '/posts' },
    { id: 'wallet', icon: Wallet, label: 'Wallet', path: '/wallet' },
    { id: 'profile', icon: User, label: 'Profile', path: '/profile' },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    sessionStorage.clear();
    localStorage.clear();
    navigate('/signin');
  };

  return (
    <div className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200 h-screen fixed left-0 top-0 z-40">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <img src={images.Logo} alt="Divasity" className="h-8 w-auto" />
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map(({ id, icon: Icon, label, path }) => (
          <button
            key={id}
            onClick={() => navigate(path)}
            className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
              isActive(path)
                ? 'bg-purple-50 text-purple-600 border-r-2 border-purple-600'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Icon size={20} className="mr-3" />
            <span className="font-medium">{label}</span>
          </button>
        ))}
      </nav>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-gray-200 space-y-2">
        <button
          onClick={() => navigate('/settings')}
          className="w-full flex items-center px-4 py-3 text-left rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <Settings size={20} className="mr-3" />
          <span className="font-medium">Settings</span>
        </button>
        <button
          onClick={handleLogout}
          className="w-full flex items-center px-4 py-3 text-left rounded-lg text-red-600 hover:bg-red-50 transition-colors"
        >
          <LogOut size={20} className="mr-3" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
}