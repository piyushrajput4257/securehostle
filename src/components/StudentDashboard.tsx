
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Youtube, BookOpen, X, Monitor, ShieldAlert, LogOut } from 'lucide-react';
import { AppSettings, Site } from '../types';

interface StudentDashboardProps {
  settings: AppSettings;
  onLogout: () => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({ settings, onLogout }) => {
  const [activeSite, setActiveSite] = useState<Site | null>(null);
  const [showExitDialog, setShowExitDialog] = useState(false);
  const [exitPassword, setExitPassword] = useState('');
  const [exitError, setExitError] = useState('');

  // Restricted Mode Logic
  useEffect(() => {
    if (!settings.isLocked) return;

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      alert('Right-click is disabled in Safe Mode.');
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // Block common shortcuts like Ctrl+T, Ctrl+N, F12, etc.
      const blockedKeys = ['t', 'n', 'w', 'j'];
      if ((e.ctrlKey || e.metaKey) && blockedKeys.includes(e.key.toLowerCase())) {
        e.preventDefault();
        alert(`Shortcut Ctrl+${e.key.toUpperCase()} is disabled in Safe Mode.`);
      }
      if (e.key === 'F12') {
        e.preventDefault();
        alert('Developer Tools are disabled.');
      }
    };

    const handleCopyPaste = (e: ClipboardEvent) => {
      e.preventDefault();
      alert('Copy-paste is disabled in this restricted environment.');
    };

    window.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('copy', handleCopyPaste);
    window.addEventListener('paste', handleCopyPaste);

    return () => {
      window.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('copy', handleCopyPaste);
      window.removeEventListener('paste', handleCopyPaste);
    };
  }, [settings.isLocked]);

  const handleExit = (e: React.FormEvent) => {
    e.preventDefault();
    if (exitPassword === settings.exitPassword) {
      onLogout();
    } else {
      setExitError('Incorrect administrator exit password');
    }
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Youtube': return <Youtube className="w-12 h-12" />;
      case 'BookOpen': return <BookOpen className="w-12 h-12" />;
      case 'Shield': return <ShieldAlert className="w-12 h-12" />;
      default: return <Monitor className="w-12 h-12" />;
    }
  };

  return (
    <div className="fixed inset-0 bg-[#f5f5f5] flex flex-col z-50 overflow-hidden font-sans">
      {/* Header */}
      <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-8 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-200">
            <ShieldAlert className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest">Gyaan Engine</h2>
            <p className="text-[10px] text-gray-400 font-medium">Safe Mode Active / Ex-ppjsv</p>
          </div>
        </div>

        <button
          id="student-exit-btn"
          onClick={() => setShowExitDialog(true)}
          className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-gray-900 transition-colors text-xs font-semibold uppercase tracking-wider"
        >
          <LogOut className="w-4 h-4" />
          Quit Session
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 relative overflow-hidden bg-gray-50/50">
        <AnimatePresence mode="wait">
          {!activeSite ? (
            <motion.div
              key="site-selection"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="absolute inset-0 flex items-center justify-center p-12"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
                {settings.whitelist.map((site) => (
                  <button
                    key={site.id}
                    id={`site-${site.id}`}
                    onClick={() => setActiveSite(site)}
                    className="group relative bg-white aspect-[4/3] rounded-[32px] shadow-sm border border-gray-100 p-8 flex flex-col items-center justify-center gap-6 hover:shadow-xl hover:shadow-gray-200 hover:-translate-y-2 transition-all duration-300"
                  >
                    <div className="w-24 h-24 bg-gray-50 rounded-[24px] flex items-center justify-center text-gray-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                      {getIcon(site.icon)}
                    </div>
                    <div className="text-center">
                      <h3 className="text-2xl font-bold text-gray-900">{site.name}</h3>
                      <p className="text-sm text-gray-400 mt-2 font-medium uppercase tracking-widest">{site.type}</p>
                    </div>
                    <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Monitor className="w-5 h-5 text-gray-400" />
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="site-iframe"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col bg-black"
            >
              <div className="h-12 bg-gray-900 flex items-center justify-between px-6">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/10" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/10" />
                    <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/10" />
                  </div>
                  <span className="text-xs font-mono text-gray-500 ml-2 tracking-tight opacity-50">
                    SECURE_LINK: {activeSite.url.substring(0, 40)}...
                  </span>
                </div>
                <button
                  id="close-site-btn"
                  onClick={() => setActiveSite(null)}
                  className="p-1 px-3 bg-red-500 text-white rounded-lg flex items-center gap-2 text-[10px] font-black uppercase tracking-tighter hover:bg-red-600 transition-colors"
                >
                  <X className="w-3 h-3" />
                  Close Application
                </button>
              </div>
              <iframe
                src={activeSite.url}
                className="w-full flex-1 border-none bg-white"
                title={activeSite.name}
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Exit Dialog Modal */}
      <AnimatePresence>
        {showExitDialog && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-gray-900/60 backdrop-blur-md"
              onClick={() => setShowExitDialog(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-sm bg-white rounded-[32px] p-8 shadow-2xl"
            >
              <div className="flex flex-col items-center mb-6">
                <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mb-4">
                  <ShieldAlert className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Exit Restricted Mode</h3>
                <p className="text-gray-500 text-sm mt-1 text-center font-medium">Please enter supervisor password to end session.</p>
              </div>

              <form onSubmit={handleExit} className="space-y-4">
                <div className="space-y-2">
                  <input
                    id="exit-password-input"
                    type="password"
                    value={exitPassword}
                    onChange={(e) => setExitPassword(e.target.value)}
                    placeholder="Supervisor Password"
                    className="w-full px-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all font-mono text-center text-lg tracking-[0.5em]"
                    autoFocus
                  />
                  {exitError && <p className="text-red-500 text-[10px] text-center font-bold uppercase tracking-wider">{exitError}</p>}
                </div>

                <div className="flex gap-3">
                  <button
                    id="cancel-exit-btn"
                    type="button"
                    onClick={() => setShowExitDialog(false)}
                    className="flex-1 py-4 text-gray-400 font-bold uppercase text-[10px] tracking-widest hover:text-gray-600 transition-all"
                  >
                    Return
                  </button>
                  <button
                    id="confirm-exit-btn"
                    type="submit"
                    className="flex-[2] py-4 bg-red-600 text-white rounded-2xl font-bold uppercase text-[10px] tracking-widest hover:bg-red-700 shadow-xl shadow-red-200 transition-all"
                  >
                    Confirm Exit
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
