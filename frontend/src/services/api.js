const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

export const api = {
  // Method 2 Secure File Upload API (Sends photo file to Java Spring Boot Backend)
  uploadFile: async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch(`${API_BASE_URL}/upload`, {
      method: 'POST',
      body: formData
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Failed to upload photo');
    }

    const data = await res.json();
    return data.url;
  },

  // Auth API
  login: async (credentials) => {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Invalid credentials');
    }
    return await res.json();
  },

  register: async (userData) => {
    const res = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Registration failed');
    }
    return await res.json();
  },

  // Products API
  getProducts: async (params = {}) => {
    try {
      const query = new URLSearchParams(params).toString();
      const res = await fetch(`${API_BASE_URL}/products${query ? `?${query}` : ''}`);
      if (!res.ok) throw new Error('Failed to fetch products');
      return await res.json();
    } catch (err) {
      console.warn('API connection offline, using fallback products:', err);
      return [];
    }
  },

  getNewArrivals: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/products/new-arrivals`);
      if (!res.ok) throw new Error('Failed to fetch new arrivals');
      return await res.json();
    } catch (err) {
      console.warn('API connection offline:', err);
      return [];
    }
  },

  createProduct: async (productData) => {
    const res = await fetch(`${API_BASE_URL}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData)
    });
    if (!res.ok) throw new Error('Failed to create product');
    return await res.json();
  },

  updateProduct: async (id, productData) => {
    const res = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData)
    });
    if (!res.ok) throw new Error('Failed to update product');
    return await res.json();
  },

  deleteProduct: async (id) => {
    const res = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'DELETE'
    });
    if (!res.ok) throw new Error('Failed to delete product');
    return true;
  },

  // Hero Slides API
  getSlides: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/slides`);
      if (!res.ok) throw new Error('Failed to fetch slides');
      return await res.json();
    } catch (err) {
      console.warn('API offline for slides:', err);
      return [];
    }
  },

  getAdminSlides: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/slides/admin`);
      if (!res.ok) throw new Error('Failed to fetch admin slides');
      return await res.json();
    } catch (err) {
      return [];
    }
  },

  createSlide: async (slideData) => {
    const res = await fetch(`${API_BASE_URL}/slides`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(slideData)
    });
    if (!res.ok) throw new Error('Failed to create slide');
    return await res.json();
  },

  updateSlide: async (id, slideData) => {
    const res = await fetch(`${API_BASE_URL}/slides/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(slideData)
    });
    if (!res.ok) throw new Error('Failed to update slide');
    return await res.json();
  },

  deleteSlide: async (id) => {
    const res = await fetch(`${API_BASE_URL}/slides/${id}`, {
      method: 'DELETE'
    });
    if (!res.ok) throw new Error('Failed to delete slide');
    return true;
  },

  // Orders API
  createOrder: async (orderData) => {
    const res = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData)
    });
    if (!res.ok) throw new Error('Failed to place order');
    return await res.json();
  },

  getOrders: async (email = '') => {
    try {
      const query = email ? `?email=${encodeURIComponent(email)}` : '';
      const res = await fetch(`${API_BASE_URL}/orders${query}`);
      if (!res.ok) throw new Error('Failed to fetch orders');
      return await res.json();
    } catch (err) {
      return [];
    }
  },

  updateOrderStatus: async (id, status) => {
    const res = await fetch(`${API_BASE_URL}/orders/${id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    if (!res.ok) throw new Error('Failed to update order status');
    return await res.json();
  }
};
