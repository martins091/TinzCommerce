import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { FaUsers, FaBoxOpen, FaChartLine } from 'react-icons/fa';

import ProductManagement from '../../components/products/ProductManagement';
import UserManagement from '../../components/user/UserManagment';

import { getProductCountByAdminThunk } from '../../features/products/productThunks';
import { getUserCountByAdminThunk } from '../../features/user/userThunks';

const chartData = [
  { name: 'Jan', users: 400, sales: 2400 },
  { name: 'Feb', users: 300, sales: 2210 },
  { name: 'Mar', users: 500, sales: 2290 },
  { name: 'Apr', users: 278, sales: 2000 },
  { name: 'May', users: 189, sales: 2181 },
  { name: 'Jun', users: 239, sales: 2500 },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const dispatch = useDispatch();

  const { userCount, userLoading } = useSelector((state) => state.user);
  const { productCount, productLoading } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getUserCountByAdminThunk());
    dispatch(getProductCountByAdminThunk());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Admin Dashboard</h1>

        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          {['overview', 'users', 'products'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTab === tab
                  ? 'bg-blue-600 text-white shadow'
                  : 'bg-white text-gray-700 border border-gray-300'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Overview Cards */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {/* Users */}
            <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition-all">
              <div className="flex items-center space-x-4">
                <FaUsers className="text-blue-500 text-3xl" />
                <div>
                  <p className="text-gray-500 text-sm">Total Users</p>
                  <h2 className="text-xl font-semibold">
                    {userLoading ? (
                      <span className="animate-pulse text-gray-400">Loading...</span>
                    ) : (
                      userCount
                    )}
                  </h2>
                </div>
              </div>
            </div>

            {/* Products */}
            <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition-all">
              <div className="flex items-center space-x-4">
                <FaBoxOpen className="text-green-500 text-3xl" />
                <div>
                  <p className="text-gray-500 text-sm">Products</p>
                  <h2 className="text-xl font-semibold">
                    {productLoading ? (
                      <span className="animate-pulse text-gray-400">Loading...</span>
                    ) : (
                      productCount
                    )}
                  </h2>
                </div>
              </div>
            </div>

            {/* Sales */}
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

        {/* Chart */}
        {activeTab === 'overview' && (
          <div className="bg-white p-6 rounded-2xl shadow">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">User & Sales Statistics</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <XAxis dataKey="name" stroke="#8884d8" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="users" fill="#4F46E5" barSize={30} />
                <Bar dataKey="sales" fill="#10B981" barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Users */}
        {activeTab === 'users' && (
          <div className="bg-white p-6 rounded-2xl shadow text-gray-600">
            <UserManagement />
          </div>
        )}

        {/* Products */}
        {activeTab === 'products' && (
          <div className="bg-white p-6 rounded-2xl shadow text-gray-600">
            <ProductManagement />
          </div>
        )}
      </div>
    </div>
  );
}
