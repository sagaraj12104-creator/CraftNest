import React, { useState, useEffect } from 'react';
import { ShieldCheck, Plus, Edit, Trash2, Image, Package, ShoppingBag, CheckCircle, RefreshCw, X } from 'lucide-react';
import { api } from '../services/api';
import { ImageUpload } from '../components/ImageUpload';

export const AdminPage = () => {
  const [activeAdminTab, setActiveAdminTab] = useState('products'); // 'products', 'slides', 'orders'

  // Data states
  const [products, setProducts] = useState([]);
  const [slides, setSlides] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modals & Form States
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productForm, setProductForm] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: '',
    category: 'Ceramics',
    material: 'Clay',
    stock: 10,
    artistName: '',
    isNewArrival: true,
    featured: true
  });

  const [showSlideModal, setShowSlideModal] = useState(false);
  const [editingSlide, setEditingSlide] = useState(null);
  const [slideForm, setSlideForm] = useState({
    title: '',
    subtitle: '',
    imageUrl: '',
    buttonText: 'Shop Collection',
    categoryTag: 'Handcrafted',
    active: true,
    displayOrder: 1
  });

  useEffect(() => {
    loadAllAdminData();
  }, []);

  const loadAllAdminData = async () => {
    setLoading(true);
    try {
      const [prodData, slideData, orderData] = await Promise.all([
        api.getProducts(),
        api.getAdminSlides(),
        api.getOrders()
      ]);
      setProducts(prodData);
      setSlides(slideData);
      setOrders(orderData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // --- PRODUCT CRUD HANDLERS ---
  const handleOpenAddProduct = () => {
    setEditingProduct(null);
    setProductForm({
      name: '',
      description: '',
      price: '',
      imageUrl: '',
      category: 'Ceramics',
      material: 'Clay',
      stock: 10,
      artistName: '',
      isNewArrival: true,
      featured: true
    });
    setShowProductModal(true);
  };

  const handleOpenEditProduct = (prod) => {
    setEditingProduct(prod);
    setProductForm({
      name: prod.name,
      description: prod.description,
      price: prod.price,
      imageUrl: prod.imageUrl,
      category: prod.category,
      material: prod.material,
      stock: prod.stock,
      artistName: prod.artistName || '',
      isNewArrival: prod.isNewArrival ?? true,
      featured: prod.featured ?? true
    });
    setShowProductModal(true);
  };

  const handleSaveProduct = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...productForm,
        price: parseFloat(productForm.price),
        stock: parseInt(productForm.stock)
      };

      if (editingProduct) {
        await api.updateProduct(editingProduct.id, payload);
      } else {
        await api.createProduct(payload);
      }
      setShowProductModal(false);
      loadAllAdminData();
    } catch (err) {
      alert('Error saving product');
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      await api.deleteProduct(id);
      loadAllAdminData();
    }
  };

  // --- HERO SLIDE CRUD HANDLERS ---
  const handleOpenAddSlide = () => {
    setEditingSlide(null);
    setSlideForm({
      title: '',
      subtitle: '',
      imageUrl: '',
      buttonText: 'Shop Collection',
      categoryTag: 'Handcrafted',
      active: true,
      displayOrder: slides.length + 1
    });
    setShowSlideModal(true);
  };

  const handleOpenEditSlide = (slide) => {
    setEditingSlide(slide);
    setSlideForm({
      title: slide.title,
      subtitle: slide.subtitle,
      imageUrl: slide.imageUrl,
      buttonText: slide.buttonText || 'Shop Collection',
      categoryTag: slide.categoryTag || 'Handcrafted',
      active: slide.active ?? true,
      displayOrder: slide.displayOrder || 1
    });
    setShowSlideModal(true);
  };

  const handleSaveSlide = async (e) => {
    e.preventDefault();
    try {
      if (editingSlide) {
        await api.updateSlide(editingSlide.id, slideForm);
      } else {
        await api.createSlide(slideForm);
      }
      setShowSlideModal(false);
      loadAllAdminData();
    } catch (err) {
      alert('Error saving slide banner');
    }
  };

  const handleDeleteSlide = async (id) => {
    if (window.confirm('Delete this hero photo banner slide?')) {
      await api.deleteSlide(id);
      loadAllAdminData();
    }
  };

  // --- ORDER STATUS UPDATE HANDLER ---
  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      await api.updateOrderStatus(orderId, newStatus);
      loadAllAdminData();
    } catch (err) {
      alert('Error updating order status');
    }
  };

  return (
    <div className="space-y-6 pb-24 animate-fade-in">
      {/* Header Banner */}
      <div className="bg-[#2A1B17] text-white p-5 md:p-6 rounded-3xl shadow-md flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-[#C86D51] text-white">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-xl font-serif font-bold">Admin Control Panel</h2>
            <p className="text-xs md:text-sm text-[#D7CCC8]">Products, Home Hero Slides & Customer Orders Management</p>
          </div>
        </div>

        <button
          onClick={loadAllAdminData}
          className="p-2.5 bg-[#3D2924] hover:bg-[#543831] rounded-xl text-[#E0A96D] transition-colors"
          title="Refresh Data"
        >
          <RefreshCw className="w-5 h-5" />
        </button>
      </div>

      {/* Admin Tab Selectors */}
      <div className="flex bg-white p-1.5 rounded-2xl border border-[#E8DFD8] shadow-xs max-w-xl">
        <button
          onClick={() => setActiveAdminTab('products')}
          className={`flex-1 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
            activeAdminTab === 'products'
              ? 'bg-[#2A1B17] text-white shadow-xs'
              : 'text-[#543831] hover:bg-[#F7F4EF]'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Products ({products.length})</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('slides')}
          className={`flex-1 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
            activeAdminTab === 'slides'
              ? 'bg-[#2A1B17] text-white shadow-xs'
              : 'text-[#543831] hover:bg-[#F7F4EF]'
          }`}
        >
          <Image className="w-4 h-4" />
          <span>Hero Slides ({slides.length})</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('orders')}
          className={`flex-1 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
            activeAdminTab === 'orders'
              ? 'bg-[#2A1B17] text-white shadow-xs'
              : 'text-[#543831] hover:bg-[#F7F4EF]'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Orders ({orders.length})</span>
        </button>
      </div>

      {/* --- TAB 1: PRODUCTS MANAGEMENT --- */}
      {activeAdminTab === 'products' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center px-1">
            <h3 className="text-base font-bold text-[#2A1B17] font-serif">Product Catalog Management</h3>
            <button
              onClick={handleOpenAddProduct}
              className="flex items-center gap-2 px-4 py-2.5 bg-[#C86D51] text-white text-xs font-bold rounded-xl shadow hover:bg-[#b05c42] transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add Product</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((p) => (
              <div key={p.id} className="bg-white p-4 rounded-2xl border border-[#E8DFD8] flex items-center justify-between gap-4 shadow-xs">
                <img
                  src={p.imageUrl}
                  alt={p.name}
                  className="w-16 h-16 object-cover rounded-xl bg-[#F7F4EF]"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs md:text-sm font-bold text-[#2A1B17] truncate">{p.name}</h4>
                  <p className="text-[11px] text-[#8C7A70]">{p.category} • Stock: {p.stock}</p>
                  <p className="text-xs font-bold text-[#C86D51] mt-0.5">${p.price.toFixed(2)}</p>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleOpenEditProduct(p)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl"
                    title="Edit"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(p.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-xl"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- TAB 2: HERO SLIDES MANAGEMENT --- */}
      {activeAdminTab === 'slides' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center px-1">
            <div>
              <h3 className="text-base font-bold text-[#2A1B17] font-serif">Home Hero Photo Carousel</h3>
              <p className="text-xs text-[#8C7A70]">Edit, add or delete photos sliding on Home Page</p>
            </div>
            <button
              onClick={handleOpenAddSlide}
              className="flex items-center gap-2 px-4 py-2.5 bg-[#C86D51] text-white text-xs font-bold rounded-xl shadow hover:bg-[#b05c42] transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add Slide Banner</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {slides.map((s) => (
              <div key={s.id} className="bg-white rounded-2xl border border-[#E8DFD8] overflow-hidden shadow-xs">
                <div className="relative h-40 w-full">
                  <img src={s.imageUrl} alt={s.title} className="w-full h-full object-cover" />
                  <span className="absolute top-2 left-2 px-2.5 py-1 bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold rounded-full">
                    {s.categoryTag || 'Slide'}
                  </span>
                </div>
                <div className="p-4 flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-[#2A1B17]">{s.title}</h4>
                    <p className="text-[11px] text-[#8C7A70] line-clamp-1">{s.subtitle}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleOpenEditSlide(s)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteSlide(s.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-xl"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- TAB 3: CUSTOMER ORDERS MANAGEMENT --- */}
      {activeAdminTab === 'orders' && (
        <div className="space-y-4">
          <h3 className="text-base font-bold text-[#2A1B17] font-serif px-1">Customer Orders Management</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {orders.map((o) => (
              <div key={o.id || o.orderNumber} className="bg-white p-5 rounded-2xl border border-[#E8DFD8] shadow-xs space-y-3">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-[10px] font-bold text-[#8C7A70] uppercase">Order ID</span>
                    <h4 className="text-xs md:text-sm font-bold font-mono text-[#2A1B17]">{o.orderNumber}</h4>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#8C7A70]">Status:</span>
                    <select
                      value={o.status}
                      onChange={(e) => handleUpdateOrderStatus(o.id, e.target.value)}
                      className="px-3 py-1.5 text-xs font-bold rounded-xl border border-[#E8DFD8] bg-[#F7F4EF] text-[#2A1B17] outline-none"
                    >
                      <option value="PENDING">PENDING</option>
                      <option value="PROCESSING">PROCESSING</option>
                      <option value="SHIPPED">SHIPPED</option>
                      <option value="DELIVERED">DELIVERED</option>
                      <option value="CANCELLED">CANCELLED</option>
                    </select>
                  </div>
                </div>

                <div className="text-xs text-[#543831] bg-[#F7F4EF] p-3 rounded-xl">
                  <p className="font-semibold">{o.customerName} ({o.email})</p>
                  <p className="text-[11px] text-[#8C7A70] mt-0.5">{o.shippingAddress}</p>
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-[#F3EDE6] text-xs">
                  <span className="text-[#8C7A70]">{o.items?.length || 0} items purchased</span>
                  <span className="font-bold text-[#C86D51] text-sm">${o.totalAmount?.toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PRODUCT MODAL WITH IMAGE UPLOADER */}
      {showProductModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto animate-fade-in border border-[#E8DFD8]">
            <div className="flex justify-between items-center pb-2 border-b border-[#F3EDE6]">
              <h3 className="font-serif font-bold text-base text-[#2A1B17]">
                {editingProduct ? 'Edit Craft Product' : 'Add New Craft Product'}
              </h3>
              <button onClick={() => setShowProductModal(false)} className="text-gray-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-[#543831] mb-1">Product Name</label>
                <input
                  type="text"
                  required
                  value={productForm.name}
                  onChange={e => setProductForm({ ...productForm, name: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-[#E8DFD8] rounded-xl outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#543831] mb-1">Description</label>
                <textarea
                  required
                  rows={2}
                  value={productForm.description}
                  onChange={e => setProductForm({ ...productForm, description: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-[#E8DFD8] rounded-xl outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-[#543831] mb-1">Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={productForm.price}
                    onChange={e => setProductForm({ ...productForm, price: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-[#E8DFD8] rounded-xl outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#543831] mb-1">Stock Qty</label>
                  <input
                    type="number"
                    required
                    value={productForm.stock}
                    onChange={e => setProductForm({ ...productForm, stock: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-[#E8DFD8] rounded-xl outline-none"
                  />
                </div>
              </div>

              {/* Photo Uploader Component */}
              <ImageUpload
                label="Product Photo"
                value={productForm.imageUrl}
                onChange={url => setProductForm({ ...productForm, imageUrl: url })}
              />

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-[#543831] mb-1">Category</label>
                  <select
                    value={productForm.category}
                    onChange={e => setProductForm({ ...productForm, category: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-[#E8DFD8] rounded-xl outline-none bg-white"
                  >
                    <option value="Ceramics">Ceramics</option>
                    <option value="Textiles">Textiles</option>
                    <option value="Woodwork">Woodwork</option>
                    <option value="Leather Craft">Leather Craft</option>
                    <option value="Home Decor">Home Decor</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#543831] mb-1">Material</label>
                  <input
                    type="text"
                    required
                    value={productForm.material}
                    onChange={e => setProductForm({ ...productForm, material: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-[#E8DFD8] rounded-xl outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#543831] mb-1">Artisan Name</label>
                <input
                  type="text"
                  placeholder="Master Artisan Kabir"
                  value={productForm.artistName}
                  onChange={e => setProductForm({ ...productForm, artistName: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-[#E8DFD8] rounded-xl outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-[#2A1B17] text-white text-xs font-bold rounded-xl shadow hover:bg-[#543831] transition-colors"
              >
                Save Product
              </button>
            </form>
          </div>
        </div>
      )}

      {/* HERO SLIDE MODAL WITH IMAGE UPLOADER */}
      {showSlideModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto animate-fade-in border border-[#E8DFD8]">
            <div className="flex justify-between items-center pb-2 border-b border-[#F3EDE6]">
              <h3 className="font-serif font-bold text-base text-[#2A1B17]">
                {editingSlide ? 'Edit Hero Banner Slide' : 'Add New Hero Banner Slide'}
              </h3>
              <button onClick={() => setShowSlideModal(false)} className="text-gray-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveSlide} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-[#543831] mb-1">Slide Title</label>
                <input
                  type="text"
                  required
                  placeholder="Handcrafted Terracotta Pottery"
                  value={slideForm.title}
                  onChange={e => setSlideForm({ ...slideForm, title: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-[#E8DFD8] rounded-xl outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#543831] mb-1">Subtitle / Caption</label>
                <textarea
                  required
                  rows={2}
                  placeholder="Authentic clay craft moulded by master artisans..."
                  value={slideForm.subtitle}
                  onChange={e => setSlideForm({ ...slideForm, subtitle: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-[#E8DFD8] rounded-xl outline-none"
                />
              </div>

              {/* Photo Uploader Component for Hero Slide */}
              <ImageUpload
                label="Hero Banner Photo"
                value={slideForm.imageUrl}
                onChange={url => setSlideForm({ ...slideForm, imageUrl: url })}
              />

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-[#543831] mb-1">Category Tag</label>
                  <input
                    type="text"
                    placeholder="Ceramics"
                    value={slideForm.categoryTag}
                    onChange={e => setSlideForm({ ...slideForm, categoryTag: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-[#E8DFD8] rounded-xl outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#543831] mb-1">Button Text</label>
                  <input
                    type="text"
                    placeholder="Explore Pottery"
                    value={slideForm.buttonText}
                    onChange={e => setSlideForm({ ...slideForm, buttonText: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-[#E8DFD8] rounded-xl outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-[#2A1B17] text-white text-xs font-bold rounded-xl shadow hover:bg-[#543831] transition-colors"
              >
                Save Hero Photo Slide
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
