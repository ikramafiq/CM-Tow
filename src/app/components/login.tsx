import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Truck, Lock, Mail, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      const user = login(email.trim().toLowerCase(), password);
      setLoading(false);
      if (user) {
        if (user.role === 'super-admin') navigate('/super-admin');
        else if (user.role === 'admin') navigate('/admin');
        else navigate('/driver');
      } else {
        setError('Invalid email or password. Please try again.');
      }
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-fade-in">
        {/* Logo */}
        <div className="flex flex-col items-center mb-10 animate-slide-in-down" style={{ animationDelay: '0.1s' }}>
          <div className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-red-600/30 hover-smooth hover:scale-105 hover:shadow-xl hover:shadow-red-600/40 cursor-default">
            <Truck className="w-9 h-9 text-white" />
          </div>
          <h1 className="text-2xl font-semibold text-white transition-smooth">MedicTow CM</h1>
          <p className="text-gray-400 text-sm mt-1 transition-smooth">Tow Truck Management Platform</p>
        </div>

        {/* Card */}
        <div className="bg-gray-900/60 border border-gray-800 rounded-2xl p-8 animate-slide-in-up" style={{ animationDelay: '0.2s' }}>
          <h2 className="text-lg font-medium text-white mb-6 transition-smooth">Sign in to your account</h2>

          {error && (
            <div className="flex items-center gap-2 bg-red-600/10 border border-red-600/30 rounded-lg p-3 mb-5 text-red-400 text-sm animate-slide-in-down transition-smooth">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="transition-smooth">
              <label className="block text-sm text-gray-300 mb-1.5 transition-smooth">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 transition-smooth" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@carmedic.com.my"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-black/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 hover-smooth hover:bg-black/60 hover:border-gray-600 focus:border-red-600 focus:bg-black/70 focus:outline-none transition-all"
                />
              </div>
            </div>

            <div className="transition-smooth">
              <label className="block text-sm text-gray-300 mb-1.5 transition-smooth">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 transition-smooth" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 pr-12 py-3 bg-black/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 hover-smooth hover:bg-black/60 hover:border-gray-600 focus:border-red-600 focus:bg-black/70 focus:outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-smooth hover-smooth"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !email || !password}
              className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 rounded-lg font-medium transition-all shadow-lg shadow-red-600/20 hover:shadow-red-600/40 hover:shadow-xl mt-2 hover-smooth hover:scale-[1.02]"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>

        {/* Demo credentials */}
        <div className="mt-6 bg-gray-900/40 border border-gray-800 rounded-xl p-5 animate-slide-in-up" style={{ animationDelay: '0.3s' }} >
          <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-3 transition-smooth">Demo Credentials</p>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between transition-smooth hover:text-gray-300 hover:bg-gray-800/30 px-2 py-1 rounded hover-smooth">
              <span className="text-gray-400">Super Admin</span>
              <span className="text-gray-500 font-mono text-xs">boss@carmedic.com.my / admin123</span>
            </div>
            <div className="flex justify-between transition-smooth hover:text-gray-300 hover:bg-gray-800/30 px-2 py-1 rounded hover-smooth">
              <span className="text-gray-400">Admin</span>
              <span className="text-gray-500 font-mono text-xs">staff1@carmedic.com.my / admin123</span>
            </div>
            <div className="flex justify-between transition-smooth hover:text-gray-300 hover:bg-gray-800/30 px-2 py-1 rounded hover-smooth">
              <span className="text-gray-400">Driver</span>
              <span className="text-gray-500 font-mono text-xs">razak@gmail.com / driver123</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
