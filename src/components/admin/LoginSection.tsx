import React, { useState } from 'react';
import { useAppState } from '../../context/AppStateContext';
import { useLanguage } from '../../context/LanguageContext';
import { Lock, Shield, ArrowLeft } from 'lucide-react';
import { RBACRole } from '../../types';

const LoginSection: React.FC = () => {
  const { login, setActiveTab } = useAppState();
  const { language } = useLanguage();
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
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
    <div className="flex flex-col items-center justify-center min-h-[75vh] py-8 px-4 sm:px-6">
      <div className="w-full max-w-md mb-3">
        <button
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-1.5 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-gadaa-green transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          {language === 'om' ? 'Gara Fuula Duraatti (Back to Portal)' : language === 'am' ? 'ወደ ዋና ገጽ ይመለሱ' : 'Back to Public Portal'}
        </button>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-700 p-6 sm:p-8 w-full max-w-md">
        {/* Official Logo */}
        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white p-1 border-2 border-gadaa-gold shadow-md overflow-hidden">
          <img src="/logo.png" alt="Buusaa Gonofaa" className="w-full h-full object-cover" />
        </div>

        <h2 className="text-2xl font-black text-center text-slate-900 dark:text-white mb-1">
          {language === 'om' ? 'Seensa Hoggansa Sodaa Balaa' : language === 'am' ? 'የአደጋ ስጋት አመራር መግቢያ' : 'Command Center Login'}
        </h2>
        <p className="text-center text-xs text-slate-500 dark:text-slate-400 mb-6">
          {language === 'om' ? 'Hojjettoota fi ogeessota eeyyamameef qofa.' : 'Access restricted to authorized Commission personnel & field agents.'}
        </p>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800 text-xs p-3 rounded-xl mb-4 text-center font-bold">
            Invalid credentials. (Demo: admin / admin123)
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              {language === 'om' ? 'Maqaa Ittifayyadamaa (Username)' : 'Username'}
            </label>
            <input 
              type="text" 
              value={username} 
              onChange={e => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm focus:ring-2 focus:ring-gadaa-green/50 focus:outline-none" 
              placeholder="Enter username..." 
              required 
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              {language === 'om' ? 'Jecha Icchitii (Password)' : 'Password'}
            </label>
            <input 
              type="password" 
              value={password} 
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm focus:ring-2 focus:ring-gadaa-green/50 focus:outline-none" 
              placeholder="Enter password..." 
              required 
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              {language === 'om' ? 'Gahee Hojii (Role Level)' : 'Assigned Role Level'}
            </label>
            <select 
              value={role} 
              onChange={e => setRole(e.target.value as RBACRole)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm focus:ring-2 focus:ring-gadaa-green/50 focus:outline-none"
            >
              <option value="super_admin">Super Admin (Regional HQ - Adama)</option>
              <option value="zonal_manager">Zonal DRM Manager</option>
              <option value="woreda_operator">Woreda Field Operator</option>
            </select>
          </div>

          <div className="bg-slate-50 dark:bg-slate-700/50 p-3 rounded-xl border border-slate-100 dark:border-slate-700 text-[11px] text-slate-500 dark:text-slate-400">
            <span className="font-bold text-slate-700 dark:text-slate-200">Demo Credentials:</span> Username: <code className="bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded font-mono">admin</code> | Password: <code className="bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded font-mono">admin123</code>
          </div>
          
          <button type="submit" className="w-full bg-gadaa-green hover:bg-gadaa-greenDark text-white font-black rounded-xl py-3.5 transition-all flex items-center justify-center gap-2 shadow-lg shadow-gadaa-green/20">
            <Lock className="w-4 h-4" /> {language === 'om' ? 'Seenaa Hojjedhaa (Enter)' : 'Authenticate & Enter'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginSection;
