"use client";

import { useState } from "react";

const NeighborhoodLoansPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("activeRequests");

  return (
    <div className="flex flex-col items-center bg-gray-50 min-h-screen">
      <div className="w-full max-w-7xl px-6 py-8">
        {/* Tabs Section */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-6">
            <button
              className={`px-4 py-2 text-lg font-medium ${
                activeTab === "activeRequests"
                  ? "text-white bg-blue-500 rounded-lg shadow-sm"
                  : "text-gray-600"
              }`}
              onClick={() => setActiveTab("activeRequests")}
            >
              בקשות פעילות
            </button>
            <button
              className={`px-4 py-2 text-lg font-medium ${
                activeTab === "questions"
                  ? "text-white bg-blue-500 rounded-lg shadow-sm"
                  : "text-gray-600"
              }`}
              onClick={() => setActiveTab("questions")}
            >
              שאלות
            </button>
            <button
              className={`px-4 py-2 text-lg font-medium ${
                activeTab === "history"
                  ? "text-white bg-blue-500 rounded-lg shadow-sm"
                  : "text-gray-600"
              }`}
              onClick={() => setActiveTab("history")}
            >
              היסטוריה
            </button>
          </div>
        </div>

        {/* Content Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          {activeTab === "activeRequests" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Example Card */}
              <div className="p-4 border rounded-lg shadow hover:shadow-lg transition">
                <h3 className="text-lg font-bold">פריט 1</h3>
                <p className="text-gray-600">תיאור קצר</p>
                <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg">
                  החזרתי
                </button>
              </div>
              {/* Add more cards dynamically */}
            </div>
          )}

          {activeTab === "questions" && (
            <div>
              <h2 className="text-xl font-bold mb-4">שאלות</h2>
              {/* Add content for questions */}
            </div>
          )}

          {activeTab === "history" && (
            <div>
              <h2 className="text-xl font-bold mb-4">היסטוריה</h2>
              {/* Add content for history */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NeighborhoodLoansPage;
