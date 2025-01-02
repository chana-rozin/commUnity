"use client";
import React from "react";
import useUserStore from "@/stores/userStore";
import Lottie from "react-lottie-player";
import hourglassAnimation from "@/components/animations/hourglass.json";

const UserCalendarPage: React.FC = () => {
  const { user } = useUserStore();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white rounded-2xl mt-4">
      <h1 className="text-3xl font-bold text-indigo-600">לוח שנה אישי</h1>
      <p className="mt-4 text-lg text-gray-700">
        {user ? (
          <>שלום, <span className="font-semibold">{user.first_name}!</span></>
        ) : (
          "Loading user information..."
        )}
      </p>

      <div className="mt-6 flex flex-col items-center">
        <Lottie
          loop
          animationData={hourglassAnimation}
          play
          style={{ width: 250, height: 250 }}
        />
        <p className="text-gray-500 mb-4">כאן עוד יהיה לוח שנה שיכיל את האירועים שלך מתישהו..</p>
      </div>
    </div>
  );
};

export default UserCalendarPage;
