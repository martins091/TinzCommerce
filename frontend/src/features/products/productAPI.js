import API from '../../services/axios'
import { getAuthHeaders } from '../../utils/authHeader'

export const createProduct = async (product) => {
  const headers = getAuthHeaders()
  const response = await API.post('/products/createProduct', product, { headers });
  return response.data;
}


// get all product my admin
export const getAllProducts = async (page = 1) => {
  try {
    const headers = getAuthHeaders(); // make sure this returns { Authorization: "Bearer <token>" }
    const response = await API.get(`/products/getProducts?page=${page}`, { headers });
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

// get all product by public
export const getAllProductsPublic = async (page = 1) => {
  try {
    const response = await API.get(`/products/getProducts/${page}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching public products:", error);
    throw error;
  }
};

// get single product by id
export const getSingleProduct = async (id) => {
  try {
    const response = await API.get(`/products/getProduct/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching single product:", error);
    throw error;
  }
};

export const updateProduct = async (id, product) => {
  const headers = getAuthHeaders()
  const response = await API.put(`/products/updateProduct/${id}`, product, { headers });
  return response.data;
}

// In API
export const deleteProduct = async (id) => {
  console.log("Attempting to delete product ID:", id);
  const headers = getAuthHeaders();
  const response = await API.delete(`/products/deleteProduct/${id}`, { headers });
  console.log("Delete response:", response);
  return response.data;
};

// get product count by admin
export const getProductCountByAdmin = async () => {
  const headers = getAuthHeaders();
  const response = await API.get('/products/admin-get-products-count', { headers });
  return response.data;
};
