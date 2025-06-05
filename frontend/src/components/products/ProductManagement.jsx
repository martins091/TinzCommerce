import React, { useEffect, useState } from "react";
import { ProductForm } from "./CreateProductForm";
import { getAllProductsThunk } from "../../features/products/productThunks";
import { useSelector, useDispatch } from "react-redux";

const ProductManagement = () => {
  const [activeView, setActiveView] = useState("list");
  const [productToEdit, setProductToEdit] = useState(null);
  const dispatch = useDispatch();

  // 👇 Use Redux state
  const { products, loading } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getAllProductsThunk());
  }, [dispatch]);

  const handleAddProduct = (newProduct) => {
    // Add manually if needed, or refetch
    dispatch(getAllProductsThunk());
    setActiveView("list");
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      // Delete logic (use thunk if needed), then refetch
      dispatch(fetchAllProducts());
    }
  };

  const handleEditClick = (product) => {
    setProductToEdit(product);
    setActiveView("edit");
  };

  const handleUpdateProduct = (updatedProduct) => {
    // Update logic (use thunk if needed), then refetch
    dispatch(getAllProductsThunk());
    setProductToEdit(null);
    setActiveView("list");
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow text-gray-700 max-w-6xl mx-auto">
      {activeView === "list" && (
        <>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Product Management</h2>
            <button
              onClick={() => setActiveView("add")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
            >
              + Add Product
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
            </div>
          ) : (
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 text-gray-600 uppercase text-sm">
                  <th className="py-3 px-4 text-left">ID</th>
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
                {products.length === 0 ? (
                  <tr>
                    <td colSpan="9" className="text-center py-6 text-gray-400">
                      No products available.
                    </td>
                  </tr>
                ) : (
                  products.map((product) => (
                    <tr key={product.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">{product.id}</td>
                      <td className="py-3 px-4">
                        <img
                          src={product.images?.[0]?.url || "/placeholder.jpg"}
                          alt={product.name}
                          className="w-16 h-16 rounded object-cover"
                        />
                      </td>
                      <td className="py-3 px-4">{product.name}</td>
                      <td className="py-3 px-4">{product.category}</td>
                      <td className="py-3 px-4">${product.price.toFixed(2)}</td>
                      <td className="py-3 px-4">{product.countInStock}</td>
                      <td className="py-3 px-4">{product.ratings.toFixed(1)} ⭐</td>
                      <td className="py-3 px-4">{product.numReviews}</td>
                      <td className="py-3 px-4 space-x-2">
                        <button
                          onClick={() => handleEditClick(product)}
                          className="text-blue-600 hover:underline"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
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
          )}
        </>
      )}

      {activeView === "add" && (
        <ProductForm
          onCancel={() => setActiveView("list")}
          onSubmit={handleAddProduct}
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
        />
      )}
    </div>
  );
};

export default ProductManagement;
