const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Helper function to handle API requests
const apiRequest = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || error.message || 'Request failed');
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Photo API methods
export const photoAPI = {
  // Get all photos
  getAll: async () => {
    return await apiRequest('/photos');
  },

  // Get a single photo by ID
  getById: async (id) => {
    return await apiRequest(`/photos/${id}`);
  },

  // Create a new photo (supports both file upload and URL)
  create: async (photoData, file = null) => {
    if (file) {
      // File upload using FormData
      const formData = new FormData();
      formData.append('image', file);
      if (photoData.title) {
        formData.append('title', photoData.title);
      }
      if (photoData.url) {
        formData.append('url', photoData.url);
      }

      const response = await fetch(`${API_BASE_URL}/photos`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || error.message || 'Request failed');
      }

      return await response.json();
    } else {
      // URL-based upload
      return await apiRequest('/photos', {
        method: 'POST',
        body: JSON.stringify(photoData),
      });
    }
  },

  // Update a photo (supports both file upload and URL)
  update: async (id, photoData, file = null) => {
    if (file) {
      // File upload using FormData
      const formData = new FormData();
      formData.append('image', file);
      if (photoData.title !== undefined) {
        formData.append('title', photoData.title);
      }
      if (photoData.url) {
        formData.append('url', photoData.url);
      }

      const response = await fetch(`${API_BASE_URL}/photos/${id}`, {
        method: 'PUT',
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || error.message || 'Request failed');
      }

      return await response.json();
    } else {
      // URL-based update
      return await apiRequest(`/photos/${id}`, {
        method: 'PUT',
        body: JSON.stringify(photoData),
      });
    }
  },

  // Delete a photo
  delete: async (id) => {
    return await apiRequest(`/photos/${id}`, {
      method: 'DELETE',
    });
  },
};

// Auth API methods
export const authAPI = {
  // Login
  login: async (password) => {
    return await apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ password }),
    });
  },

  // Change password
  changePassword: async (currentPassword, newPassword) => {
    return await apiRequest('/auth/change-password', {
      method: 'POST',
      body: JSON.stringify({ currentPassword, newPassword }),
    });
  },
};

