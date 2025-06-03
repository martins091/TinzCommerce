import React, { useState } from "react";

// Example data for food/junk type icons, replace with your icons as needed
const FOOD_TYPES = [
  { id: "food", label: "Food", icon: "🍔" },
  { id: "junk", label: "Junk", icon: "🍟" },
];

const ProductManagement = () => {
  const [activeView, setActiveView] = useState("list"); // 'list', 'add', or 'edit'
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Burger Deluxe",
      image:
        "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=400&q=80",
      foodType: "food",
      weight: "300g",
      normalPrice: 8.99,
      cancelledPrice: 10.99,
      rating: 4.5,
    },
    {
      id: 2,
      name: "French Fries",
      image:
        "https://simplehomeedit.com/wp-content/uploads/2024/03/Homemade-Beef-Burgers-4.webp",
      foodType: "junk",
      weight: "150g",
      normalPrice: 3.99,
      cancelledPrice: 5.49,
      rating: 4.0,
    },
  ]);

  const [productToEdit, setProductToEdit] = useState(null);

  // Add new product
  const handleAddProduct = (newProduct) => {
    setProducts([...products, { id: Date.now(), ...newProduct }]);
    setActiveView("list");
  };

  // Delete product
  const handleDeleteProduct = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter((product) => product.id !== id));
    }
  };

  // Start editing product
  const handleEditClick = (product) => {
    setProductToEdit(product);
    setActiveView("edit");
  };

  // Update product
  const handleUpdateProduct = (updatedProduct) => {
    setProducts(
      products.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
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

          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-600 uppercase text-sm">
                <th className="py-3 px-4 text-left">ID</th>
                <th className="py-3 px-4 text-left">Image</th>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Type</th>
                <th className="py-3 px-4 text-left">Weight</th>
                <th className="py-3 px-4 text-left">Normal Price ($)</th>
                <th className="py-3 px-4 text-left">Cancelled Price ($)</th>
                <th className="py-3 px-4 text-left">Rating</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 && (
                <tr>
                  <td colSpan="9" className="text-center py-6 text-gray-400">
                    No products available.
                  </td>
                </tr>
              )}
              {products.map(
                ({
                  id,
                  image,
                  name,
                  foodType,
                  weight,
                  normalPrice,
                  cancelledPrice,
                  rating,
                }) => {
                  const foodTypeObj = FOOD_TYPES.find((f) => f.id === foodType);
                  return (
                    <tr key={id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">{id}</td>
                      <td className="py-3 px-4">
                        <img
                          src={image}
                          alt={name}
                          className="w-16 h-16 rounded object-cover"
                        />
                      </td>
                      <td className="py-3 px-4">{name}</td>
                      <td className="py-3 px-4 flex items-center space-x-2">
                        <span>{foodTypeObj?.icon}</span>
                        <span>{foodTypeObj?.label}</span>
                      </td>
                      <td className="py-3 px-4">{weight}</td>
                      <td className="py-3 px-4">${normalPrice.toFixed(2)}</td>
                      <td className="py-3 px-4 line-through text-gray-400">
                        ${cancelledPrice.toFixed(2)}
                      </td>
                      <td className="py-3 px-4">{rating.toFixed(1)} ⭐</td>
                      <td className="py-3 px-4 space-x-2">
                        <button
                          onClick={() =>
                            handleEditClick({
                              id,
                              image,
                              name,
                              foodType,
                              weight,
                              normalPrice,
                              cancelledPrice,
                              rating,
                            })
                          }
                          className="text-blue-600 hover:underline"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(id)}
                          className="text-red-600 hover:underline"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
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

// Reusable form for Add and Edit
const ProductForm = ({ product, onCancel, onSubmit }) => {
  const isEdit = Boolean(product);
  const [name, setName] = useState(product?.name || "");
  const [image, setImage] = useState(product?.image || "");
  const [foodType, setFoodType] = useState(product?.foodType || "food");
  const [weight, setWeight] = useState(product?.weight || "");
  const [normalPrice, setNormalPrice] = useState(product?.normalPrice || "");
  const [cancelledPrice, setCancelledPrice] = useState(
    product?.cancelledPrice || ""
  );
  const [rating, setRating] = useState(product?.rating || "");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !name.trim() ||
      !image.trim() ||
      !weight.trim() ||
      !normalPrice ||
      isNaN(normalPrice) ||
      !cancelledPrice ||
      isNaN(cancelledPrice) ||
      !rating ||
      isNaN(rating)
    ) {
      alert("Please fill all fields with valid values.");
      return;
    }

    const newProduct = {
      id: product?.id || Date.now(),
      name: name.trim(),
      image: image.trim(),
      foodType,
      weight: weight.trim(),
      normalPrice: parseFloat(normalPrice),
      cancelledPrice: parseFloat(cancelledPrice),
      rating: parseFloat(rating),
    };

    onSubmit(newProduct);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 max-w-xl mx-auto"
      autoComplete="off"
      noValidate
    >
      <h2 className="text-2xl font-semibold mb-4">
        {isEdit ? "Edit Product" : "Add New Product"}
      </h2>

      <div>
        <label htmlFor="name" className="block mb-1 font-medium">
          Product Name
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Burger Deluxe"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label htmlFor="image" className="block mb-1 font-medium">
          Image URL
        </label>
        <input
          id="image"
          type="url"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="https://example.com/image.jpg"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label htmlFor="foodType" className="block mb-1 font-medium">
          Food Type
        </label>
        <select
          id="foodType"
          value={foodType}
          onChange={(e) => setFoodType(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {FOOD_TYPES.map(({ id, label }) => (
            <option key={id} value={id}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="weight" className="block mb-1 font-medium">
          Weight
        </label>
        <input
          id="weight"
          type="text"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          placeholder="e.g. 300g"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label htmlFor="normalPrice" className="block mb-1 font-medium">
          Normal Price ($)
        </label>
        <input
          id="normalPrice"
          type="number"
          min="0"
          step="0.01"
          value={normalPrice}
          onChange={(e) => setNormalPrice(e.target.value)}
          placeholder="e.g. 8.99"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label htmlFor="cancelledPrice" className="block mb-1 font-medium">
          Cancelled Price ($)
        </label>
        <input
          id="cancelledPrice"
          type="number"
          min="0"
          step="0.01"
          value={cancelledPrice}
          onChange={(e) => setCancelledPrice(e.target.value)}
          placeholder="e.g. 10.99"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label htmlFor="rating" className="block mb-1 font-medium">
          Rating (0 to 5)
        </label>
        <input
          id="rating"
          type="number"
          min="0"
          max="5"
          step="0.1"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          placeholder="e.g. 4.5"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          className={`${
            isEdit ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"
          } text-white px-6 py-2 rounded-lg transition`}
        >
          {isEdit ? "Update Product" : "Add Product"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="border border-gray-300 px-6 py-2 rounded-lg hover:bg-gray-100 transition"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ProductManagement;
