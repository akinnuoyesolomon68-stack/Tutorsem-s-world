import React, { useState } from 'react';
import { Shield, Plus, Trash2, Edit2, X, Package, Truck, CheckCircle, BarChart3, Users, LogOut } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { Order } from '../context/AppContext';
import { Product } from '../data/products';
import { Link } from 'react-router-dom';

export const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'Solomon') { // Admin password
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid password. Try again.');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6">
        <div className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full border border-gray-100 text-center">
          <div className="w-16 h-16 bg-[#0F172A] text-white rounded-2xl flex items-center justify-center mx-auto mb-6 transform rotate-3">
            <Shield className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold mb-2 font-heading">Admin Portal</h1>
          <p className="text-gray-500 mb-8 font-sans">Enter password to manage Motun's Unisex store.</p>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6D28D9]/50 text-center tracking-widest font-mono"
              />
              {error && <p className="text-[#6D28D9] text-sm mt-2 font-medium">{error}</p>}
            </div>
            <button
              type="submit"
              className="w-full bg-[#F59E0B] text-[#0F172A] font-bold py-4 rounded-xl hover:bg-[#D97706] hover:text-white transition-colors shadow-lg"
            >
              Secure Login
            </button>
          </form>
          <div className="mt-6">
             <Link to="/" className="text-sm text-gray-500 hover:text-[#0F172A] transition-colors">Return to Website</Link>
          </div>
        </div>
      </div>
    );
  }

  return <AdminDashboard />;
};

const AdminDashboard = () => {
  const { products, orders } = useAppContext();
  const [activeTab, setActiveTab] = useState<'products' | 'orders' | 'analytics' | 'settings'>('analytics');

  const totalRevenue = orders.reduce((total, order) => total + order.totalPrice, 0);

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-white border-r border-gray-200 p-6 flex flex-col h-auto md:h-screen sticky top-0 shadow-sm z-10">
        <Link to="/" className="text-2xl font-bold tracking-tight text-[#0F172A] mb-10 block font-heading">
          Motun's <span className="text-[#6D28D9]">Unisex</span><span className="text-[#F59E0B]">.</span>
        </Link>
        <div className="space-y-2 flex-grow flex md:flex-col overflow-x-auto md:overflow-visible flex-row pb-4 md:pb-0 gap-2 md:gap-0 font-medium font-sans">
          <button
            onClick={() => setActiveTab('analytics')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors whitespace-nowrap ${activeTab === 'analytics' ? 'bg-[#0F172A] text-white font-bold' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <BarChart3 className="w-5 h-5" />
            <span>Overview</span>
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors whitespace-nowrap ${activeTab === 'products' ? 'bg-[#0F172A] text-white font-bold' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <Package className="w-5 h-5" />
            <span>Products</span>
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors whitespace-nowrap ${activeTab === 'orders' ? 'bg-[#0F172A] text-white font-bold' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <Truck className="w-5 h-5" />
            <span>Orders</span>
          </button>
          <div className="md:mt-auto pt-0 md:pt-6">
            <Link to="/" className="w-full flex items-center justify-center space-x-2 bg-gray-100 text-gray-700 font-bold px-4 py-3 rounded-xl hover:bg-gray-200 transition-colors whitespace-nowrap">
              <LogOut className="w-5 h-5" />
              <span>Return to Store</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8 overflow-y-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold font-heading text-[#0F172A] capitalize">{activeTab}</h1>
        </div>

        {activeTab === 'analytics' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-green-50 text-green-600 flex items-center justify-center shrink-0">
                  <BarChart3 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Total Revenue</h3>
                  <p className="text-2xl font-bold text-[#0F172A]">₦{totalRevenue.toFixed(2)}</p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Truck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Total Orders</h3>
                  <p className="text-2xl font-bold text-[#0F172A]">{orders.length}</p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                  <Package className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Products Configured</h3>
                  <p className="text-2xl font-bold text-[#0F172A]">{products.length}</p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Active Customers</h3>
                  <p className="text-2xl font-bold text-[#0F172A]">{new Set(orders.map(o => o.email)).size}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
               <h3 className="text-xl font-bold font-heading mb-4">Recent Activity</h3>
               <p className="text-gray-500">Analytics overview is fully active and pulling from local state.</p>
            </div>
          </div>
        )}
        
        {activeTab === 'products' && <ManageProducts />}
        {activeTab === 'orders' && <ManageOrders />}
      </div>
    </div>
  );
};

const ManageProducts = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useAppContext();
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct?.id) {
      updateProduct(editingProduct.id, editingProduct);
    } else {
      addProduct(editingProduct as any);
    }
    setEditingProduct(null);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 space-y-4 sm:space-y-0">
        <h2 className="text-xl font-bold text-[#0F172A] font-heading">Product Inventory</h2>
        <button 
          onClick={() => setEditingProduct({ name: '', description: '', price: 0, category: 'men', image: '', inStock: true, rating: 5 })}
          className="flex items-center space-x-2 bg-[#F59E0B] text-[#0F172A] px-5 py-3 rounded-full hover:bg-[#D97706] hover:text-white transition-colors font-bold shadow-lg shadow-[#F59E0B]/20"
        >
          <Plus className="w-4 h-4" />
          <span>Add Product</span>
        </button>
      </div>

      {editingProduct && (
        <div className="bg-white p-8 rounded-3xl border border-gray-200 mb-8 shadow-xl shadow-[#0F172A]/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 rounded-full translate-x-16 -translate-y-16"></div>
          <h3 className="text-2xl font-bold mb-6 font-heading relative z-10">{editingProduct.id ? 'Edit Product' : 'New Product'}</h3>
          <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10 font-sans">
            <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
               <input required className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#6D28D9]" value={editingProduct.name || ''} onChange={(e) => setEditingProduct({...editingProduct, name: e.target.value})} />
            </div>
            <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">Price (₦)</label>
               <input required type="number" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#6D28D9]" value={editingProduct.price || ''} onChange={(e) => setEditingProduct({...editingProduct, price: Number(e.target.value)})} />
            </div>
            <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
               <select required className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#6D28D9]" value={editingProduct.category || ''} onChange={(e) => setEditingProduct({...editingProduct, category: e.target.value as any})}>
                 <option value="men">Men's Fashion</option>
                 <option value="women">Women's Fashion</option>
                 <option value="unisex">Unisex Fashion</option>
                 <option value="shoes">Shoes</option>
                 <option value="accessories">Accessories</option>
                 <option value="student">Student Essentials</option>
               </select>
            </div>
            <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
               <input type="file" accept="image/*" onChange={(e) => {
                 const file = e.target.files?.[0];
                 if (file) {
                   const reader = new FileReader();
                   reader.onloadend = () => {
                     setEditingProduct({...editingProduct, image: reader.result as string});
                   };
                   reader.readAsDataURL(file);
                 }
               }} className="w-full p-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#6D28D9] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-[#F59E0B] file:text-[#0F172A] hover:file:bg-[#D97706] cursor-pointer" />
               {editingProduct.image && <img src={editingProduct.image} alt="Preview" className="mt-2 w-16 h-16 object-cover rounded-xl border border-gray-200" />}
            </div>
            <div className="col-span-1 md:col-span-2">
               <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
               <textarea required rows={3} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#6D28D9] resize-none" value={editingProduct.description || ''} onChange={(e) => setEditingProduct({...editingProduct, description: e.target.value})} />
            </div>
            <div className="col-span-1 md:col-span-2 flex items-center space-x-3 bg-gray-50 p-4 rounded-xl border border-gray-200">
              <input type="checkbox" id="instock" className="w-5 h-5 accent-[#6D28D9]" checked={editingProduct.inStock ?? true} onChange={(e) => setEditingProduct({...editingProduct, inStock: e.target.checked})} />
              <label htmlFor="instock" className="font-bold text-[#0F172A] cursor-pointer">In Stock</label>
            </div>
            <div className="col-span-1 md:col-span-2 justify-end flex space-x-4 mt-2">
               <button type="button" onClick={() => setEditingProduct(null)} className="px-6 py-3 font-bold text-gray-500 hover:bg-gray-100 rounded-full transition-colors">Cancel</button>
               <button type="submit" className="px-8 py-3 bg-[#F59E0B] text-[#0F172A] rounded-full hover:bg-[#D97706] hover:text-white transition-colors font-bold shadow-lg">Save Product</button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
           <table className="w-full text-left font-sans whitespace-nowrap">
             <thead className="bg-gray-50 border-b border-gray-100 uppercase tracking-wider">
               <tr>
                 <th className="px-6 py-4 font-bold text-gray-500 text-xs">Product</th>
                 <th className="px-6 py-4 font-bold text-gray-500 text-xs">Category</th>
                 <th className="px-6 py-4 font-bold text-gray-500 text-xs">Price</th>
                 <th className="px-6 py-4 font-bold text-gray-500 text-xs">Inventory Status</th>
                 <th className="px-6 py-4 font-bold text-gray-500 text-xs text-right">Actions</th>
               </tr>
             </thead>
             <tbody className="divide-y divide-gray-100">
               {products.map(product => (
                 <tr key={product.id} className="hover:bg-gray-50/50 transition-colors">
                   <td className="px-6 py-4 flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-xl border border-gray-100 overflow-hidden shrink-0">
                         <img src={product.image || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&q=80'} alt={product.name} className="w-full h-full object-cover" />
                      </div>
                      <span className="font-bold text-[#0F172A] max-w-[200px] truncate">{product.name}</span>
                   </td>
                   <td className="px-6 py-4 text-gray-600 text-sm capitalize">{product.category}</td>
                   <td className="px-6 py-4 font-bold text-[#0F172A]">₦{product.price.toFixed(2)}</td>
                   <td className="px-6 py-4">
                     <span className={`px-3 py-1 rounded-full text-xs font-bold border ${product.inStock ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
                       {product.inStock ? 'In Stock' : 'Sold Out'}
                     </span>
                   </td>
                   <td className="px-6 py-4 text-right">
                     <div className="flex justify-end gap-2">
                        <button onClick={() => setEditingProduct(product)} className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-[#6D28D9] hover:bg-[#6D28D9]/10 rounded-full transition-colors"><Edit2 className="w-4 h-4" /></button>
                        <button onClick={() => deleteProduct(product.id)} className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"><Trash2 className="w-4 h-4" /></button>
                     </div>
                   </td>
                 </tr>
               ))}
             </tbody>
           </table>
        </div>
      </div>
    </div>
  );
};

const ManageOrders = () => {
  const { orders, updateOrderStatus } = useAppContext();
  
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-[#0F172A] font-heading">Order History Overview</h2>
      </div>

      <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
           <table className="w-full text-left font-sans whitespace-nowrap">
             <thead className="bg-[#0F172A] text-white tracking-wider">
               <tr>
                 <th className="px-6 py-4 font-bold text-xs uppercase">Order No.</th>
                 <th className="px-6 py-4 font-bold text-xs uppercase">Date</th>
                 <th className="px-6 py-4 font-bold text-xs uppercase">Customer</th>
                 <th className="px-6 py-4 font-bold text-xs uppercase">Total</th>
                 <th className="px-6 py-4 font-bold text-xs uppercase">Status</th>
                 <th className="px-6 py-4 font-bold text-xs uppercase text-right">Update Status</th>
               </tr>
             </thead>
             <tbody className="divide-y divide-gray-100">
               {orders.length === 0 ? (
                 <tr><td colSpan={6} className="p-12 text-center text-gray-500 font-medium">No orders have been placed yet.</td></tr>
               ) : (
                 orders.map(order => (
                   <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                     <td className="px-6 py-4 font-bold text-[#0F172A]">{order.orderNumber}</td>
                     <td className="px-6 py-4 text-gray-500 text-sm">{new Date(order.createdAt).toLocaleDateString()}</td>
                     <td className="px-6 py-4">
                        <p className="font-bold text-[#0F172A]">{order.customerName}</p>
                        <p className="text-xs text-gray-400">{order.email}</p>
                     </td>
                     <td className="px-6 py-4 font-bold text-[#10B981]">₦{order.totalPrice.toFixed(2)}</td>
                     <td className="px-6 py-4">
                       <span className={`px-3 py-1 rounded-full text-xs font-bold border ${order.status === 'Processing' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' : order.status === 'Shipped' ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-green-50 text-green-700 border-green-200'}`}>
                         {order.status}
                       </span>
                     </td>
                     <td className="px-6 py-4 text-right">
                        <select 
                          className="p-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6D28D9] font-medium"
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value as Order['status'])}
                        >
                           <option value="Processing">Processing</option>
                           <option value="Shipped">Shipped</option>
                           <option value="Delivered">Delivered</option>
                        </select>
                     </td>
                   </tr>
                 ))
               )}
             </tbody>
           </table>
        </div>
      </div>
    </div>
  );
};
