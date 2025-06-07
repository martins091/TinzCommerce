import React, { useEffect, useState } from "react";
import { ProductForm } from "./CreateProductForm";
import SuccessModal from '../../components/modal/SuccessModal';
import {
  getAllProductsThunk,
  deleteProductThunk,
  updateProductThunk,
} from "../../features/products/productThunks";
import { useSelector, useDispatch } from "react-redux";

const ProductManagement = () => {
  const [activeView, setActiveView] = useState("list");
  const [productToEdit, setProductToEdit] = useState(null);
  const [page, setPage] = useState(1);
  const [allProducts, setAllProducts] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const [deleting, setDeleting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.product);

  useEffect(() => {
    fetchProducts(page);
  }, []);

  useEffect(() => {
    if (products.length === 0) {
      setHasMore(false);
    } else {
      setAllProducts((prev) => {
        const existingIds = new Set(prev.map(p => p._id));
        const newUniqueProducts = products.filter(p => !existingIds.has(p._id));
        return [...prev, ...newUniqueProducts];
      });
    }
  }, [products]);

  const fetchProducts = (pageToFetch) => {
    dispatch(getAllProductsThunk(pageToFetch));
  };

  const handleShowMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchProducts(nextPage);
  };

  const handleEditClick = (product) => {
    setProductToEdit(product);
    setActiveView("edit");
  };

  const handleDeleteProduct = async (productId) => {
    setDeleting(true);
    try {
      await dispatch(deleteProductThunk(productId)).unwrap();
      setAllProducts((prev) => prev.filter((product) => product._id !== productId));
      setPage(1);
      setHasMore(true);
      await dispatch(getAllProductsThunk(1));
      setTimeout(() => {
        setSuccessMessage("Product deleted successfully");
        setShowSuccessModal(true);
        setDeleting(false);
      }, 1000);
    } catch (error) {
      console.error("Delete failed:", error);
      setSuccessMessage("Failed to delete product");
      setShowSuccessModal(true);
      setDeleting(false);
    }
  };

  const handleAddProduct = () => {
    setAllProducts([]);
    setPage(1);
    setHasMore(true);
    dispatch(getAllProductsThunk(1));
    setActiveView("list");
  };

  const handleUpdateProduct = (updatedProduct) => {
    dispatch(
      updateProductThunk({
        id: updatedProduct._id || updatedProduct.id,
        productData: updatedProduct,
      })
    ).then(() => {
      setAllProducts([]);
      setPage(1);
      setHasMore(true);
      dispatch(getAllProductsThunk(1));
      setProductToEdit(null);
      setActiveView("list");
    });
  };

  return (
    <div className="bg-white p-4 md:p-6 rounded-2xl shadow text-gray-700 max-w-7xl mx-auto relative">
      {activeView === "list" && (
        <>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <h2 className="text-xl md:text-2xl font-semibold">Product Management</h2>
            <button
              onClick={() => setActiveView("add")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition w-full md:w-auto"
            >
              + Add Product
            </button>
          </div>

          {loading && allProducts.length === 0 ? (
            <div className="flex justify-center items-center py-20">
              <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse min-w-[900px]">
                  <thead>
                    <tr className="bg-gray-100 text-gray-600 uppercase text-sm">
                      <th className="py-3 px-4 text-left">Image</th>
                      <th className="py-3 px-4 text-left">Name</th>
                      <th className="py-3 px-4 text-left">Category</th>
                      <th className="py-3 px-4 text-left">Price ($)</th>
                      <th className="py-3 px-4 text-left">In Stock</th>
                      <th className="py-3 px-4 text-left">Ratings</th>
                      <th className="py-3 px-4 text-left">Reviews</th>
                      <th className="py-3 px-4 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allProducts.length === 0 ? (
                      <tr>
                        <td colSpan="8" className="text-center py-6 text-gray-400">
                          No products available.
                        </td>
                      </tr>
                    ) : (
                      allProducts.map((product) => (
                        <tr
                          key={product._id || product.id}
                          className="border-b hover:bg-gray-50"
                        >
                          <td className="py-3 px-4">
                            <img
                              src={product.images?.[0]?.url || "/placeholder.jpg"}
                              alt={product.name}
                              className="w-16 h-16 rounded object-cover"
                            />
                          </td>
                          <td className="py-3 px-4">{product.name}</td>
                          <td className="py-3 px-4">{product.category}</td>
                          <td className="py-3 px-4">${product.price?.toFixed(2)}</td>
                          <td className="py-3 px-4">{product.countInStock}</td>
                          <td className="py-3 px-4">{product.ratings?.toFixed(1)} ⭐</td>
                          <td className="py-3 px-4">{product.numReviews}</td>
                          <td className="py-3 px-4 space-x-2 whitespace-nowrap">
                            <button
                              onClick={() => handleEditClick(product)}
                              className="text-blue-600 hover:underline"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() =>
                                handleDeleteProduct(product._id || product.id)
                              }
                              className="text-red-600 hover:underline"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {hasMore && !loading && (
                <div className="text-center mt-6">
                  <button
                    onClick={handleShowMore}
                    className="text-blue-600 font-medium hover:underline"
                  >
                    Show More Items
                  </button>
                </div>
              )}

              {loading && allProducts.length > 0 && (
                <div className="text-center mt-4">Loading more products...</div>
              )}
            </>
          )}
        </>
      )}

      {activeView === "add" && (
        <ProductForm
          onCancel={() => setActiveView("list")}
          onSubmit={handleAddProduct}
          setActiveView={setActiveView}
        />
      )}

      {activeView === "edit" && productToEdit && (
        <ProductForm
          product={productToEdit}
          onCancel={() => {
            setProductToEdit(null);
            setActiveView("list");
          }}
          onSubmit={handleUpdateProduct}
          setActiveView={setActiveView}
        />
      )}

      {deleting && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="w-12 h-12 border-4 border-white border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      )}

      <SuccessModal
        isOpen={showSuccessModal}
        message={successMessage}
        onClose={() => setShowSuccessModal(false)}
      />
    </div>
  );
};

export default ProductManagement;
