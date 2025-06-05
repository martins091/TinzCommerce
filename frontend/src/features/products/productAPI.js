import API from '../../services/axios'
import { getAuthHeaders } from '../../utils/authHeader'

export const createProduct = async (product) => {
  const headers = getAuthHeaders()
  const response = await API.post('/products/createProduct', product, { headers });
  return response.data;
}

export const getAllProducts = async (page = 1) => {
  try {
    const headers = getAuthHeaders(); // make sure this returns { Authorization: "Bearer <token>" }
    const response = await API.get(`/products/getAllProducts?page=${page}`, { headers });
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

