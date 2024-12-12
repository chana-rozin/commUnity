"use client";

import React from "react";
import { useParams } from 'next/navigation';

const UserCalendarPage: React.FC = () => {
  const { userId } = useParams();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white rounded-2xl">
      <h1 className="text-3xl font-bold text-indigo-600">לוח שנה אישי</h1>
      <p className="mt-4 text-lg text-gray-700">
        {userId ? (
          <>שלום, <span className="font-semibold">{userId}</span></>
        ) : (
          "Loading user information..."
        )}
      </p>

      <div className="mt-6">
        <p className="text-gray-500">כאן עוד יהיה לוח שנה שיכיל את האירועים שלך מתישהו..</p>
      </div>
    </div>
  );
};

export default UserCalendarPage;