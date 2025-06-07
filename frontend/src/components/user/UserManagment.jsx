import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllUsersThunk,
  editUserRoleThunk,
  deleteUserByAdminThunk,
} from "../../features/user/userThunks";

const USER_ROLES = [
  { id: "Admin", label: "Admin" },
  { id: "User", label: "User" },
];


const UserManagement = () => {
  const dispatch = useDispatch();

  const [editingUserId, setEditingUserId] = useState(null);
  const [selectedRole, setSelectedRole] = useState("");

  // Select users, loading, and error from the user slice state
  const { allUsers: users, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getAllUsersThunk());
  }, [dispatch]);

  const handleDeleteUser = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUserByAdminThunk(id))
        .unwrap()
        .then(() => {
          // Optionally reload all users if needed
          dispatch(getAllUsersThunk());
        })
        .catch((err) => {
          alert("Failed to delete user: " + err);
        });
    }
  };

  const handleEditClick = (user) => {
    setEditingUserId(user._id);
    setSelectedRole(user.role);
  };

  const handleUpdateRole = (e) => {
    e.preventDefault();
    if (!selectedRole || !editingUserId) return;

    dispatch(editUserRoleThunk({ userId: editingUserId, role: selectedRole }))
      .unwrap()
      .then(() => {
        setEditingUserId(null);
        setSelectedRole("");
        // Optionally reload all users if needed
        dispatch(getAllUsersThunk());
      })
      .catch((err) => {
        alert("Failed to update user role: " + err);
      });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <svg
          className="animate-spin h-10 w-10 text-gray-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-label="Loading spinner"
          role="img"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8z"
          ></path>
        </svg>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-600 text-center py-6" role="alert">
        Error loading users: {error}
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow text-gray-700 max-w-5xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">User Management</h2>

      <table className="w-full border-collapse" aria-label="User management table">
        <thead>
          <tr className="bg-gray-100 text-gray-600 uppercase text-sm">
            {/* <th className="py-3 px-4 text-left">ID</th> */}
            <th className="py-3 px-4 text-left">Avatar</th>
            <th className="py-3 px-4 text-left">Full Name</th>
            <th className="py-3 px-4 text-left">Email</th>
            <th className="py-3 px-4 text-left">Role</th>
            <th className="py-3 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {!users || users.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center py-6 text-gray-400">
                No users found.
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user._id} className="border-b hover:bg-gray-50">
                {/* <td className="py-3 px-4 break-all">{user._id}</td> */}
                <td className="py-3 px-4">
                  <img
                    src={user.profileImage || "https://via.placeholder.com/100"}
                    alt={user.name || "User avatar"}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </td>
                <td className="py-3 px-4">{user.name || "-"}</td>
                <td className="py-3 px-4">{user.email || "-"}</td>
                <td className="py-3 px-4 capitalize">
                  {editingUserId === user._id ? (
                    <form onSubmit={handleUpdateRole} className="flex items-center space-x-2">
                      <select
                        value={selectedRole}
                        onChange={(e) => setSelectedRole(e.target.value)}
                        className="border px-2 py-1 rounded"
                        aria-label={`Select role for ${user.name}`}
                      >
                        {USER_ROLES.map((role) => (
                          <option key={role.id} value={role.id}>
                            {role.label}
                          </option>
                        ))}
                      </select>
                      <button
                        type="submit"
                        className="text-green-600 hover:underline"
                        aria-label="Save role"
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        className="text-gray-500 hover:underline"
                        onClick={() => setEditingUserId(null)}
                        aria-label="Cancel role edit"
                      >
                        Cancel
                      </button>
                    </form>
                  ) : (
                    user.role || "-"
                  )}
                </td>
                <td className="py-3 px-4 space-x-3">
                  <button
                    onClick={() => handleEditClick(user)}
                    className="text-blue-600 hover:underline"
                    aria-label={`Edit role of ${user.fullName}`}
                  >
                    Edit Role
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user._id)}
                    className="text-red-600 hover:underline"
                    aria-label={`Delete user ${user.fullName}`}
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
  );
};

export default UserManagement;
