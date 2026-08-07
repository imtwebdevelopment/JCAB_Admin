import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Package, Tags, ListTree, Users } from 'lucide-react';

const Dashboard = () => {
  const [stats, setStats] = useState({ categories: 0, subcategories: 0, products: 0 });

  useEffect(() => {
    // In a real scenario, you'd fetch these from a /api/stats endpoint
    // For now, we fetch individual lists and get the length
    const fetchStats = async () => {
      try {
        const [catRes, subcatRes, prodRes] = await Promise.all([
          axios.get('/categories').catch(() => ({ data: [] })),
          axios.get('/subcategories').catch(() => ({ data: [] })),
          axios.get('/products').catch(() => ({ data: [] }))
        ]);
        
        setStats({
          categories: catRes.data.length,
          subcategories: subcatRes.data.length,
          products: prodRes.data.length
        });
      } catch (error) {
        console.error("Failed to fetch stats", error);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="page-container fade-in">
      <div className="page-header">
        <h1>Dashboard Overview</h1>
        <p>Welcome back to JCAB Admin Panel</p>
      </div>
      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon category-icon"><Tags size={28} /></div>
          <div className="stat-content">
            <h3>Total Categories</h3>
            <p className="stat-value">{stats.categories}</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon subcategory-icon"><ListTree size={28} /></div>
          <div className="stat-content">
            <h3>Total Subcategories</h3>
            <p className="stat-value">{stats.subcategories}</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon product-icon"><Package size={28} /></div>
          <div className="stat-content">
            <h3>Total Products</h3>
            <p className="stat-value">{stats.products}</p>
          </div>
        </div>
      </div>
      
      <div className="dashboard-content-area">
        <div className="recent-activity panel">
          <h2>Recent Activity</h2>
          <div className="empty-state">
            <p>No recent activity found.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
