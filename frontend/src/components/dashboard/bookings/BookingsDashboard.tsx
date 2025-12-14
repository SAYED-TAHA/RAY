'use client';

import React from 'react';

const BookingsDashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Bookings Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Today's Bookings</h3>
          <p className="text-3xl font-bold text-blue-600">24</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Pending</h3>
          <p className="text-3xl font-bold text-yellow-600">8</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Confirmed</h3>
          <p className="text-3xl font-bold text-green-600">12</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Cancelled</h3>
          <p className="text-3xl font-bold text-red-600">4</p>
        </div>
      </div>
    </div>
  );
};

export default BookingsDashboard;
