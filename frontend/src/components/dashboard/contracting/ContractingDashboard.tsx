'use client';

import React from 'react';

const ContractingDashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Contracting Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Active Projects</h3>
          <p className="text-3xl font-bold text-blue-600">7</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Total Revenue</h3>
          <p className="text-3xl font-bold text-green-600">EGP 125,000</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Pending Bids</h3>
          <p className="text-3xl font-bold text-yellow-600">3</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Completed Projects</h3>
          <p className="text-3xl font-bold text-purple-600">15</p>
        </div>
      </div>
    </div>
  );
};

export default ContractingDashboard;
