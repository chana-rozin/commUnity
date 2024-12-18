import * as React from "react";

const UnauthorizedPage = () => {
  return (
    <main className="min-h-screen bg-transparent flex items-center justify-center">
      <div className="text-center">
        <img
          src="https://res.cloudinary.com/community-cloud/image/upload/v1734523700/%D7%A6%D7%99%D7%9C%D7%95%D7%9D_%D7%9E%D7%A1%D7%9A_2024-12-18_140615_egn5hc.png"
          alt="Unauthorized Access Illustration"
          className="w-80 mx-auto"
        />
        <h1 className="text-5xl font-bold text-indigo-600 mt-8">אופס!</h1>
        <p className="text-lg text-gray-700 mt-4">
          אין לכם הרשאה לגשת לעמוד הזה. בבקשה התחברו או צרו קשר עם מנהל המערכת.
        </p>
        <a
          href="/login"
          className="inline-block mt-6 bg-indigo-600 text-white py-3 px-6 rounded-lg shadow-md hover:bg-indigo-700 transition-colors"
        >
          מעבר לדף ההתחברות
        </a>
      </div>
    </main>
  );
};

export default UnauthorizedPage;
