import { Outlet, Link, useLocation, useNavigate, Navigate } from 'react-router';
import { Truck, LayoutDashboard, Users, Briefcase, LogOut, ChevronDown, Car } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export function Layout() {
  const { currentUser, role, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path: string) => location.pathname.startsWith(path);

  const roleBadge: Record<string, string> = {
    'super-admin': 'Super Admin',
    admin: 'Admin',
    driver: 'Driver',
  };

  const roleColor: Record<string, string> = {
    'super-admin': 'text-red-400',
    admin: 'text-blue-400',
    driver: 'text-green-400',
  };

  const navLinks = () => {
    if (role === 'super-admin') {
      return [
        { to: '/super-admin', icon: <LayoutDashboard className="w-4 h-4" />, label: 'Dashboard' },
        { to: '/super-admin/jobs', icon: <Briefcase className="w-4 h-4" />, label: 'All Jobs' },
        { to: '/super-admin/accounts', icon: <Users className="w-4 h-4" />, label: 'Accounts' },
      ];
    }
    if (role === 'admin') {
      return [
        { to: '/admin', icon: <LayoutDashboard className="w-4 h-4" />, label: 'Dashboard' },
        { to: '/admin/jobs', icon: <Briefcase className="w-4 h-4" />, label: 'Jobs' },
      ];
    }
    // driver
    return [
      { to: '/driver', icon: <Car className="w-4 h-4" />, label: 'Available Jobs' },
      { to: '/driver/my-jobs', icon: <Briefcase className="w-4 h-4" />, label: 'My Jobs' },
    ];
  };

  if (!currentUser) return <Navigate to="/login" replace />;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-black/60 backdrop-blur-sm sticky top-0 z-50 transition-smooth">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Brand */}
          <Link to={role === 'super-admin' ? '/super-admin' : role === 'admin' ? '/admin' : '/driver'} className="flex items-center gap-2.5 hover-smooth hover:opacity-80">
            <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center shadow shadow-red-600/30 hover:shadow-lg hover:shadow-red-600/50 transition-smooth">
              <Truck className="w-4 h-4 text-white" />
            </div>
            <div className="leading-none transition-smooth">
              <span className="font-semibold text-sm text-white block">MedicTow CM</span>
              <span className="text-[10px] text-gray-500">Tow Management</span>
            </div>
          </Link>

          {/* Nav */}
          <nav className="hidden md:flex gap-1">
            {navLinks().map(({ to, icon, label }) => (
              <Link
                key={to}
                to={to}
                end={to === '/super-admin' || to === '/admin' || to === '/driver'}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all hover-smooth ${
                  isActive(to) && (
                    to.endsWith('/super-admin') || to.endsWith('/admin') || to.endsWith('/driver')
                      ? location.pathname === to
                      : true
                  )
                    ? 'bg-red-600/20 text-red-400 hover:bg-red-600/30'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                }`}
              >
                {icon}
                {label}
              </Link>
            ))}
          </nav>

          {/* User menu */}
          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-800 transition-all hover-smooth"
            >
              <div className="w-7 h-7 rounded-full bg-red-600/20 border border-red-600/30 flex items-center justify-center text-xs font-semibold text-red-400 transition-smooth hover:bg-red-600/30">
                {currentUser.name.charAt(0)}
              </div>
              <div className="hidden sm:block text-left leading-none transition-smooth">
                <div className="text-sm text-white">{currentUser.name}</div>
                <div className={`text-xs transition-smooth ${roleColor[role ?? 'driver']}`}>
                  {roleBadge[role ?? 'driver']}
                </div>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-500 transition-smooth" style={{ transform: menuOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
            </button>

            {menuOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-gray-900 border border-gray-700 rounded-xl shadow-xl z-50 overflow-hidden animate-scale-in">
                <div className="px-4 py-3 border-b border-gray-800 transition-smooth">
                  <div className="text-sm text-white font-medium">{currentUser.name}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{currentUser.email}</div>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-4 py-3 text-sm text-gray-300 hover:bg-red-600/10 hover:text-red-400 transition-all hover-smooth"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile nav */}
        <div className="md:hidden border-t border-gray-800 flex transition-smooth">
          {navLinks().map(({ to, icon, label }) => (
            <Link
              key={to}
              to={to}
              className={`flex-1 flex flex-col items-center gap-1 py-2.5 text-xs transition-all hover-smooth ${
                isActive(to) ? 'text-red-400 bg-red-600/5' : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              {icon}
              {label}
            </Link>
          ))}
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 py-6 animate-fade-in" onClick={() => setMenuOpen(false)}>
        <Outlet />
      </main>
    </div>
  );
}
