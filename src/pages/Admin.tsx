import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Plus, Trash2, Edit2, Save, X, Settings, Package, Image as ImageIcon, Eye, Truck, CheckCircle } from 'lucide-react';
import { useAppContext, Product, PortfolioItem, SiteContent, Order } from '../context/AppContext';
import { supabase } from '../lib/supabase';
import { Link } from 'react-router-dom';

export const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'Solomon') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid password');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full border border-gray-100 text-center">
          <div className="w-16 h-16 bg-teal-50 text-teal-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-semibold mb-2">Admin Access</h1>
          <p className="text-gray-500 mb-8">Enter password to manage site content.</p>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 text-center tracking-widest font-mono"
              />
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </div>
            <button
              type="submit"
              className="w-full bg-gray-900 text-white font-medium py-3 rounded-xl hover:bg-gray-800 transition-colors"
            >
              Login
            </button>
          </form>
          <div className="mt-6">
             <Link to="/" className="text-sm text-gray-500 hover:text-gray-900">Return to Website</Link>
          </div>
        </div>
      </div>
    );
  }

  return <AdminDashboard />;
};

const AdminDashboard = () => {
  const { products, portfolioItems, siteContent, orders } = useAppContext();
  const [activeTab, setActiveTab] = useState<'products' | 'portfolio' | 'content' | 'orders'>('products');

  // Stats
  const totalProducts = products.length;
  const totalPortfolioItems = portfolioItems.length;
  const totalOrders = orders.length;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-white border-r border-gray-200 p-6 flex flex-col h-auto md:h-screen sticky top-0">
        <Link to="/" className="text-2xl font-semibold tracking-tight text-gray-900 mb-10 block">
          TUTORSEM<span className="text-teal-600">Admin</span>
        </Link>
        <div className="space-y-2 flex-grow flex md:flex-col overflow-x-auto md:overflow-visible flex-row pb-4 md:pb-0 gap-2 md:gap-0 font-medium">
          <button
            onClick={() => setActiveTab('products')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors whitespace-nowrap ${activeTab === 'products' ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            <Package className="w-5 h-5" />
            <span>Products</span>
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors whitespace-nowrap ${activeTab === 'orders' ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            <Truck className="w-5 h-5" />
            <span>Orders</span>
          </button>
          <button
            onClick={() => setActiveTab('portfolio')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors whitespace-nowrap ${activeTab === 'portfolio' ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            <ImageIcon className="w-5 h-5" />
            <span>Portfolio</span>
          </button>
          <button
            onClick={() => setActiveTab('content')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors whitespace-nowrap ${activeTab === 'content' ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            <Settings className="w-5 h-5" />
            <span>Site Content</span>
          </button>
        </div>
        <div className="hidden md:block border-t border-gray-100 pt-6 mt-6">
           <Link to="/" className="flex items-center space-x-2 text-gray-500 hover:text-gray-900 transition-colors">
              <Eye className="w-5 h-5" />
              <span>View Live Site</span>
           </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 md:p-12 overflow-y-auto">
        {/* Simple Analytics Header */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
             <h3 className="text-sm font-medium text-gray-500 mb-1">Total Products</h3>
             <p className="text-3xl font-semibold text-gray-900">{totalProducts}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
             <h3 className="text-sm font-medium text-gray-500 mb-1">Portfolio Items</h3>
             <p className="text-3xl font-semibold text-gray-900">{totalPortfolioItems}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
             <h3 className="text-sm font-medium text-gray-500 mb-1">Total Orders</h3>
             <p className="text-3xl font-semibold text-gray-900">{totalOrders}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
             <h3 className="text-sm font-medium text-gray-500 mb-1">Messages</h3>
             <p className="text-3xl font-semibold text-gray-900">48</p>
          </div>
        </div>

        {activeTab === 'products' && <ManageProducts />}
        {activeTab === 'orders' && <ManageOrders />}
        {activeTab === 'portfolio' && <ManagePortfolio />}
        {activeTab === 'content' && <ManageContent />}
      </div>
    </div>
  );
};

const ManageProducts = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useAppContext();
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isUploading) {
       setErrorMessage("Please wait for the image to finish uploading.");
       return;
    }
    setIsSaving(true);
    setSuccessMessage('');
    setErrorMessage('');
    try {
      if (editingProduct?.id) {
        await updateProduct(editingProduct.id, editingProduct);
        setSuccessMessage("Product updated successfully!");
      } else {
        await addProduct(editingProduct as any);
        setSuccessMessage("Congratulations! You have successfully added a product.");
      }
      setEditingProduct(null);
      setTimeout(() => setSuccessMessage(''), 4000);
    } catch (err: any) {
      setErrorMessage("Failed to save product: " + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div>
      {successMessage && (
        <div className="mb-6 bg-emerald-50 text-emerald-800 p-4 rounded-xl flex items-center border border-emerald-200">
          <CheckCircle className="w-5 h-5 mr-3 text-emerald-600" />
          <span className="font-medium">{successMessage}</span>
        </div>
      )}
      {errorMessage && (
        <div className="mb-6 bg-red-50 text-red-800 p-4 rounded-xl flex items-center border border-red-200">
          <X className="w-5 h-5 mr-3 text-red-600" />
          <span className="font-medium">{errorMessage}</span>
          <button onClick={() => setErrorMessage('')} className="ml-auto"><X className="w-4 h-4" /></button>
        </div>
      )}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 space-y-4 sm:space-y-0">
        <h2 className="text-2xl font-semibold text-gray-900">Product Management</h2>
        <button 
          onClick={() => setEditingProduct({ name: '', description: '', price: 0, category: 'Accessories', image: '', isSold: false })}
          className="flex items-center space-x-2 bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Product</span>
        </button>
      </div>

      {editingProduct && (
        <div className="bg-white p-6 rounded-2xl border border-gray-200 mb-8">
          <h3 className="text-lg font-medium mb-4">{editingProduct.id ? 'Edit Product' : 'New Product'}</h3>
          <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input required placeholder="Name" className="p-3 border rounded-xl" value={editingProduct.name || ''} onChange={(e) => setEditingProduct({...editingProduct, name: e.target.value})} />
            <input required type="number" placeholder="Price" className="p-3 border rounded-xl" value={editingProduct.price || ''} onChange={(e) => setEditingProduct({...editingProduct, price: Number(e.target.value)})} />
            <select required className="p-3 border rounded-xl" value={editingProduct.category || ''} onChange={(e) => setEditingProduct({...editingProduct, category: e.target.value as any})}>
              <option value="Accessories">Accessories</option>
              <option value="Student Materials">Student Materials</option>
              <option value="Clothes">Clothes</option>
              <option value="Shoes">Shoes</option>
              <option value="Data Analysis">Data Analysis</option>
            </select>
            <div className="col-span-1 md:col-span-2">
               <label className="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
               <input 
                 type="file" 
                 accept="image/*"
                 required={!editingProduct.image}
                 className="p-3 border rounded-xl w-full bg-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100 cursor-pointer" 
                 onChange={async (e) => {
                   const file = e.target.files?.[0];
                   if (file) {
                     setIsUploading(true);
                     try {
                        const fileExt = file.name.split('.').pop()?.replace(/[^a-zA-Z0-9]/g, '') || 'png';
                        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
                        const filePath = `product-images/${fileName}`;
                        
                        const { error, data } = await supabase.storage.from('images').upload(filePath, file, {
                          cacheControl: '3600',
                          upsert: true
                        });
                        if (error) {
                          console.error("Product image upload Supabase error:", error);
                          throw error;
                        }
                        
                        const { data: { publicUrl } } = supabase.storage.from('images').getPublicUrl(filePath);
                        setEditingProduct({...editingProduct, image: publicUrl});
                        setSuccessMessage("Image uploaded successfully!");
                        setTimeout(() => setSuccessMessage(''), 3000);
                     } catch (err: any) {
                        console.error('Full Product image upload error:', err);
                        setErrorMessage(`Image upload failed: ${err.message}. Please check if the 'images' storage bucket is created and policies are configured.`);
                     } finally {
                        setIsUploading(false);
                     }
                   }
                 }} 
               />
               {isUploading && <p className="text-sm text-teal-600 mt-2 font-medium animate-pulse">Uploading image please wait...</p>}
               {editingProduct.image && !isUploading && (
                 <div className="mt-4 relative inline-block">
                   <img src={editingProduct.image} alt="Preview" className="h-24 w-24 object-cover rounded-xl border border-gray-200" />
                   <button type="button" onClick={() => setEditingProduct({...editingProduct, image: ''})} className="absolute -top-2 -right-2 bg-red-100 text-red-600 rounded-full p-1 hover:bg-red-200">
                     <X className="w-4 h-4" />
                   </button>
                 </div>
               )}
            </div>
            <textarea required placeholder="Description" className="p-3 border rounded-xl col-span-1 md:col-span-2" value={editingProduct.description || ''} onChange={(e) => setEditingProduct({...editingProduct, description: e.target.value})} />
            <label className="flex items-center space-x-2 p-3">
              <input type="checkbox" checked={editingProduct.isSold || false} onChange={(e) => setEditingProduct({...editingProduct, isSold: e.target.checked})} />
              <span>Mark as Sold Out</span>
            </label>
            <div className="col-span-1 md:col-span-2 justify-end flex space-x-2 mt-4">
               <button type="button" onClick={() => setEditingProduct(null)} className="px-4 py-2 text-gray-500 hover:bg-gray-100 rounded-lg">Cancel</button>
               <button type="submit" disabled={isSaving || isUploading} className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 font-medium disabled:opacity-50">
                  {isSaving ? 'Saving...' : 'Save Product'}
               </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="p-4 font-medium text-gray-500 text-sm">Product</th>
              <th className="p-4 font-medium text-gray-500 text-sm">Category</th>
              <th className="p-4 font-medium text-gray-500 text-sm">Price</th>
              <th className="p-4 font-medium text-gray-500 text-sm">Status</th>
              <th className="p-4 font-medium text-gray-500 text-sm text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {products.map(product => (
              <tr key={product.id} className="hover:bg-gray-50/50">
                <td className="p-4 flex items-center space-x-3">
                   <img src={product.image} alt={product.name} className="w-10 h-10 rounded-md object-cover" />
                   <span className="font-medium text-gray-900">{product.name}</span>
                </td>
                <td className="p-4 text-gray-600 text-sm">{product.category}</td>
                <td className="p-4 font-medium">₦{product.price.toLocaleString()}</td>
                <td className="p-4 px-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${product.isSold ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                    {product.isSold ? 'Sold' : 'Available'}
                  </span>
                </td>
                <td className="p-4 flex items-center justify-end space-x-2">
                  <button onClick={() => setEditingProduct(product)} className="p-1.5 text-gray-500 hover:text-teal-600 hover:bg-teal-50 rounded-md"><Edit2 className="w-4 h-4" /></button>
                  <button onClick={async () => {
                    try {
                      await deleteProduct(product.id);
                    } catch (err: any) {
                      alert("Failed to delete product: " + err.message);
                    }
                  }} className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-md"><Trash2 className="w-4 h-4" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const ManageOrders = () => {
  const { orders, updateOrder } = useAppContext();
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingOrder) {
      try {
        await updateOrder(editingOrder.id, {
          status: editingOrder.status,
          estimatedDelivery: editingOrder.estimatedDelivery,
        });
        alert("Order updated successfully!");
        setEditingOrder(null);
      } catch (err: any) {
        alert("Failed to update order: " + err.message);
      }
    }
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'Processing': return 'bg-yellow-50 text-yellow-600';
      case 'Shipped': return 'bg-blue-50 text-blue-600';
      case 'Out for Delivery': return 'bg-purple-50 text-purple-600';
      case 'Delivered': return 'bg-green-50 text-green-600';
      default: return 'bg-gray-50 text-gray-600';
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900">Order Management</h2>
      </div>

      {editingOrder && (
        <div className="bg-white p-6 rounded-2xl border border-gray-200 mb-8 max-w-xl">
           <h3 className="text-lg font-medium mb-4">Update Order {editingOrder.orderNumber}</h3>
           <form onSubmit={handleSave} className="space-y-4">
             <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
               <select 
                 className="w-full p-3 border rounded-xl bg-white" 
                 value={editingOrder.status} 
                 onChange={(e) => setEditingOrder({...editingOrder, status: e.target.value as any})}
               >
                 <option value="Processing">Processing</option>
                 <option value="Shipped">Shipped</option>
                 <option value="Out for Delivery">Out for Delivery</option>
                 <option value="Delivered">Delivered</option>
               </select>
             </div>
             <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">Estimated Delivery</label>
               <input 
                 type="date" 
                 required 
                 className="w-full p-3 border rounded-xl" 
                 value={editingOrder.estimatedDelivery.split('T')[0]} 
                 onChange={(e) => setEditingOrder({...editingOrder, estimatedDelivery: new Date(e.target.value).toISOString()})} 
               />
             </div>
             <div className="justify-end flex space-x-2 mt-4 pt-4 border-t">
                <button type="button" onClick={() => setEditingOrder(null)} className="px-4 py-2 text-gray-500 hover:bg-gray-100 rounded-lg">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 font-medium">Save Order</button>
             </div>
           </form>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="p-4 font-medium text-gray-500 text-sm">Order No.</th>
              <th className="p-4 font-medium text-gray-500 text-sm text-center">Date</th>
              <th className="p-4 font-medium text-gray-500 text-sm">Customer</th>
              <th className="p-4 font-medium text-gray-500 text-sm">Product</th>
              <th className="p-4 font-medium text-gray-500 text-sm">Status</th>
              <th className="p-4 font-medium text-gray-500 text-sm text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {orders.length === 0 ? (
              <tr><td colSpan={6} className="p-8 text-center text-gray-500">No orders placed yet.</td></tr>
            ) : (
              orders.map(order => (
                <tr key={order.id} className="hover:bg-gray-50/50">
                  <td className="p-4 font-medium text-gray-900 whitespace-nowrap">{order.orderNumber}</td>
                  <td className="p-4 text-gray-500 text-sm text-center whitespace-nowrap">{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td className="p-4 text-gray-900">{order.customerName}</td>
                  <td className="p-4 text-gray-600 truncate max-w-[150px]">{order.productName}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="p-4 flex items-center justify-end">
                    <button onClick={() => setEditingOrder(order)} className="p-1.5 text-gray-500 hover:text-teal-600 hover:bg-teal-50 rounded-md"><Edit2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const ManagePortfolio = () => {
  const { portfolioItems, addPortfolioItem, updatePortfolioItem, deletePortfolioItem } = useAppContext();
  const [editingItem, setEditingItem] = useState<Partial<PortfolioItem> | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isUploading) {
       setErrorMessage("Please wait for the image to finish uploading.");
       return;
    }
    setIsSaving(true);
    setSuccessMessage('');
    setErrorMessage('');
    try {
      if (editingItem?.id) {
        await updatePortfolioItem(editingItem.id, editingItem);
        setSuccessMessage("Portfolio item updated successfully!");
      } else {
        await addPortfolioItem(editingItem as any);
        setSuccessMessage("Congratulations! You have successfully added a project.");
      }
      setEditingItem(null);
      setTimeout(() => setSuccessMessage(''), 4000);
    } catch (err: any) {
      setErrorMessage("Failed to save portfolio item: " + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div>
      {successMessage && (
        <div className="mb-6 bg-emerald-50 text-emerald-800 p-4 rounded-xl flex items-center border border-emerald-200">
          <CheckCircle className="w-5 h-5 mr-3 text-emerald-600" />
          <span className="font-medium">{successMessage}</span>
        </div>
      )}
      {errorMessage && (
        <div className="mb-6 bg-red-50 text-red-800 p-4 rounded-xl flex items-center border border-red-200">
          <X className="w-5 h-5 mr-3 text-red-600" />
          <span className="font-medium">{errorMessage}</span>
          <button onClick={() => setErrorMessage('')} className="ml-auto"><X className="w-4 h-4" /></button>
        </div>
      )}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 space-y-4 sm:space-y-0">
        <h2 className="text-2xl font-semibold text-gray-900">Portfolio Management</h2>
        <button 
          onClick={() => setEditingItem({ title: '', description: '', category: 'Website Design', image: '' })}
          className="flex items-center space-x-2 bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Project</span>
        </button>
      </div>

      {editingItem && (
        <div className="bg-white p-6 rounded-2xl border border-gray-200 mb-8">
           <h3 className="text-lg font-medium mb-4">{editingItem.id ? 'Edit Project' : 'New Project'}</h3>
           <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <input required placeholder="Project Title" className="p-3 border rounded-xl" value={editingItem.title || ''} onChange={(e) => setEditingItem({...editingItem, title: e.target.value})} />
             <select required className="p-3 border rounded-xl" value={editingItem.category || ''} onChange={(e) => setEditingItem({...editingItem, category: e.target.value as any})}>
                <option value="Website Design">Website Design</option>
                <option value="Graphics Design">Graphics Design</option>
                <option value="Data Analysis">Data Analysis</option>
             </select>
             <div className="col-span-1 md:col-span-2">
               <label className="block text-sm font-medium text-gray-700 mb-1">Project Image</label>
               <input 
                 type="file" 
                 accept="image/*"
                 required={!editingItem.image}
                 className="p-3 border rounded-xl w-full bg-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100 cursor-pointer" 
                 onChange={async (e) => {
                   const file = e.target.files?.[0];
                   if (file) {
                     setIsUploading(true);
                     try {
                        const fileExt = file.name.split('.').pop()?.replace(/[^a-zA-Z0-9]/g, '') || 'png';
                        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
                        const filePath = `portfolio-images/${fileName}`;
                        
                        const { error } = await supabase.storage.from('images').upload(filePath, file, {
                          cacheControl: '3600',
                          upsert: true
                        });
                        if (error) {
                          console.error("Portfolio image upload Supabase error:", error);
                          throw error;
                        }
                        
                        const { data: { publicUrl } } = supabase.storage.from('images').getPublicUrl(filePath);
                        setEditingItem({...editingItem, image: publicUrl});
                        setSuccessMessage("Image uploaded successfully!");
                        setTimeout(() => setSuccessMessage(''), 3000);
                     } catch (err: any) {
                        console.error('Full Portfolio image upload error:', err);
                        setErrorMessage(`Image upload failed: ${err.message}. Please check if the 'images' storage bucket is created and policies are configured.`);
                     } finally {
                        setIsUploading(false);
                     }
                   }
                 }} 
               />
               {isUploading && <p className="text-sm text-teal-600 mt-2 font-medium animate-pulse">Uploading image please wait...</p>}
               {editingItem.image && !isUploading && (
                 <div className="mt-4 relative inline-block">
                   <img src={editingItem.image} alt="Preview" className="h-40 w-auto object-cover rounded-xl border border-gray-200" />
                   <button type="button" onClick={() => setEditingItem({...editingItem, image: ''})} className="absolute -top-2 -right-2 bg-red-100 text-red-600 rounded-full p-1 hover:bg-red-200">
                     <X className="w-4 h-4" />
                   </button>
                 </div>
               )}
             </div>
             <textarea required placeholder="Description / Details" className="p-3 border rounded-xl col-span-1 md:col-span-2" value={editingItem.description || ''} onChange={(e) => setEditingItem({...editingItem, description: e.target.value})} />
             <div className="col-span-1 md:col-span-2 justify-end flex space-x-2 mt-4">
                <button type="button" onClick={() => setEditingItem(null)} className="px-4 py-2 text-gray-500 hover:bg-gray-100 rounded-lg">Cancel</button>
                <button type="submit" disabled={isSaving || isUploading} className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 font-medium disabled:opacity-50">
                  {isSaving ? 'Saving...' : 'Save Project'}
                </button>
             </div>
           </form>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         {portfolioItems.map(item => (
            <div key={item.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden flex flex-col md:flex-row shadow-sm">
               <div className="w-full md:w-1/3 aspect-video md:aspect-auto bg-gray-100">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
               </div>
               <div className="p-4 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-2">
                     <span className="text-xs font-semibold text-teal-600 uppercase tracking-widest bg-teal-50 px-2 py-1 rounded-md">{item.category}</span>
                     <div className="flex space-x-2">
                        <button onClick={() => setEditingItem(item)} className="p-1.5 text-gray-400 hover:text-teal-600 bg-gray-50 rounded-md hover:bg-teal-50"><Edit2 className="w-4 h-4" /></button>
                        <button onClick={async () => {
                          try {
                            await deletePortfolioItem(item.id);
                          } catch (err: any) {
                            alert("Failed to delete project: " + err.message);
                          }
                        }} className="p-1.5 text-gray-400 hover:text-red-600 bg-gray-50 rounded-md hover:bg-red-50"><Trash2 className="w-4 h-4" /></button>
                     </div>
                  </div>
                  <h3 className="font-semibold text-gray-900">{item.title}</h3>
                  <p className="text-gray-500 text-sm mt-1 line-clamp-2">{item.description}</p>
               </div>
            </div>
         ))}
      </div>
    </div>
  );
};

const ManageContent = () => {
  const { siteContent, updateSiteContent } = useAppContext();
  const [formData, setFormData] = useState<SiteContent>(siteContent);
  const [saveStatus, setSaveStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateSiteContent(formData);
      setSaveStatus('Saved successfully!');
      setTimeout(() => setSaveStatus(''), 3000);
    } catch (err: any) {
      alert("Failed to save content: " + err.message);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900">Content Management</h2>
        <p className="text-gray-500 mt-2">Update text content across the website.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-[2rem] border border-gray-200 shadow-sm max-w-3xl">
         <div className="space-y-8">
            <div>
               <h3 className="text-lg font-medium border-b pb-2 mb-4">Home Page</h3>
               <div className="space-y-4">
                  <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">Hero Title</label>
                     <input type="text" className="w-full p-3 border rounded-xl" value={formData.homeHeroTitle} onChange={(e) => setFormData({...formData, homeHeroTitle: e.target.value})} />
                  </div>
                  <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">Hero Subtitle</label>
                     <input type="text" className="w-full p-3 border rounded-xl" value={formData.homeHeroSubtitle} onChange={(e) => setFormData({...formData, homeHeroSubtitle: e.target.value})} />
                  </div>
               </div>
            </div>
            
            <div>
               <h3 className="text-lg font-medium border-b pb-2 mb-4">About Section</h3>
               <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Introduction Text</label>
                  <textarea rows={4} className="w-full p-3 border rounded-xl resize-y" value={formData.aboutIntro} onChange={(e) => setFormData({...formData, aboutIntro: e.target.value})} />
               </div>
            </div>

            <div>
               <h3 className="text-lg font-medium border-b pb-2 mb-4">Vision & Goals</h3>
               <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Vision Statement</label>
                  <textarea rows={3} className="w-full p-3 border rounded-xl resize-y" value={formData.visionText} onChange={(e) => setFormData({...formData, visionText: e.target.value})} />
               </div>
            </div>

            <div className="pt-4 border-t flex items-center justify-between">
               <span className="text-teal-600 font-medium">{saveStatus}</span>
               <button type="submit" className="flex items-center space-x-2 bg-gray-900 text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition-colors">
                  <Save className="w-5 h-5" />
                  <span>Publish Changes</span>
               </button>
            </div>
         </div>
      </form>
    </div>
  );
};
