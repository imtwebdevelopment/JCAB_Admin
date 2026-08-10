import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Edit2, Trash2, Search, X } from 'lucide-react';

const Subcategories = () => {
  const [subcategories, setSubcategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', parentCategory: '', description: '', image: '' });
  const [uploadingImage, setUploadingImage] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchSubcategories();
  }, []);

  const fetchSubcategories = async () => {
    try {
      setLoading(true);
      const [subRes, catRes] = await Promise.all([
        axios.get('/subcategories'),
        axios.get('/categories')
      ]);
      setSubcategories(subRes.data);
      setCategories(catRes.data);
    } catch (error) {
      console.error("Failed to fetch data", error);
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
        await axios.put(`/subcategories/${editId}`, formData);
      } else {
        await axios.post('/subcategories', formData);
      }
      setShowModal(false);
      setFormData({ name: '', parentCategory: '', description: '', image: '' });
      setEditId(null);
      fetchSubcategories();
    } catch (error) {
      console.error("Failed to save subcategory", error);
      alert("Failed to save subcategory");
    }
  };

  const handleOpenAddModal = () => {
    setFormData({ name: '', parentCategory: '', description: '', image: '' });
    setEditId(null);
    setShowModal(true);
  };

  const handleEdit = (sub) => {
    setFormData({
      name: sub.name,
      parentCategory: sub.parentCategory?._id || sub.parentCategory,
      description: sub.description || '',
      image: sub.image || ''
    });
    setEditId(sub._id);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this subcategory?')) {
      try {
        await axios.delete(`/subcategories/${id}`);
        fetchSubcategories();
      } catch (error) {
        console.error("Failed to delete subcategory", error);
        alert("Failed to delete subcategory");
      }
    }
  };

  return (
    <div className="page-container fade-in">
      <div className="page-header flex-between">
        <div>
          <h1>Subcategories</h1>
          <p>Manage your product subcategories</p>
        </div>
        <button className="btn-primary" onClick={handleOpenAddModal}>
          <Plus size={18} /> Add Subcategory
        </button>
      </div>

      <div className="panel">
        <div className="toolbar flex-between">
          <div className="search-box">
            <Search size={18} />
            <input type="text" placeholder="Search subcategories..." />
          </div>
        </div>

        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Parent Category</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="5" className="text-center">Loading...</td></tr>
              ) : subcategories.length === 0 ? (
                <tr><td colSpan="5" className="text-center empty-state">No subcategories found.</td></tr>
              ) : (
                subcategories.map(sub => (
                  <tr key={sub._id}>
                    <td>
                      <div className="table-img-placeholder">
                        {sub.image ? <img src={sub.image} alt={sub.name} /> : 'No Img'}
                      </div>
                    </td>
                    <td className="font-medium">{sub.name}</td>
                    <td><span className="sub-badge">{sub.parentCategory?.name || '-'}</span></td>
                    <td className="text-muted">{sub.description}</td>
                    <td>
                      <div className="action-buttons">
                        <button className="btn-icon edit" onClick={() => handleEdit(sub)}><Edit2 size={16} /></button>
                        <button className="btn-icon delete" onClick={() => handleDelete(sub._id)}><Trash2 size={16} /></button>
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
              <h2>{editId ? 'Edit Subcategory' : 'Add New Subcategory'}</h2>
              <button className="btn-icon" onClick={() => setShowModal(false)}>
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleAddSubmit} className="modal-form">
              <div className="form-group">
                <label>Subcategory Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Parent Category</label>
                <select
                  className="form-control"
                  value={formData.parentCategory}
                  onChange={(e) => setFormData({ ...formData, parentCategory: e.target.value })}
                  required
                >
                  <option value="">Select a Category</option>
                  {categories.map(cat => (
                    <option key={cat._id} value={cat._id}>{cat.name}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  className="form-control"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows="2"
                ></textarea>
              </div>
              <div className="form-group">
                <label>Subcategory Image</label>
                <input
                  type="file"
                  className="form-control"
                  onChange={handleImageUpload}
                  accept="image/*"
                />
                {uploadingImage && <p style={{ fontSize: '12px', marginTop: '4px' }}>Uploading...</p>}
                {formData.image && <div style={{ marginTop: '10px' }}><img src={formData.image} alt="Preview" style={{ height: '60px', borderRadius: '8px' }} /></div>}
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn-primary" disabled={uploadingImage}>Save Subcategory</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Subcategories;
