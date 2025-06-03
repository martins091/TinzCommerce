import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { FaUsers, FaBoxOpen, FaChartLine } from 'react-icons/fa';
// import AddProductForm from '../../components/products/ProductManagement';
import ProductManagement from '../../components/products/ProductManagement';
import UserManagement from '../../components/user/UserManagment';

const data = [
  { name: 'Jan', users: 400, sales: 2400 },
  { name: 'Feb', users: 300, sales: 2210 },
  { name: 'Mar', users: 500, sales: 2290 },
  { name: 'Apr', users: 278, sales: 2000 },
  { name: 'May', users: 189, sales: 2181 },
  { name: 'Jun', users: 239, sales: 2500 },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Admin Dashboard</h1>

        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              activeTab === 'overview'
                ? 'bg-blue-600 text-white shadow'
                : 'bg-white text-gray-700 border border-gray-300'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              activeTab === 'users'
                ? 'bg-blue-600 text-white shadow'
                : 'bg-white text-gray-700 border border-gray-300'
            }`}
          >
            Users
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              activeTab === 'products'
                ? 'bg-blue-600 text-white shadow'
                : 'bg-white text-gray-700 border border-gray-300'
            }`}
          >
            Products
          </button>
        </div>

        {/* Dashboard Cards */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition-all">
              <div className="flex items-center space-x-4">
                <FaUsers className="text-blue-500 text-3xl" />
                <div>
                  <p className="text-gray-500 text-sm">Total Users</p>
                  <h2 className="text-xl font-semibold">1,240</h2>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition-all">
              <div className="flex items-center space-x-4">
                <FaBoxOpen className="text-green-500 text-3xl" />
                <div>
                  <p className="text-gray-500 text-sm">Products</p>
                  <h2 className="text-xl font-semibold">320</h2>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition-all">
              <div className="flex items-center space-x-4">
                <FaChartLine className="text-purple-500 text-3xl" />
                <div>
                  <p className="text-gray-500 text-sm">Monthly Sales</p>
                  <h2 className="text-xl font-semibold">$24,000</h2>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Chart Section */}
        {activeTab === 'overview' && (
          <div className="bg-white p-6 rounded-2xl shadow">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">User & Sales Statistics</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data}>
                <XAxis dataKey="name" stroke="#8884d8" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="users" fill="#4F46E5" barSize={30} />
                <Bar dataKey="sales" fill="#10B981" barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Future Tabs Content */}
        {activeTab === 'users' && (
          <div className="bg-white p-6 rounded-2xl shadow text-gray-600">
            <UserManagement />
          </div>
        )}
        {activeTab === 'products' && (
          <div className="bg-white p-6 rounded-2xl shadow text-gray-600">
            <ProductManagement />
          </div>
        )}
      </div>
    </div>
  );
}
