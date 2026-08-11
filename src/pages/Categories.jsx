import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Edit2, Trash2, Search, X } from 'lucide-react';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', description: '', image: '' });
  const [uploadingImage, setUploadingImage] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await axios.get('/categories');
      setCategories(res.data);
    } catch (error) {
      console.error("Failed to fetch categories", error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setUploadingImage(true);
    try {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
        setUploadingImage(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error("Failed to read image file", error);
      alert("Failed to read image file");
      setUploadingImage(false);
    }
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`/categories/${editId}`, formData);
      } else {
        await axios.post('/categories', formData);
      }
      setShowModal(false);
      setFormData({ name: '', description: '', image: '' });
      setEditId(null);
      fetchCategories();
    } catch (error) {
      console.error("Failed to save category", error);
      alert("Failed to save category");
    }
  };

  const handleOpenAddModal = () => {
    setFormData({ name: '', description: '', image: '' });
    setEditId(null);
    setShowModal(true);
  };

  const handleEdit = (category) => {
    setFormData({ name: category.name, description: category.description || '', image: category.image || '' });
    setEditId(category._id);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await axios.delete(`/categories/${id}`);
        fetchCategories();
      } catch (error) {
        console.error("Failed to delete category", error);
        alert("Failed to delete category");
      }
    }
  };

  const filteredCategories = categories.filter(cat => 
    cat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="page-container fade-in">
      <div className="page-header flex-between">
        <div>
          <h1>Categories</h1>
          <p>Manage your product categories</p>
        </div>
        <button className="btn-primary" onClick={handleOpenAddModal}>
          <Plus size={18} /> Add Category
        </button>
      </div>

      <div className="panel">
        <div className="toolbar flex-between">
          <div className="search-box">
            <Search size={18} />
            <input 
              type="text" 
              placeholder="Search categories..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="4" className="text-center">Loading...</td></tr>
              ) : filteredCategories.length === 0 ? (
                <tr><td colSpan="4" className="text-center empty-state">No categories found. Create one!</td></tr>
              ) : (
                filteredCategories.map(cat => (
                  <tr key={cat._id}>
                    <td>
                      <div className="table-img-placeholder">
                        {cat.image ? <img src={cat.image} alt={cat.name} /> : 'No Img'}
                      </div>
                    </td>
                    <td className="font-medium">{cat.name}</td>
                    <td className="text-muted">{cat.description}</td>
                    <td>
                      <div className="action-buttons">
                        <button className="btn-icon edit" onClick={() => handleEdit(cat)}><Edit2 size={16} /></button>
                        <button className="btn-icon delete" onClick={() => handleDelete(cat._id)}><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content fade-in panel">
            <div className="modal-header flex-between">
              <h2>{editId ? 'Edit Category' : 'Add New Category'}</h2>
              <button className="btn-icon" onClick={() => setShowModal(false)}>
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleAddSubmit} className="modal-form">
              <div className="form-group">
                <label>Category Name</label>
                <input 
                  type="text" 
                  className="form-control"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required 
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea 
                  className="form-control"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows="3"
                ></textarea>
              </div>
              <div className="form-group">
                <label>Category Image</label>
                <input 
                  type="file" 
                  className="form-control"
                  onChange={handleImageUpload}
                  accept="image/*"
                />
                {uploadingImage && <p style={{fontSize: '12px', marginTop: '4px'}}>Uploading...</p>}
                {formData.image && <div style={{marginTop: '10px'}}><img src={formData.image} alt="Preview" style={{height: '60px', borderRadius: '8px'}} /></div>}
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn-primary" disabled={uploadingImage}>Save Category</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;
