import * as React from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

const ContactPage = () => {
    return (
        <main className="min-h-screen bg-transparent py-6">
            <div className="container mx-auto max-w-6xl bg-white rounded-2xl overflow-hidden">
                {/* Header Section */}
                <header className="relative bg-gradient-to-r from-indigo-600 to-purple-700 text-white py-16 px-8 text-center overflow-hidden">
                    <div
                        className="absolute bottom-0 left-0 right-0 h-8 bg-white"
                        style={{
                            clipPath: 'polygon(0 0, 100% 100%, 0 100%)',
                            transform: 'scaleX(2)',
                        }}
                    ></div>
                    <h1 className="text-4xl font-bold relative z-10">צור קשר</h1>
                    <p className="text-lg mt-4 relative z-10">
                        נשמח לשמוע מכם! שאלות, רעיונות, שיתופי פעולה או הצעות לשיפור.
                    </p>
                </header>

                {/* Contact Information */}
                <section className="px-8 py-16">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="text-center bg-gray-50 p-8 rounded-2xl shadow-md">
                            <FaEnvelope className="text-indigo-500 mx-auto mb-4" size={40} />
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">אימייל</h3>
                            <p className="text-gray-700">contact@community.com</p>
                        </div>
                        <div className="text-center bg-gray-50 p-8 rounded-2xl shadow-md">
                            <FaPhone className="text-indigo-500 mx-auto mb-4" size={40} />
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">טלפון</h3>
                            <p className="text-gray-700">054-845-5118</p>
                        </div>
                        <div className="text-center bg-gray-50 p-8 rounded-2xl shadow-md">
                            <FaMapMarkerAlt className="text-indigo-500 mx-auto mb-4" size={40} />
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">כתובת</h3>
                            <p className="text-gray-700">רמת גן, ישראל</p>
                        </div>
                    </div>
                </section>

                {/* Contact Form */}
                <section className="px-8 py-16">
                    <h2 className="text-3xl font-bold text-center text-indigo-600 mb-8">
                        השאירו הודעה
                    </h2>
                    <form className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
                        <div className="grid gap-6">
                            <input
                                type="text"
                                placeholder="שם מלא"
                                className="border border-gray-300 rounded-lg p-4 w-full focus:ring-indigo-200"
                            />
                            <input
                                type="email"
                                placeholder="אימייל"
                                className="border border-gray-300 rounded-lg p-4 w-full focus:ring-indigo-200"
                            />
                            <textarea
                                placeholder="הודעה"
                                rows={5}
                                className="border border-gray-300 rounded-lg p-4 w-full focus:ring-indigo-200"
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="mt-6 w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors"
                        >
                            שלחו הודעה
                        </button>
                    </form>
                </section>
            </div>
        </main>
    );
};

export default ContactPage;
