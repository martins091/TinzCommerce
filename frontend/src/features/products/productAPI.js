import API from '../../services/axios'

export const getProducts = async () => {
  const response = await API.get('/products')
  return response.data
}
