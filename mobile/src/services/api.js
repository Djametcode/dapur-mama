import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://localhost:3000';

const getHeaders = async () => {
  const token = await AsyncStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export const api = {
  // Recipes
  getRecipes: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_URL}/api/recipes?${query}`);
    return res.json();
  },

  getRecipeById: async (id) => {
    const res = await fetch(`${API_URL}/api/recipes/${id}`);
    return res.json();
  },

  // Tutorials
  getTutorials: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_URL}/api/tutorials?${query}`);
    return res.json();
  },

  getTutorialById: async (id) => {
    const res = await fetch(`${API_URL}/api/tutorials/${id}`);
    return res.json();
  },

  // Blogs
  getBlogs: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_URL}/api/blogs?${query}`);
    return res.json();
  },

  getBlogById: async (id) => {
    const res = await fetch(`${API_URL}/api/blogs/${id}`);
    return res.json();
  },

  // Categories
  getCategories: async () => {
    const res = await fetch(`${API_URL}/api/categories`);
    return res.json();
  },

  // User
  getProfile: async () => {
    const headers = await getHeaders();
    const res = await fetch(`${API_URL}/api/auth/me`, { headers });
    return res.json();
  },
};

export default api;
