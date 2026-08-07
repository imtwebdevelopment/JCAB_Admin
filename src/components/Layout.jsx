import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Menu } from 'lucide-react';
import Sidebar from './Sidebar';

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="layout">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="sidebar-overlay" 
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      <Sidebar isOpen={sidebarOpen} closeSidebar={() => setSidebarOpen(false)} />
      
      <div className="main-content">
        <header className="topbar">
          <div className="flex-center" style={{ gap: '16px' }}>
            <button 
              className="btn-icon mobile-menu-btn" 
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>
            <h2>JCAB Admin Panel</h2>
          </div>
          <div className="user-profile">Admin User</div>
        </header>
        <main className="content-area">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
