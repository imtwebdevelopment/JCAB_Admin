import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Tags, ListTree, Package, Settings, LogOut } from 'lucide-react';

const Sidebar = ({ isOpen, closeSidebar }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/login');
  };
  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-logo">
        <h1>JCAB</h1>
        <p>Electricals</p>
      </div>
      <nav className="sidebar-nav">
        <ul>
          <li>
            <NavLink to="/" className={({isActive}) => isActive ? 'active' : ''} end onClick={closeSidebar}>
              <LayoutDashboard size={20} /> Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/categories" className={({isActive}) => isActive ? 'active' : ''} onClick={closeSidebar}>
              <Tags size={20} /> Categories
            </NavLink>
          </li>
          <li>
            <NavLink to="/subcategories" className={({isActive}) => isActive ? 'active' : ''} onClick={closeSidebar}>
              <ListTree size={20} /> Subcategories
            </NavLink>
          </li>
          <li>
            <NavLink to="/products" className={({isActive}) => isActive ? 'active' : ''} onClick={closeSidebar}>
              <Package size={20} /> Products
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="sidebar-footer">
        <button onClick={handleLogout} className="logout-btn">
          <LogOut size={20} /> Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
