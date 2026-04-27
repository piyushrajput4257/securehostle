import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Shield, User, Lock, ChevronRight, Fingerprint } from 'lucide-react';
import { UserRole } from '../types';

interface LoginProps {
  onLogin: (role: UserRole) => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [adminPassword, setAdminPassword] = useState('');
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [error, setError] = useState('');

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPassword === 'admin') {
      onLogin('admin');
    } else {
      setError('Invalid system credential');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-8 font-sans transition-colors overflow-hidden relative">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-blue-100/30 blur-[120px] rounded-full -mr-24 -mt-24 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-emerald-100/30 blur-[100px] rounded-full -ml-20 -mb-20 pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full relative z-10"
      >
        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/50 p-12 border border-slate-200/50">
          <div className="flex flex-col items-center mb-10 text-center">
            <div className="w-20 h-20 bg-slate-900 rounded-3xl flex items-center justify-center mb-8 shadow-xl shadow-slate-200">
               <Fingerprint className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight uppercase">Gyaan Engine</h1>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 font-sans">Ex-ppjsv / SECURE_BOOT v2.4</span>
            </div>
          </div>

          {!showAdminLogin ? (
            <div className="space-y-4">
              <button
                id="login-student-btn"
                onClick={() => onLogin('student')}
                className="w-full flex items-center justify-between p-7 bg-white border border-slate-100 rounded-[2rem] hover:border-blue-500 hover:shadow-xl hover:shadow-blue-50/50 transition-all group overflow-hidden relative"
              >
                <div className="flex items-center gap-5 relative z-10">
                  <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:bg-blue-500 transition-colors">
                    <User className="w-6 h-6 text-slate-400 group-hover:text-white transition-colors" />
                  </div>
                  <div className="text-left">
                    <div className="font-black text-slate-800 uppercase text-xs tracking-widest">Student Access</div>
                    <div className="text-xs text-slate-400 font-medium mt-0.5">Educational resources only</div>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-200 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                <div className="absolute inset-0 bg-blue-50/50 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>

              <button
                id="toggle-admin-btn"
                onClick={() => setShowAdminLogin(true)}
                className="w-full flex items-center justify-between p-7 bg-white border border-slate-100 rounded-[2rem] hover:border-slate-900 hover:shadow-xl hover:shadow-slate-50 transition-all group"
              >
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:bg-slate-900 transition-colors">
                    <Lock className="w-6 h-6 text-slate-400 group-hover:text-white transition-colors" />
                  </div>
                  <div className="text-left">
                    <div className="font-black text-slate-800 uppercase text-xs tracking-widest">Admin Control</div>
                    <div className="text-xs text-slate-400 font-medium mt-0.5">Configure station policies</div>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-200 group-hover:text-slate-900 group-hover:translate-x-1 transition-all" />
              </button>
            </div>
          ) : (
            <motion.form 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onSubmit={handleAdminLogin} 
              className="space-y-6"
            >
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1 font-sans">
                  Access Credential
                </label>
                <div className="relative">
                   <input
                    id="admin-password-input"
                    type="password"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    placeholder="Enter Supervisor Password"
                    className="w-full pl-6 pr-12 py-5 bg-slate-50 border border-slate-100 rounded-3xl focus:outline-none focus:ring-4 focus:ring-slate-900/5 focus:border-slate-900 transition-all font-mono tracking-wider font-bold text-slate-900"
                    autoFocus
                  />
                  <div className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300">
                    <Shield className="w-5 h-5" />
                  </div>
                </div>
                {error && <p className="text-rose-500 text-[10px] font-black uppercase tracking-widest mt-1 text-center">{error}</p>}
                {!error && <p className="text-slate-400 text-[9px] uppercase tracking-tighter text-center mt-3 font-sans">* Prototype default_key: 'admin'</p>}
              </div>

              <div className="flex flex-col gap-3 pt-2">
                <button
                  id="submit-admin-btn"
                  type="submit"
                  className="w-full py-5 bg-slate-900 text-white rounded-3xl font-black uppercase text-xs tracking-[0.2em] hover:bg-black transition-all shadow-xl shadow-slate-200 font-sans"
                >
                  Verify Identity
                </button>
                <button
                  id="cancel-admin-btn"
                  type="button"
                  onClick={() => {
                    setShowAdminLogin(false);
                    setError('');
                  }}
                  className="w-full py-4 text-slate-400 font-bold uppercase text-[10px] tracking-widest hover:text-slate-900 transition-all font-sans"
                >
                  Return to selection
                </button>
              </div>
            </motion.form>
          )}
        </div>
        
        <div className="flex items-center justify-center gap-2 mt-12 opacity-40">
           <div className="h-[1px] w-8 bg-slate-300 font-sans" />
           <p className="text-slate-500 text-[9px] font-black uppercase tracking-[0.3em] font-sans">
             Powered by Gyaan Engine (Ex-ppjsv)
           </p>
           <div className="h-[1px] w-8 bg-slate-300 font-sans" />
        </div>
      </motion.div>
    </div>
  );
};
