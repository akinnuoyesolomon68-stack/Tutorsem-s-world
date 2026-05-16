import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Package, Truck, CheckCircle, Clock } from 'lucide-react';
import { useAppContext, Order } from '../context/AppContext';
import { cn } from '../lib/utils';

export const TrackOrder = () => {
  const { orders } = useAppContext();
  const [orderNumber, setOrderNumber] = useState('');
  const [foundOrder, setFoundOrder] = useState<Order | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
    const order = orders.find(o => o.orderNumber.toUpperCase() === orderNumber.toUpperCase());
    setFoundOrder(order || null);
  };

  const getStatusIndex = (status: Order['status']) => {
    const statuses = ['Processing', 'Shipped', 'Out for Delivery', 'Delivered'];
    return statuses.indexOf(status);
  };

  return (
    <div className="w-full bg-gray-50 min-h-screen pt-20 pb-32 px-6 md:px-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-semibold tracking-tighter text-gray-900 mb-6"
          >
            Track Your Order
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 leading-relaxed"
          >
            Enter your order number below to check the current status and estimated delivery time.
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 mb-12"
        >
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                required
                placeholder="e.g. ORD-123456789"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all text-lg font-medium tracking-wide uppercase"
              />
            </div>
            <button 
              type="submit"
              className="bg-gray-900 text-white px-8 py-4 rounded-xl font-medium hover:bg-gray-800 transition-colors whitespace-nowrap"
            >
              Track Order
            </button>
          </form>
        </motion.div>

        {hasSearched && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            {foundOrder ? (
              <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-sm border border-gray-100">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 pb-10 border-b border-gray-100 gap-4">
                  <div>
                    <p className="text-gray-500 text-sm font-medium mb-1">Order Number</p>
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">{foundOrder.orderNumber}</h2>
                  </div>
                  <div className="text-left md:text-right">
                    <p className="text-gray-500 text-sm font-medium mb-1">Estimated Delivery</p>
                    <h2 className="text-xl font-semibold text-teal-700">{new Date(foundOrder.estimatedDelivery).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</h2>
                  </div>
                </div>

                <div className="mb-12">
                  <h3 className="font-semibold text-gray-900 mb-6">Order Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-xl">
                       <p className="text-sm text-gray-500 mb-1">Product</p>
                       <p className="font-medium text-gray-900">{foundOrder.productName}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-xl">
                       <p className="text-sm text-gray-500 mb-1">Customer Name</p>
                       <p className="font-medium text-gray-900">{foundOrder.customerName}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-xl">
                       <p className="text-sm text-gray-500 mb-1">Total Paid</p>
                       <p className="font-medium text-gray-900">₦{foundOrder.totalPrice.toLocaleString()}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-xl">
                       <p className="text-sm text-gray-500 mb-1">Order Date</p>
                       <p className="font-medium text-gray-900">{new Date(foundOrder.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-8">Tracking Status</h3>
                  
                  <div className="relative">
                    <div className="hidden md:block absolute left-8 top-8 bottom-8 w-0.5 bg-gray-100 z-0"></div>
                    
                    <div className="space-y-8 relative z-10">
                      {[
                        { status: 'Processing', icon: Clock, desc: 'Your order is being processed and prepared.' },
                        { status: 'Shipped', icon: Package, desc: 'Your order has been handed over to our delivery partner.' },
                        { status: 'Out for Delivery', icon: Truck, desc: 'Your order is out for delivery today.' },
                        { status: 'Delivered', icon: CheckCircle, desc: 'Your order has been successfully delivered.' }
                      ].map((step, i) => {
                        const isCompleted = getStatusIndex(foundOrder.status) >= i;
                        const isCurrent = getStatusIndex(foundOrder.status) === i;
                        
                        return (
                          <div key={step.status} className="flex items-start">
                            <div className={cn(
                              "w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 border-4 border-white shadow-sm transition-colors",
                              isCompleted ? "bg-teal-500 text-white" : "bg-gray-100 text-gray-400"
                            )}>
                              <step.icon className="w-6 h-6" />
                            </div>
                            <div className="ml-6 pt-3">
                              <h4 className={cn("text-lg font-semibold", isCompleted ? "text-gray-900" : "text-gray-400")}>{step.status}</h4>
                              <p className={cn("text-sm mt-1", isCurrent ? "text-teal-600 font-medium" : "text-gray-500")}>{step.desc}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

              </div>
            ) : (
              <div className="bg-white p-12 rounded-[2rem] shadow-sm border border-gray-100 text-center">
                <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Order Not Found</h3>
                <p className="text-gray-500">We couldn't find an order matching that number. Please check it and try again.</p>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};
