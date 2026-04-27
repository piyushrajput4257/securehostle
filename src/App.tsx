/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { UserRole, AppSettings } from './types';
import { getSettings, saveSettings } from './store';
import { Login } from './components/Login';
import { StudentDashboard } from './components/StudentDashboard';
import { AdminPanel } from './components/AdminPanel';

export default function App() {
  const [role, setRole] = useState<UserRole>(null);
  const [settings, setSettings] = useState<AppSettings>(getSettings());

  const handleLogin = (newRole: UserRole) => {
    setRole(newRole);
  };

  const handleLogout = () => {
    setRole(null);
  };

  const handleUpdateSettings = (newSettings: AppSettings) => {
    setSettings(newSettings);
    saveSettings(newSettings);
  };

  return (
    <div className="min-h-screen bg-white">
      {!role && <Login onLogin={handleLogin} />}
      
      {role === 'student' && (
        <StudentDashboard 
          settings={settings} 
          onLogout={handleLogout} 
        />
      )}

      {role === 'admin' && (
        <AdminPanel 
          settings={settings} 
          onUpdateSettings={handleUpdateSettings}
          onLogout={handleLogout}
        />
      )}
    </div>
  );
}
