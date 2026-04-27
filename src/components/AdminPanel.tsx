import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Settings, 
  Shield, 
  Plus, 
  Trash2, 
  Lock, 
  Unlock, 
  Save, 
  LogOut, 
  Check, 
  Globe,
  Ban,
  Fingerprint,
  Activity
} from 'lucide-react';
import { AppSettings, Site } from '../types';

interface AdminPanelProps {
  settings: AppSettings;
  onUpdateSettings: (settings: AppSettings) => void;
  onLogout: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ settings, onUpdateSettings, onLogout }) => {
  const [activeTab, setActiveTab] = useState<'whitelist' | 'blacklist' | 'security'>('whitelist');
  const [localSettings, setLocalSettings] = useState<AppSettings>(settings);
  const [newSite, setNewSite] = useState<Partial<Site>>({ name: '', url: '', type: 'educational', icon: 'Monitor' });
  const [newBlacklistDomain, setNewBlacklistDomain] = useState('');
  const [savedStatus, setSavedStatus] = useState(false);

  const handleSave = () => {
    onUpdateSettings(localSettings);
    setSavedStatus(true);
    setTimeout(() => setSavedStatus(false), 2000);
  };

  const addSite = () => {
    if (newSite.name && newSite.url) {
      const site: Site = {
        id: Math.random().toString(36).substr(2, 9),
        name: newSite.name,
        url: newSite.url,
        type: newSite.type as any,
        icon: 'Monitor'
      };
      setLocalSettings({
        ...localSettings,
        whitelist: [...localSettings.whitelist, site]
      });
      setNewSite({ name: '', url: '', type: 'educational', icon: 'Monitor' });
    }
  };

  const removeSite = (id: string) => {
    setLocalSettings({
      ...localSettings,
      whitelist: localSettings.whitelist.filter(s => s.id !== id)
    });
  };

  const addBlacklistDomain = () => {
    if (newBlacklistDomain && !localSettings.blacklist.includes(newBlacklistDomain)) {
      setLocalSettings({
        ...localSettings,
        blacklist: [...localSettings.blacklist, newBlacklistDomain]
      });
      setNewBlacklistDomain('');
    }
  };

  const removeBlacklistDomain = (domain: string) => {
    setLocalSettings({
      ...localSettings,
      blacklist: localSettings.blacklist.filter(d => d !== domain)
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      {/* Admin Nav */}
      <nav className="h-24 bg-white border-b border-slate-200 flex items-center justify-between px-12 shrink-0 sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-5">
          <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center shadow-lg shadow-slate-200">
            <Fingerprint className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-black text-slate-900 tracking-tight text-left">Gyaan Engine Admin</h1>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse capitalize" />
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] text-left">Ex-ppjsv / SECURE_SESSION</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            id="admin-logout-btn"
            onClick={onLogout}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-slate-100 text-slate-500 font-bold text-[10px] uppercase tracking-widest hover:bg-slate-200 hover:text-slate-900 transition-all font-sans"
          >
            <LogOut className="w-4 h-4" />
            Quit Console
          </button>
          
          <button
            id="admin-save-btn"
            onClick={handleSave}
            className={`flex items-center gap-3 px-10 py-3.5 rounded-2xl font-bold text-[10px] uppercase tracking-widest transition-all shadow-xl font-sans ${
              savedStatus 
              ? 'bg-emerald-500 text-white shadow-emerald-200' 
              : 'bg-blue-600 text-white shadow-blue-200 hover:bg-blue-700 hover:scale-105 active:scale-100'
            }`}
          >
            {savedStatus ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            {savedStatus ? 'Config Applied' : 'Propagate Settings'}
          </button>
        </div>
      </nav>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Nav */}
        <aside className="w-80 bg-slate-50 border-r border-slate-200 p-10 flex flex-col gap-3 shrink-0">
          <div className="mb-4">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4 mb-4">Core Modules</p>
            <button
              onClick={() => setActiveTab('whitelist')}
              className={`w-full flex items-center gap-4 p-5 rounded-[2rem] transition-all border ${
                activeTab === 'whitelist' 
                ? 'bg-white border-slate-200 shadow-sm text-blue-600' 
                : 'bg-transparent border-transparent text-slate-400 hover:bg-white/50'
              }`}
            >
              <Globe className={`w-5 h-5 ${activeTab === 'whitelist' ? 'text-blue-500' : 'text-slate-300'}`} />
              <span className={`text-sm font-bold ${activeTab === 'whitelist' ? 'text-slate-800' : 'text-slate-500'}`}>Allowed Portals</span>
            </button>
            <button
              onClick={() => setActiveTab('blacklist')}
              className={`w-full flex items-center gap-4 p-5 rounded-[2rem] transition-all border mt-2 ${
                activeTab === 'blacklist' 
                ? 'bg-white border-slate-200 shadow-sm text-rose-600' 
                : 'bg-transparent border-transparent text-slate-400 hover:bg-white/50'
              }`}
            >
              <Ban className={`w-5 h-5 ${activeTab === 'blacklist' ? 'text-rose-500' : 'text-slate-300'}`} />
              <span className={`text-sm font-bold ${activeTab === 'blacklist' ? 'text-slate-800' : 'text-slate-500'}`}>Blocked Nodes</span>
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`w-full flex items-center gap-4 p-5 rounded-[2rem] transition-all border mt-2 ${
                activeTab === 'security' 
                ? 'bg-white border-slate-200 shadow-sm text-amber-600' 
                : 'bg-transparent border-transparent text-slate-400 hover:bg-white/50'
              }`}
            >
              <Shield className={`w-5 h-5 ${activeTab === 'security' ? 'text-amber-500' : 'text-slate-300'}`} />
              <span className={`text-sm font-bold ${activeTab === 'security' ? 'text-slate-800' : 'text-slate-500'}`}>Environment</span>
            </button>
          </div>
        </aside>

        {/* Console View */}
        <main className="flex-1 p-12 overflow-y-auto bg-slate-50">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="max-w-5xl mx-auto"
          >
            {activeTab === 'whitelist' && (
              <div className="space-y-10">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight">Whitelist Configuration</h2>
                    <p className="text-slate-500 text-sm mt-1 font-medium italic">Active educational endpoints accessible by workstations.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {localSettings.whitelist.map((site) => (
                    <div key={site.id} className="relative group bg-white rounded-[2.5rem] p-8 border border-slate-200 hover:border-blue-300 hover:shadow-2xl hover:shadow-slate-200/50 transition-all">
                      <div className="flex flex-col gap-1 text-left">
                        <h4 className="font-bold text-slate-800 text-lg uppercase tracking-tight">{site.name}</h4>
                        <p className="text-[10px] font-mono text-slate-400 truncate opacity-60 font-bold">{site.url}</p>
                      </div>
                      <div className="flex gap-2 mt-6">
                        <span className="px-3 py-1.5 bg-slate-50 rounded-xl text-[9px] font-black uppercase text-slate-400 border border-slate-100 tracking-widest">{site.type}</span>
                      </div>
                      <button
                        onClick={() => removeSite(site.id)}
                        className="absolute -top-3 -right-3 w-10 h-10 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-300 opacity-0 group-hover:opacity-100 hover:bg-rose-50 hover:text-rose-600 transition-all shadow-xl"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                  
                  <div className="bg-slate-50 rounded-[2.5rem] p-8 border-2 border-dashed border-slate-200 flex flex-col gap-5">
                    <input 
                      type="text" 
                      placeholder="Display Name" 
                      value={newSite.name}
                      onChange={e => setNewSite({...newSite, name: e.target.value})}
                      className="text-xs bg-transparent border-b border-slate-200 pb-3 focus:outline-none focus:border-blue-500 font-bold placeholder:text-slate-300"
                    />
                    <input 
                      type="text" 
                      placeholder="Portal URL" 
                      value={newSite.url}
                      onChange={e => setNewSite({...newSite, url: e.target.value})}
                      className="text-xs bg-transparent border-b border-slate-200 pb-3 focus:outline-none focus:border-blue-500 font-mono placeholder:text-slate-300"
                    />
                    <div className="flex gap-2">
                       <select 
                        value={newSite.type}
                        onChange={e => setNewSite({...newSite, type: e.target.value as any})}
                        className="flex-1 text-[10px] font-black uppercase tracking-widest bg-white border border-slate-100 rounded-xl p-3 focus:outline-none appearance-none cursor-pointer"
                      >
                        <option value="educational">Educational</option>
                        <option value="tool">General Tool</option>
                        <option value="other">Other</option>
                      </select>
                      <button 
                        onClick={addSite}
                        className="px-6 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all flex items-center justify-center gap-2 shadow-lg shadow-slate-200"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'blacklist' && (
              <div className="space-y-10">
                <div>
                  <h2 className="text-3xl font-black text-slate-900 tracking-tight">Restricted Domains</h2>
                  <p className="text-slate-500 text-sm mt-1 font-medium">All attempts to access these nodes will be logged and terminated.</p>
                </div>

                <div className="bg-white rounded-[2.5rem] border border-slate-200 p-10 shadow-sm max-w-2xl">
                  <div className="flex gap-4 mb-10">
                    <input 
                      type="text" 
                      placeholder="e.g. social-media.com" 
                      value={newBlacklistDomain}
                      onChange={e => setNewBlacklistDomain(e.target.value)}
                      className="flex-1 px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-rose-500/10 focus:border-rose-500 font-mono text-sm"
                    />
                    <button 
                      onClick={addBlacklistDomain}
                      className="px-8 bg-rose-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-rose-700 shadow-xl shadow-rose-100 font-sans"
                    >
                      Block Access
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    {localSettings.blacklist.map(domain => (
                      <div key={domain} className="flex items-center justify-between p-5 bg-slate-50 rounded-[1.5rem] group hover:bg-rose-50 transition-all border border-slate-100 hover:border-rose-100">
                        <div className="flex items-center gap-4">
                          <div className="w-8 h-8 flex items-center justify-center bg-white rounded-lg border border-slate-100 shadow-sm text-rose-300 group-hover:text-rose-500">
                            <Ban className="w-4 h-4" />
                          </div>
                          <span className="text-sm font-bold text-slate-700 tracking-tight">{domain}</span>
                        </div>
                        <button 
                          onClick={() => removeBlacklistDomain(domain)}
                          className="opacity-0 group-hover:opacity-100 px-4 py-2 text-rose-500 hover:bg-rose-100/50 rounded-xl transition-all font-black text-[10px] uppercase tracking-widest font-sans"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-10">
                <div>
                  <h2 className="text-3xl font-black text-slate-900 tracking-tight">System Environment</h2>
                  <p className="text-slate-500 text-sm mt-1 font-medium">Configure runtime policies and access constraints.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-white rounded-[2.5rem] border border-slate-200 p-10 shadow-sm space-y-10">
                    <div className="flex items-center justify-between bg-slate-50 p-6 rounded-[2rem] border border-slate-100">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center shadow-inner">
                          <Lock className="w-6 h-6 text-amber-600" />
                        </div>
                        <div className="text-left">
                          <h4 className="font-black text-slate-900 text-sm uppercase tracking-tight">Strict Lock Mode</h4>
                          <p className="text-[10px] text-slate-400 font-bold uppercase mt-0.5">Force App Isolation</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setLocalSettings({...localSettings, isLocked: !localSettings.isLocked})}
                        className={`relative inline-flex h-9 w-16 items-center rounded-full transition-colors focus:outline-none ${localSettings.isLocked ? 'bg-amber-500' : 'bg-slate-200'}`}
                      >
                        <span className={`inline-block h-7 w-7 transform rounded-full bg-white transition-transform shadow-md ${localSettings.isLocked ? 'translate-x-[2.1rem]' : 'translate-x-1'}`} />
                      </button>
                    </div>

                    <div className="px-2 text-left">
                      <div className="flex justify-between items-center mb-3">
                         <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Station Unlock Token</label>
                         <span className="text-[9px] text-amber-600 font-bold bg-amber-50 px-2 py-0.5 rounded uppercase tracking-tighter">Required for EXIT</span>
                      </div>
                      <input 
                        type="password" 
                        value={localSettings.exitPassword}
                        onChange={e => setLocalSettings({...localSettings, exitPassword: e.target.value})}
                        className="w-full px-6 py-5 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-500/10 focus:border-amber-500 font-mono tracking-[0.4em] text-xl text-center text-slate-800"
                      />
                    </div>
                  </div>

                  <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white shadow-2xl shadow-slate-900/40 text-left">
                    <div className="flex items-center gap-3 mb-8">
                       <Activity className="w-6 h-6 text-blue-400" />
                       <h4 className="font-bold text-lg tracking-tight">Hardened Polices</h4>
                    </div>
                    
                    <div className="space-y-4">
                      {[
                        { label: 'Sandbox Isolation', active: true },
                        { label: 'Input Sanitization', active: true },
                        { label: 'Key-Shortcut Hijack', active: true },
                        { label: 'DOM Mutation Guard', active: true },
                        { label: 'Clipboard Sanitizer', active: true },
                        { label: 'Cross-Origin Proxy', active: false }
                      ].map(policy => (
                        <div key={policy.label} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 group hover:bg-white/10 transition-all">
                          <span className="text-sm font-medium text-slate-300">{policy.label}</span>
                          <div className={`p-1.5 rounded-lg border ${policy.active ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-slate-800 border-slate-700 text-slate-500 line-through'}`}>
                             <Check className="w-3 h-3" />
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-10 p-5 bg-white/5 rounded-2xl border border-white/5 italic text-[10px] text-slate-500 leading-relaxed text-center">
                       Platform-level restrictions are enforced when session is locked. 
                       Manual override requires terminal clearance.
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </main>
      </div>
    </div>
  );
};
