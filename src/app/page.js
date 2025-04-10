import React from 'react';

const MainPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-bold mb-4 text-center">TIME TABLE</h1>
        <div className="mb-4">
          <label className="block text-gray-700">Branch</label>
          <input type="text" className="w-full p-2 border border-gray-300 rounded" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Year</label>
          <input type="text" className="w-full p-2 border border-gray-300 rounded" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Subject</label>
          <input type="text" className="w-full p-2 border border-gray-300 rounded" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Preferable Class <span className="text-gray-500">(optional)</span></label>
          <input type="text" className="w-full p-2 border border-gray-300 rounded" />
        </div>
        <button className="w-full p-2 bg-black text-white rounded">Generate</button>
      </div>
    </div>
  );
};

export default MainPage;
