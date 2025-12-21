'use client';

import React from 'react';

const CarWashDashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Car Wash Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Today&apos;s Bookings</h3>
          <p className="text-3xl font-bold text-blue-600">12</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Revenue Today</h3>
          <p className="text-3xl font-bold text-green-600">EGP 2,400</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Pending Orders</h3>
          <p className="text-3xl font-bold text-yellow-600">5</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Completed Today</h3>
          <p className="text-3xl font-bold text-purple-600">8</p>
        </div>
      </div>
    </div>
  );
};

export default CarWashDashboard;
