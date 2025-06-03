import React, { useState } from "react";

const USER_ROLES = [
  { id: "admin", label: "Admin" },
  { id: "user", label: "User" },
  { id: "moderator", label: "Moderator" },
];

const USER_STATUSES = [
  { id: "active", label: "Active" },
  { id: "inactive", label: "Inactive" },
];

const UserManagement = () => {
  const [activeView, setActiveView] = useState("list"); // 'list', 'add', 'edit'
  const [users, setUsers] = useState([
    {
      id: 1,
      fullName: "Jane Doe",
      email: "jane@example.com",
      role: "admin",
      status: "active",
      avatar:
        "https://randomuser.me/api/portraits/women/68.jpg",
    },
    {
      id: 2,
      fullName: "John Smith",
      email: "john@example.com",
      role: "user",
      status: "inactive",
      avatar:
        "https://randomuser.me/api/portraits/men/75.jpg",
    },
  ]);

  const [userToEdit, setUserToEdit] = useState(null);

  // Add new user
  const handleAddUser = (newUser) => {
    setUsers([...users, { id: Date.now(), ...newUser }]);
    setActiveView("list");
  };

  // Delete user
  const handleDeleteUser = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((user) => user.id !== id));
    }
  };

  // Start editing user
  const handleEditClick = (user) => {
    setUserToEdit(user);
    setActiveView("edit");
  };

  // Update user
  const handleUpdateUser = (updatedUser) => {
    setUsers(
      users.map((user) =>
        user.id === updatedUser.id ? updatedUser : user
      )
    );
    setUserToEdit(null);
    setActiveView("list");
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow text-gray-700 max-w-5xl mx-auto">
      {activeView === "list" && (
        <>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">User Management</h2>
            <button
              onClick={() => setActiveView("add")}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
            >
              + Add User
            </button>
          </div>

          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-600 uppercase text-sm">
                <th className="py-3 px-4 text-left">ID</th>
                <th className="py-3 px-4 text-left">Avatar</th>
                <th className="py-3 px-4 text-left">Full Name</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-left">Role</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center py-6 text-gray-400">
                    No users available.
                  </td>
                </tr>
              )}
              {users.map(({ id, avatar, fullName, email, role, status }) => (
                <tr key={id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">{id}</td>
                  <td className="py-3 px-4">
                    <img
                      src={avatar}
                      alt={fullName}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  </td>
                  <td className="py-3 px-4">{fullName}</td>
                  <td className="py-3 px-4">{email}</td>
                  <td className="py-3 px-4 capitalize">{role}</td>
                  <td className={`py-3 px-4 font-semibold ${status === "active" ? "text-green-600" : "text-red-600"}`}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </td>
                  <td className="py-3 px-4 space-x-3">
                    <button
                      onClick={() =>
                        handleEditClick({ id, avatar, fullName, email, role, status })
                      }
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteUser(id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {(activeView === "add" || activeView === "edit") && (
        <UserForm
          user={userToEdit}
          onCancel={() => {
            setUserToEdit(null);
            setActiveView("list");
          }}
          onSubmit={activeView === "add" ? handleAddUser : handleUpdateUser}
        />
      )}
    </div>
  );
};

const UserForm = ({ user, onCancel, onSubmit }) => {
  const isEdit = Boolean(user);
  const [fullName, setFullName] = useState(user?.fullName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [role, setRole] = useState(user?.role || "user");
  const [status, setStatus] = useState(user?.status || "active");
  const [avatar, setAvatar] = useState(
    user?.avatar || "https://via.placeholder.com/150"
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!fullName.trim() || !email.trim() || !avatar.trim()) {
      alert("Please fill all required fields.");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    const newUser = {
      id: user?.id || Date.now(),
      fullName: fullName.trim(),
      email: email.trim(),
      role,
      status,
      avatar: avatar.trim(),
    };

    onSubmit(newUser);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 max-w-md mx-auto"
      autoComplete="off"
      noValidate
    >
      <h2 className="text-2xl font-semibold mb-4">
        {isEdit ? "Edit User" : "Add New User"}
      </h2>

      <div>
        <label htmlFor="fullName" className="block mb-1 font-medium">
          Full Name
        </label>
        <input
          id="fullName"
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="e.g. John Doe"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />
      </div>

      <div>
        <label htmlFor="email" className="block mb-1 font-medium">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="e.g. john@example.com"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />
      </div>

      <div>
        <label htmlFor="role" className="block mb-1 font-medium">
          Role
        </label>
        <select
          id="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          {USER_ROLES.map(({ id, label }) => (
            <option key={id} value={id}>
              {label}
            </option>
          ))}
        </select>
  </div>

  <div>
    <label htmlFor="status" className="block mb-1 font-medium">
      Status
    </label>
    <select
      id="status"
      value={status}
      onChange={(e) => setStatus(e.target.value)}
      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
    >
      {USER_STATUSES.map(({ id, label }) => (
        <option key={id} value={id}>
          {label}
        </option>
      ))}
    </select>
  </div>

  <div>
    <label htmlFor="avatar" className="block mb-1 font-medium">
      Avatar URL
    </label>
    <input
      id="avatar"
      type="url"
      value={avatar}
      onChange={(e) => setAvatar(e.target.value)}
      placeholder="https://example.com/image.jpg"
      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
    />
  </div>

  <div className="flex justify-between">
    <button
      type="button"
      onClick={onCancel}
      className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-lg"
    >
      Cancel
    </button>
    <button
      type="submit"
      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
    >
      {isEdit ? "Update User" : "Add User"}
    </button>
  </div>
</form>
);
};

export default UserManagement;