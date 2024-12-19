import * as React from "react";

const NotFoundPage = () => {
    return (
        <main className="min-h-screen bg-transparent flex items-center justify-center">
            <div className="text-center">
                <img
                    src="https://res.cloudinary.com/community-cloud/image/upload/v1734523066/%D7%A6%D7%99%D7%9C%D7%95%D7%9D_%D7%9E%D7%A1%D7%9A_2024-12-18_135433_gakfag.png"
                    alt="404 Not Found Illustration"
                    className="w-80 mx-auto"
                />
                <h1 className="text-5xl font-bold text-indigo-600 mt-8">אופס!</h1>
                <p className="text-lg text-gray-700 mt-4">
                    נראה שהעמוד שחיפשתם לא קיים. אולי יש טעות בקישור?
                </p>
                <a
                    href="/"
                    className="inline-block mt-6 bg-indigo-600 text-white py-3 px-6 rounded-lg shadow-md hover:bg-indigo-700 transition-colors"
                >
                    חזרה לדף הבית
                </a>
            </div>
        </main>
    );
};

export default NotFoundPage;
