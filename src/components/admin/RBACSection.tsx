import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useAppState } from '../../context/AppStateContext';
import { zonesData } from '../../data/zonesData';
import { warehouseHubs } from '../../data/warehouseHubs';
import { RBACRole, IncidentReport } from '../../types';
import {
  Shield, Lock, AlertTriangle,
  Terminal, Download,
  Warehouse, BarChart3, Users, Megaphone, Activity,
  ChevronDown, ChevronUp, X, Sun, Moon, LogOut, ArrowLeft, Menu
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';

const ROLE_CONFIG: Record<RBACRole, { label: string; labelOm: string; color: string; bg: string; scope: string }> = {
  super_admin: { label: 'Super-Admin (HQ)', labelOm: 'Bulchiinsa Olaanaa', color: 'text-gadaa-red', bg: 'bg-red-100 dark:bg-red-900/20', scope: 'Global — Unrestricted Platform Access' },
  zonal_manager: { label: 'Zonal Manager', labelOm: 'Hojii Gaggeessaa Godinaa', color: 'text-blue-600', bg: 'bg-blue-100 dark:bg-blue-900/20', scope: 'Zone-scoped — Incident & Warehouse Mgmt' },
  woreda_operator: { label: 'Woreda Operator', labelOm: 'Hojjataa Node Aanaa', color: 'text-amber-600', bg: 'bg-amber-100 dark:bg-amber-900/20', scope: 'Low-bandwidth — Text-only updates' },
};

const AUDIT_STATUS_CONFIG = {
  SUCCESS: { badge: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400', dot: 'bg-emerald-500' },
  WARNING: { badge: 'bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400', dot: 'bg-amber-500' },
  CRITICAL: { badge: 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400', dot: 'bg-red-600' },
};

interface RBACSectionProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const RBACSection: React.FC<RBACSectionProps> = ({ darkMode, toggleDarkMode }) => {
  const { t, language } = useLanguage();
  const {
    incidents, updateIncidentStatus,
    auditLog, logAction,
    tickerActive, setTickerActive, setTickerMessage,
    monetaryDonations, inKindManifests, currentUser, logout, setActiveTab
  } = useAppState();

  const [activePanel, setActivePanel] = useState<'dashboard' | 'incidents' | 'warehouses' | 'ticker' | 'cms' | 'audit' | 'rbac'>('dashboard');
  const [expandedAudit, setExpandedAudit] = useState<string | null>(null);
  const [tickerDraft, setTickerDraft] = useState('');
  const [statusUpdates, setStatusUpdates] = useState<Record<string, { status: string; notes: string }>>({});

  const pendingIncidents = incidents.filter(i => i.status === 'pending').length;
  const totalFunds = monetaryDonations.reduce((s, d) => s + d.amountETB, 0);
  const totalZonesCritical = zonesData.filter(z => z.riskLevel === 'critical').length;

  const panels = [
    { id: 'dashboard', label: 'Dashboard Overview', icon: BarChart3 },
    { id: 'incidents', label: 'Incident Management', icon: AlertTriangle, badge: pendingIncidents > 0 ? pendingIncidents : undefined },
    { id: 'warehouses', label: 'Warehouse Status', icon: Warehouse },
    { id: 'ticker', label: 'Emergency Ticker', icon: Megaphone },
    { id: 'cms', label: 'Website Content (CMS)', icon: Activity },
    { id: 'rbac', label: 'RBAC & Users', icon: Users },
    { id: 'audit', label: 'Audit Log', icon: Terminal },
  ];

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex w-full flex-1 h-full overflow-hidden bg-slate-50 dark:bg-slate-950">
      {/* Sidebar Overlay (Mobile) */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 dark:bg-slate-950 border-r border-slate-800 text-slate-300 flex flex-col transform transition-transform duration-300 lg:relative lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-800 text-white bg-slate-950">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-gadaa-red" />
            <span className="font-bold text-lg">Admin Portal</span>
          </div>
          <button className="lg:hidden text-slate-400 hover:text-white" onClick={() => setSidebarOpen(false)}>
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {panels.map(panel => {
            const Icon = panel.icon;
            const isActive = activePanel === panel.id;
            return (
              <button
                key={panel.id}
                onClick={() => { setActivePanel(panel.id as typeof activePanel); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive ? 'bg-gadaa-green text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                {panel.label}
                {panel.badge !== undefined && (
                  <span className="ml-auto bg-gadaa-red text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {panel.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* User Profile */}
        {currentUser && (
          <div className="p-4 border-t border-slate-800">
            <div className={`px-3 py-2 rounded-lg bg-slate-800 text-sm mb-3`}>
              <div className="font-bold text-white truncate">{currentUser.fullName}</div>
              <div className={`text-xs mt-1 ${ROLE_CONFIG[currentUser.role].color}`}>
                {ROLE_CONFIG[currentUser.role].label}
              </div>
            </div>
            <button onClick={logout} className="w-full flex items-center justify-center gap-2 bg-red-500/10 text-red-500 hover:bg-red-500/20 py-2 rounded-lg text-sm font-bold transition-colors">
              <LogOut className="w-4 h-4" /> Log out
            </button>
          </div>
        )}
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-[calc(100vh-1px)] lg:h-[calc(100vh)] overflow-hidden">
        {/* Top Navbar */}
        <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-4 sm:px-6 shadow-sm z-10 shrink-0">
          <div className="flex items-center gap-3">
            <button className="lg:hidden p-2 -ml-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg" onClick={() => setSidebarOpen(true)}>
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-lg font-bold text-slate-800 dark:text-white hidden sm:block">
              {panels.find(p => p.id === activePanel)?.label}
            </h1>
          </div>
          
          <div className="flex items-center gap-3">
            <button onClick={() => setActiveTab('home')} className="flex items-center gap-1.5 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-gadaa-green dark:hover:text-gadaa-green transition-colors px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-gadaa-green/50">
              <ArrowLeft className="w-4 h-4" /> <span className="hidden sm:inline">Back to Site</span>
            </button>
            <button onClick={toggleDarkMode} className="p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </header>

        {/* Scrollable Content Container */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-6">

      {/* Dashboard Overview */}
      {activePanel === 'dashboard' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { label: 'Pending Incidents', value: pendingIncidents, color: 'text-red-600', bg: 'bg-red-50 dark:bg-red-900/10' },
              { label: 'Total Incidents', value: incidents.length, color: 'text-slate-600', bg: 'bg-slate-50 dark:bg-slate-700/50' },
              { label: 'Donations (ETB)', value: `${(totalFunds/1000000).toFixed(1)}M`, color: 'text-gadaa-green', bg: 'bg-gadaa-green/5' },
              { label: 'In-Kind Pledges', value: inKindManifests.length, color: 'text-amber-600', bg: 'bg-amber-50 dark:bg-amber-900/10' },
              { label: 'Critical Zones', value: totalZonesCritical, color: 'text-gadaa-red', bg: 'bg-red-50 dark:bg-red-900/10' },
              { label: 'Audit Entries', value: auditLog.length, color: 'text-purple-600', bg: 'bg-purple-50 dark:bg-purple-900/10' },
            ].map((stat, i) => (
              <div key={i} className={`${stat.bg} rounded-xl border border-slate-100 dark:border-slate-700 p-4 text-center`}>
                <div className={`font-black text-2xl ${stat.color}`}>{stat.value}</div>
                <div className="text-xs text-slate-500 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5">
              <h3 className="font-bold text-slate-800 dark:text-white mb-4 text-sm">Financial Mobilization (Last 6 Months)</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={[
                    { month: 'Mar', funds: 1200000 }, { month: 'Apr', funds: 2800000 },
                    { month: 'May', funds: 3500000 }, { month: 'Jun', funds: 5100000 },
                    { month: 'Jul', funds: 4200000 }, { month: 'Aug', funds: 8400000 }
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.2} />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
                    <YAxis axisLine={false} tickLine={false} tickFormatter={v => `${(v/1000000).toFixed(1)}M`} tick={{fontSize: 12, fill: '#64748b'}} />
                    <RechartsTooltip cursor={{fill: 'transparent'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                    <Bar dataKey="funds" fill="#0d6b3e" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5">
              <h3 className="font-bold text-slate-800 dark:text-white mb-4 text-sm">Incident Reports by Category</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Drought', value: 45 }, { name: 'Flood', value: 25 },
                        { name: 'Displacement', value: 20 }, { name: 'Health/Other', value: 10 }
                      ]}
                      cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value"
                    >
                      <Cell fill="#e6a117" />
                      <Cell fill="#3b82f6" />
                      <Cell fill="#c91c22" />
                      <Cell fill="#0d6b3e" />
                    </Pie>
                    <RechartsTooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                    <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{fontSize: '12px'}} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="bg-gadaa-green/5 dark:bg-gadaa-green/10 border border-gadaa-green/20 rounded-2xl p-4 text-sm text-slate-700 dark:text-slate-300">
            <Activity className="w-4 h-4 text-gadaa-green inline mr-2" />
            System operational · Ticker: <span className={tickerActive ? 'text-gadaa-red font-bold' : 'text-slate-500'}>{tickerActive ? 'ACTIVE' : 'OFF'}</span> · Last audit: {auditLog[0]?.timestamp ? new Date(auditLog[0].timestamp).toLocaleString() : 'N/A'}
          </div>
        </div>
      )}

      {/* Incident Management */}
      {activePanel === 'incidents' && (
        <div className="space-y-4">
          <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-700">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 dark:bg-slate-700/50 text-xs uppercase text-slate-600 dark:text-slate-400">
                <tr>
                  {['Ticket', 'Zone / Woreda', 'Category', 'People', 'Status', 'Actions'].map(h => (
                    <th key={h} className="text-left px-4 py-3 font-semibold">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                {incidents.map(inc => {
                  const update = statusUpdates[inc.id];
                  return (
                    <tr key={inc.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                      <td className="px-4 py-3 font-mono font-bold text-gadaa-green">{inc.ticketNumber}</td>
                      <td className="px-4 py-3">
                        <div className="text-slate-800 dark:text-white font-medium">{zonesData.find(z => z.id === inc.zoneId)?.name.en || inc.zoneId}</div>
                        <div className="text-xs text-slate-500">{inc.woreda}</div>
                      </td>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-400 capitalize">{inc.category.replace('_', ' ')}</td>
                      <td className="px-4 py-3 font-bold text-slate-800 dark:text-white">{inc.affectedPeopleEstimated.toLocaleString()}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                          inc.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                          inc.status === 'verified' ? 'bg-blue-100 text-blue-700' :
                          inc.status === 'dispatched' ? 'bg-gadaa-green/10 text-gadaa-green' :
                          'bg-emerald-100 text-emerald-700'
                        }`}>{inc.status}</span>
                      </td>
                      <td className="px-4 py-3">
                        <select
                          value={update?.status || inc.status}
                          onChange={e => {
                            const newStatus = e.target.value as IncidentReport['status'];
                            setStatusUpdates(prev => ({ ...prev, [inc.id]: { status: newStatus, notes: update?.notes || '' } }));
                            updateIncidentStatus(inc.id, newStatus, update?.notes || 'Updated by Admin');
                          }}
                          className="text-xs px-2 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-1 focus:ring-gadaa-green"
                        >
                          {['pending', 'verified', 'dispatched', 'resolved'].map(s => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Warehouse Status */}
      {activePanel === 'warehouses' && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {warehouseHubs.map(hub => {
            const capPct = Math.round((hub.currentStockTons / hub.capacityTons) * 100);
            return (
              <div key={hub.id} className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5 space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-slate-800 dark:text-white text-sm leading-tight">{hub.name.en}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">{hub.location}</p>
                  </div>
                  <Warehouse className="w-5 h-5 text-gadaa-green flex-shrink-0" />
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-slate-500">Capacity Utilization</span>
                    <span className={`font-bold ${capPct > 85 ? 'text-amber-600' : 'text-gadaa-green'}`}>{capPct}%</span>
                  </div>
                  <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${capPct > 85 ? 'bg-amber-500' : 'bg-gadaa-green'}`} style={{ width: `${capPct}%` }} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {[
                    { label: 'Grain (Qtl)', value: hub.grainStockQtl.toLocaleString() },
                    { label: 'Livestock (Hd)', value: hub.livestockHoldingHead.toLocaleString() },
                    { label: 'Med. Kits', value: hub.medicalKitsCount.toLocaleString() },
                    { label: 'Shelter Kits', value: hub.shelterKitsCount.toLocaleString() },
                  ].map((r, i) => (
                    <div key={i} className="bg-slate-50 dark:bg-slate-700/50 rounded-lg px-2.5 py-1.5">
                      <div className="text-slate-400">{r.label}</div>
                      <div className="font-bold text-slate-800 dark:text-white">{r.value}</div>
                    </div>
                  ))}
                </div>
                <div className="text-xs text-slate-500">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">Coordinator:</span> {hub.chiefCoordinator}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Emergency Ticker Control */}
      {activePanel === 'ticker' && (
        <div className="max-w-2xl space-y-5">
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-800 dark:text-white flex items-center gap-2">
                <Megaphone className="w-5 h-5 text-gadaa-red" />
                {t.rbac?.emergencyTickerToggle}
              </h3>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={tickerActive}
                  onChange={e => {
                    setTickerActive(e.target.checked);
                    logAction('TICKER_TOGGLED', 'Emergency Ticker', `Ticker ${e.target.checked ? 'activated' : 'deactivated'}`);
                  }}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-gadaa-red"></div>
                <span className="ms-2 text-sm font-bold text-slate-700 dark:text-slate-300">{tickerActive ? 'ACTIVE' : 'OFF'}</span>
              </label>
            </div>
            <div className={`rounded-xl p-3 text-sm mb-4 ${tickerActive ? 'bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400' : 'bg-slate-50 dark:bg-slate-700/50 text-slate-500'}`}>
              <span className="font-bold">Current Ticker: </span>
              {tickerActive ? '🔴 BROADCASTING' : '⚫ OFFLINE'}
            </div>
            <textarea
              value={tickerDraft}
              onChange={e => setTickerDraft(e.target.value)}
              placeholder="Enter new emergency ticker message for global broadcast..."
              rows={3}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-gadaa-red/50 resize-none mb-3"
            />
            <button
              onClick={() => {
                if (tickerDraft.trim()) {
                  setTickerMessage(tickerDraft);
                  logAction('TICKER_UPDATED', 'Emergency Ticker', `Ticker message updated: "${tickerDraft.slice(0, 60)}..."`);
                  setTickerDraft('');
                }
              }}
              disabled={!tickerDraft.trim()}
              className="w-full bg-gadaa-red hover:bg-red-700 disabled:opacity-40 text-white py-2.5 rounded-xl font-bold text-sm transition-colors flex items-center justify-center gap-2"
            >
              <Megaphone className="w-4 h-4" /> Broadcast Updated Alert
            </button>
          </div>
        </div>
      )}

      {/* Website Content CMS */}
      {activePanel === 'cms' && (
        <div className="max-w-4xl space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
            <h3 className="font-bold text-slate-800 dark:text-white mb-4 text-lg border-b border-slate-100 dark:border-slate-700 pb-3">Website Content Management</h3>
            
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <h4 className="font-semibold text-sm text-gadaa-green">Hero Section</h4>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Main Heading (English)</label>
                  <input type="text" defaultValue="Indigenous Mutual Solidarity & Disaster Resilience" className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm text-slate-800 dark:text-white" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Sub-heading Text</label>
                  <textarea rows={3} defaultValue="Rooted in the timeless Oromo Gadaa institution..." className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm text-slate-800 dark:text-white resize-none" />
                </div>
                <button className="bg-slate-800 dark:bg-slate-700 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-slate-700 w-full transition-colors">
                  Save Hero Content
                </button>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-sm text-gadaa-green">Global Site Settings</h4>
                <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-200 dark:border-slate-700">
                  <div>
                    <div className="text-sm font-bold text-slate-800 dark:text-white">Accept Donations</div>
                    <div className="text-xs text-slate-500">Toggle public payment gateways</div>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5 text-gadaa-green rounded focus:ring-gadaa-green" />
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-200 dark:border-slate-700">
                  <div>
                    <div className="text-sm font-bold text-slate-800 dark:text-white">Volunteer Registration</div>
                    <div className="text-xs text-slate-500">Allow new volunteer signups</div>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5 text-gadaa-green rounded focus:ring-gadaa-green" />
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-200 dark:border-slate-700">
                  <div>
                    <div className="text-sm font-bold text-slate-800 dark:text-white">Maintenance Mode</div>
                    <div className="text-xs text-slate-500">Take portal offline for updates</div>
                  </div>
                  <input type="checkbox" className="w-5 h-5 text-gadaa-red rounded focus:ring-gadaa-red" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* RBAC Roles */}
      {activePanel === 'rbac' && (
        <div className="space-y-4 max-w-3xl">
          {Object.entries(ROLE_CONFIG).map(([role, cfg]) => (
            <div key={role} className={`${cfg.bg} rounded-2xl border-2 border-current/20 p-5`}>
              <div className="flex items-center gap-3 mb-3">
                <Lock className={`w-6 h-6 ${cfg.color}`} />
                <div>
                  <h3 className={`font-black text-lg ${cfg.color}`}>
                    {language === 'om' ? cfg.labelOm : cfg.label}
                  </h3>
                  <p className="text-xs text-slate-500">{cfg.scope}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-slate-600 dark:text-slate-400">
                {role === 'super_admin' && [
                  '✅ Full platform settings & infrastructure config',
                  '✅ Raw financial balance auditing & SQL export',
                  '✅ Emergency ticker activation & messaging',
                  '✅ Database table configuration & user management',
                  '✅ Emergency system overrides & zone alert resets',
                  '✅ Immutable audit log full access',
                ].map((p, i) => <div key={i} className="bg-white/60 dark:bg-white/10 rounded-lg px-3 py-1.5 text-xs">{p}</div>)}
                {role === 'zonal_manager' && [
                  '✅ Local zone early warning brief creation',
                  '✅ In-kind warehouse ingestion approval',
                  '✅ Incident status management (zone-scoped)',
                  '✅ Local safety-net project clearance',
                  '❌ Cross-zone data access restricted',
                  '❌ Financial ledger read-only',
                ].map((p, i) => <div key={i} className="bg-white/60 dark:bg-white/10 rounded-lg px-3 py-1.5 text-xs">{p}</div>)}
                {role === 'woreda_operator' && [
                  '✅ Aid distribution schedule updates (text-only)',
                  '✅ Local citizen case file registration',
                  '✅ Crop/livestock failure event submission',
                  '❌ No financial or ledger access',
                  '❌ No file uploads or media operations',
                  '⚡ Optimized for 2G/3G low-bandwidth field use',
                ].map((p, i) => <div key={i} className="bg-white/60 dark:bg-white/10 rounded-lg px-3 py-1.5 text-xs">{p}</div>)}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Audit Log */}
      {activePanel === 'audit' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-800 dark:text-white flex items-center gap-2">
              <Terminal className="w-5 h-5 text-purple-600" />
              Immutable Audit Trail ({auditLog.length} entries)
            </h3>
            <button className="flex items-center gap-2 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
              <Download className="w-4 h-4" /> {t.rbac?.exportLedger}
            </button>
          </div>
          <div className="font-mono text-xs space-y-2 max-h-[500px] overflow-y-auto">
            {auditLog.map(entry => {
              const statusCfg = AUDIT_STATUS_CONFIG[entry.status];
              const isExpanded = expandedAudit === entry.id;
              return (
                <div key={entry.id} className="bg-slate-900 dark:bg-slate-950 rounded-xl p-3 border border-slate-700 cursor-pointer" onClick={() => setExpandedAudit(isExpanded ? null : entry.id)}>
                  <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 overflow-x-auto">
                    <span className={`w-2 h-2 rounded-full flex-shrink-0 ${statusCfg.dot}`} />
                    <span className="text-slate-400">{new Date(entry.timestamp).toLocaleString()}</span>
                    <span className={`px-1.5 py-0.5 rounded text-xs font-bold ${statusCfg.badge}`}>{entry.status}</span>
                    <span className="text-amber-400 font-bold">[{entry.action}]</span>
                    <span className="text-slate-300">{entry.targetModule}</span>
                    <span className="ml-auto text-slate-600">{isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}</span>
                  </div>
                  {isExpanded && (
                    <div className="mt-2 pt-2 border-t border-slate-700 text-slate-400 space-y-0.5">
                      <div><span className="text-slate-500">actor:</span> <span className="text-green-400">{entry.actor}</span></div>
                      <div><span className="text-slate-500">role:</span> <span className="text-blue-400">{entry.role}</span></div>
                      <div><span className="text-slate-500">details:</span> <span className="text-slate-300">{entry.details}</span></div>
                      <div><span className="text-slate-500">ip:</span> <span className="text-slate-400">{entry.ipAddress}</span></div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default RBACSection;
