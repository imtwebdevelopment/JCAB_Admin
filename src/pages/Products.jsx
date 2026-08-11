import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Edit2, Trash2, Search, X } from 'lucide-react';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ 
    title: '', description: '', category: '', subcategory: '', image: '' 
  });
  const [uploadingImage, setUploadingImage] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const [prodRes, catRes, subRes] = await Promise.all([
        axios.get('/products'),
        axios.get('/categories'),
        axios.get('/subcategories')
      ]);
      setProducts(prodRes.data);
      setCategories(catRes.data);
      setSubcategories(subRes.data);
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
      const payload = { ...formData, images: [formData.image] }; 
      if (editId) {
        await axios.put(`/products/${editId}`, payload);
      } else {
        await axios.post('/products', payload);
      }
      setShowModal(false);
      setFormData({ title: '', description: '', category: '', subcategory: '', image: '' });
      setEditId(null);
      fetchProducts();
    } catch (error) {
      console.error("Failed to save product", error);
      alert("Failed to save product");
    }
  };

  const handleOpenAddModal = () => {
    setFormData({ title: '', description: '', category: '', subcategory: '', image: '' });
    setEditId(null);
    setShowModal(true);
  };

  const handleEdit = (prod) => {
    setFormData({ 
      title: prod.title, 
      description: prod.description || '', 
      category: prod.category?._id || prod.category, 
      subcategory: prod.subcategory?._id || prod.subcategory || '', 
      image: (prod.images && prod.images.length > 0) ? prod.images[0] : '' 
    });
    
    setEditId(prod._id);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`/products/${id}`);
        fetchProducts();
      } catch (error) {
        console.error("Failed to delete product", error);
        alert("Failed to delete product");
      }
    }
  };

  return (
    <div className="page-container fade-in">
      <div className="page-header flex-between">
        <div>
          <h1>Products</h1>
          <p>Manage your product catalog</p>
        </div>
        <button className="btn-primary" onClick={handleOpenAddModal}>
          <Plus size={18} /> Add Product
        </button>
      </div>

      <div className="panel">
        <div className="toolbar flex-between">
          <div className="search-box">
            <Search size={18} />
            <input type="text" placeholder="Search products..." />
          </div>
        </div>
        
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Category</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="4" className="text-center">Loading...</td></tr>
              ) : products.length === 0 ? (
                <tr><td colSpan="4" className="text-center empty-state">No products found. Add your first product!</td></tr>
              ) : (
                products.map(prod => (
                  <tr key={prod._id}>
                    <td>
                      <div className="table-img-placeholder">
                        {prod.images && prod.images.length > 0 ? <img src={prod.images[0]} alt={prod.title} /> : 'No Img'}
                      </div>
                    </td>
                    <td className="font-medium">{prod.title}</td>
                    <td>
                      {prod.category?.name || 'Unknown'}
                      {prod.subcategory && <span className="sub-badge"> / {prod.subcategory.name}</span>}
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button className="btn-icon edit" onClick={() => handleEdit(prod)}><Edit2 size={16} /></button>
                        <button className="btn-icon delete" onClick={() => handleDelete(prod._id)}><Trash2 size={16} /></button>
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
              <h2>{editId ? 'Edit Product' : 'Add New Product'}</h2>
              <button className="btn-icon" onClick={() => setShowModal(false)}>
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleAddSubmit} className="modal-form">
              <div className="form-group">
                <label>Product Title</label>
                <input 
                  type="text" 
                  className="form-control"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  required 
                />
              </div>
              <div style={{display: 'flex', gap: '16px'}}>
                <div className="form-group" style={{flex: 1}}>
                  <label>Category</label>
                  <select 
                    className="form-control"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map(cat => (
                      <option key={cat._id} value={cat._id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group" style={{flex: 1}}>
                  <label>Subcategory (Optional)</label>
                  <select 
                    className="form-control"
                    value={formData.subcategory}
                    onChange={(e) => setFormData({...formData, subcategory: e.target.value})}
                  >
                    <option value="">Select Subcategory</option>
                    {subcategories
                      .filter(sub => sub.parentCategory?._id === formData.category || sub.parentCategory === formData.category)
                      .map(sub => (
                        <option key={sub._id} value={sub._id}>{sub.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea 
                  className="form-control"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows="2"
                ></textarea>
              </div>


              <div className="form-group">
                <label>Product Image</label>
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
                <button type="submit" className="btn-primary" disabled={uploadingImage}>Save Product</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
