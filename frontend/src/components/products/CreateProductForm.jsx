import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProductThunk } from "../../features/products/productThunks";
import { useNavigate } from "react-router-dom";
import SuccessModal from "../modal/SuccessModal";

export const ProductForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userId = useSelector((state) => state.user.userInfo?.id);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [productImages, setProductImages] = useState([]); // Array for multiple files
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [countInStock, setCountInStock] = useState("");

    // NEW STATES
    const [loading, setLoading] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!userId) {
            alert("User not authenticated");
            return;
        }

        if (
            !name ||
            !description ||
            productImages.length === 0 ||
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
            await dispatch(createProductThunk(formData)).unwrap();
            setLoading(false);
            setShowSuccessModal(true);
        } catch (err) {
            setLoading(false);
            console.error(err);
            alert("Failed to create product: " + (err?.message || err));
        }
    };

    // When modal closes, navigate to dashboard
    const handleModalClose = () => {
        setShowSuccessModal(false);
        navigate("/dashboard/products");
    };

    return (
        <>
            <form
                onSubmit={handleSubmit}
                className="space-y-6 max-w-xl mx-auto"
                encType="multipart/form-data"
            >
                <h2 className="text-2xl font-semibold">Add New Product</h2>

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
                    <label className="block mb-1">Product Images</label>
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
                    {loading ? "Adding..." : "Add Product"}
                </button>
            </form>

            <SuccessModal
                isOpen={showSuccessModal}
                message="Product created successfully!"
                onClose={handleModalClose}
            />

        </>
    );
};
