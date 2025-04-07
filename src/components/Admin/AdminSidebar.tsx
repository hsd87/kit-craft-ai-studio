
import { NavLink } from 'react-router-dom';
import { LayoutDashboardIcon, ShirtIcon, PackageIcon, UsersIcon, SettingsIcon, LogOutIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';

export const AdminSidebar = () => {
  const { signOut } = useAuth();
  
  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboardIcon },
    { name: 'Kit Designs', path: '/admin/kits', icon: ShirtIcon },
    { name: 'Orders', path: '/admin/orders', icon: PackageIcon },
    { name: 'Users', path: '/admin/users', icon: UsersIcon },
    { name: 'Settings', path: '/admin/settings', icon: SettingsIcon },
  ];
  
  return (
    <aside className="w-64 bg-slate-800 text-white flex flex-col">
      <div className="p-4 border-b border-slate-700">
        <h1 className="text-xl font-bold">Profount.AI</h1>
        <p className="text-sm text-slate-400">Admin Panel</p>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                end={item.path === '/admin'}
                className={({ isActive }) => cn(
                  'flex items-center gap-3 px-3 py-2 rounded-md transition-colors',
                  isActive 
                    ? 'bg-slate-700 text-white' 
                    : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                )}
              >
                <item.icon size={18} />
                <span>{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-slate-700">
        <button 
          onClick={signOut}
          className="flex items-center gap-3 w-full px-3 py-2 text-slate-300 hover:bg-slate-700/50 hover:text-white rounded-md transition-colors"
        >
          <LogOutIcon size={18} />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};
