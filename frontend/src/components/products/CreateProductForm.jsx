import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProductThunk, updateProductThunk } from "../../features/products/productThunks"; // make sure you have update thunk
import { useNavigate } from "react-router-dom";
import SuccessModal from "../modal/SuccessModal";

export const ProductForm = ({ product, onCancel, onSubmit, setActiveView  }) => {
  const dispatch = useDispatch();

  const userId = useSelector((state) => state.user.userInfo?.id);

  // Initialize state; if product prop exists (edit mode), populate fields
  const [name, setName] = useState(product ? product.name : "");
  const [description, setDescription] = useState(product ? product.description : "");
  const [productImages, setProductImages] = useState([]); // images always empty on edit unless new images chosen
  const [category, setCategory] = useState(product ? product.category : "");
  const [price, setPrice] = useState(product ? product.price : "");
  const [countInStock, setCountInStock] = useState(product ? product.countInStock : "");

  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // If product prop changes, update form fields
  useEffect(() => {
    if (product) {
      setName(product.name);
      setDescription(product.description);
      setCategory(product.category);
      setPrice(product.price);
      setCountInStock(product.countInStock);
      setProductImages([]); // reset images input on edit unless user adds new ones
    } else {
      // Reset to empty for add mode
      setName("");
      setDescription("");
      setCategory("");
      setPrice("");
      setCountInStock("");
      setProductImages([]);
    }
  }, [product]);

  const handleSubmit = async (e) => {
  e.preventDefault();

  console.log("Submitting form...");
  console.log("Product (edit mode)?:", product);

  if (!userId) {
    alert("User not authenticated");
    return;
  }

  if (
    !name ||
    !description ||
    (!product && productImages.length === 0) || // require images only when adding
    !category ||
    !price ||
    isNaN(price) ||
    !countInStock ||
    isNaN(countInStock)
  ) {
    alert("Please fill all fields correctly.");
    return;
  }

  const formData = new FormData();
  formData.append("name", name);
  formData.append("description", description);
  formData.append("category", category);
  formData.append("price", price);
  formData.append("countInStock", countInStock);
  formData.append("user", userId);

  productImages.forEach((file) => {
    formData.append("images", file);
  });

  try {
    setLoading(true);

    if (product) {
      console.log("Dispatching updateProductThunk with ID:", product._id);
      await dispatch(updateProductThunk({ id: product._id, productData: formData })).unwrap();
    } else {
      console.log("Dispatching createProductThunk");
      await dispatch(createProductThunk(formData)).unwrap();
    }

    setLoading(false);
    setShowSuccessModal(true);
  } catch (err) {
    setLoading(false);
    console.error("Error submitting form:", err);
    alert("Failed to save product: " + (err?.message || err));
  }
};


  // Close modal and navigate back (or you can call onCancel if you want)
  const handleModalClose = () => {
    setShowSuccessModal(false);
    setActiveView("list");
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="space-y-6 max-w-xl mx-auto"
        encType="multipart/form-data"
      >
        <h2 className="text-2xl font-semibold">{product ? "Edit Product" : "Add New Product"}</h2>

        <div>
          <label className="block mb-1">Product Name</label>
          <input
            type="text"
            className="w-full border rounded px-4 py-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. iPhone 14 Pro"
            disabled={loading}
          />
        </div>

        <div>
          <label className="block mb-1">Description</label>
          <textarea
            className="w-full border rounded px-4 py-2"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter product description"
            disabled={loading}
          />
        </div>

        <div>
          <label className="block mb-1">Product Images {product ? "(Upload to replace)" : ""}</label>
          <input
            type="file"
            accept="image/*"
            multiple
            className="w-full border rounded px-4 py-2"
            onChange={(e) => setProductImages(Array.from(e.target.files))}
            disabled={loading}
          />
        </div>

        <div>
          <label className="block mb-1">Category</label>
          <input
            type="text"
            className="w-full border rounded px-4 py-2"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="e.g. Smartphones"
            disabled={loading}
          />
        </div>

        <div>
          <label className="block mb-1">Price ($)</label>
          <input
            type="number"
            min="0"
            className="w-full border rounded px-4 py-2"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="e.g. 999"
            disabled={loading}
          />
        </div>

        <div>
          <label className="block mb-1">Count in Stock</label>
          <input
            type="number"
            min="0"
            className="w-full border rounded px-4 py-2"
            value={countInStock}
            onChange={(e) => setCountInStock(e.target.value)}
            placeholder="e.g. 20"
            disabled={loading}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`px-6 py-2 rounded text-white ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
        >
          {loading ? (product ? "Updating..." : "Adding...") : product ? "Update Product" : "Add Product"}
        </button>

        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="ml-4 px-6 py-2 rounded text-white bg-gray-600 hover:bg-gray-700"
            disabled={loading}
          >
            Cancel
          </button>
        )}
      </form>

      <SuccessModal
        isOpen={showSuccessModal}
        message={product ? "Product updated successfully!" : "Product created successfully!"}
        onClose={handleModalClose}
      />
    </>
  );
};
