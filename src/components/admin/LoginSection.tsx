import React, { useState } from 'react';
import { useAppState } from '../../context/AppStateContext';
import { Lock, Shield, ArrowRight } from 'lucide-react';
import { RBACRole } from '../../types';

const LoginSection: React.FC = () => {
  const { login } = useAppState();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<RBACRole>('super_admin');
  const [error, setError] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin123') {
      login(username, role);
    } else {
      setError(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] py-12 px-6">
      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-700 p-8 w-full max-w-md">
        <div className="w-16 h-16 bg-gadaa-red/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Shield className="w-8 h-8 text-gadaa-red" />
        </div>
        <h2 className="text-2xl font-black text-center text-slate-900 dark:text-white mb-2">Command Center Login</h2>
        <p className="text-center text-sm text-slate-500 mb-8">Access restricted to authorized personnel only.</p>

        {error && (
          <div className="bg-red-50 text-red-600 border border-red-200 text-sm p-3 rounded-lg mb-4 text-center font-bold">
            Invalid credentials. (Hint: admin / admin123)
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">Username</label>
            <div className="relative">
              <input 
                type="text" 
                value={username} 
                onChange={e => setUsername(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm focus:ring-2 focus:ring-gadaa-red/50 focus:outline-none" 
                placeholder="Enter username..." 
                required 
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">Password</label>
            <div className="relative">
              <input 
                type="password" 
                value={password} 
                onChange={e => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm focus:ring-2 focus:ring-gadaa-red/50 focus:outline-none" 
                placeholder="Enter password..." 
                required 
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">Simulate Role Access</label>
            <select 
              value={role} 
              onChange={e => setRole(e.target.value as RBACRole)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm focus:ring-2 focus:ring-gadaa-red/50 focus:outline-none"
            >
              <option value="super_admin">Super Admin (Global)</option>
              <option value="zonal_manager">Zonal Manager</option>
              <option value="woreda_operator">Woreda Operator</option>
            </select>
          </div>
          
          <button type="submit" className="w-full bg-gadaa-red hover:bg-red-700 text-white font-bold rounded-xl py-3.5 transition-colors flex items-center justify-center gap-2 mt-4 shadow-lg">
            <Lock className="w-4 h-4" /> Authenticate & Enter
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginSection;
