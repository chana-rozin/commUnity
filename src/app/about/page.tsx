import * as React from "react";
import {
    FaLinkedin,
    FaGlobe,
    FaUsers,
    FaHeart,
    FaUserCircle
} from "react-icons/fa";

const AboutPage = () => {
    const developers = [
        {
            name: "חני רוזין",
            linkedin: "https://www.linkedin.com/in/chana-rozin-b73801332/",
            role: "מנהלת פרויקט"
        },
        {
            name: "יעל רוזנבום",
            linkedin: "https://www.linkedin.com/in/yael-rosenbom-103846336/",
            role: "מפתחת באקאנד"
        },
        {
            name: "צפורה מארוקו",
            linkedin: "https://www.linkedin.com/in/tzipora-maroko-b6b0b9250/",
            role: "מפתחת פרונטאנד"
        },
        {
            name: "טלי פרלה",
            linkedin: "https://www.linkedin.com/in/taly-perla-48072327a/",
            role: "מעצבת UX/UI"
        },
    ];

    return (
        <main className="min-h-screen bg-transparent py-6">
            <div className="container mx-auto max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden">
                {/* Header Section */}
                <header className="relative bg-gradient-to-r from-indigo-600 to-purple-700 text-white py-16 px-8 text-center overflow-hidden">
                    <div
                        className="absolute bottom-0 left-0 right-0 h-8 bg-white"
                        style={{
                            clipPath: 'polygon(0 0, 100% 100%, 0 100%)',
                            transform: 'scaleX(2)',
                        }}
                    ></div>
                    <img
                        src="https://res.cloudinary.com/community-cloud/image/upload/v1734513910/commUnity_6_ww9dxs.png"
                        alt="commUnity Logo"
                        className="mx-auto h-24 object-contain relative z-10 mb-4"
                    />
                    <p className="text-xl max-w-3xl mx-auto relative z-10">
                        הפלטפורמה שמחברת אתכם לשכונה שלכם! פותחה כחלק מקורס בסמ״ח בצה״ל להכשרת מפתחים, כפרויקט גמר.
                    </p>
                </header>

                {/* About the Project */}
                <section className="px-8 py-16">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-indigo-600 mb-6 flex items-center">
                                <FaGlobe className="ml-4 text-indigo-500" size={40} />
                                על הפלטפורמה
                            </h2>
                            <div className="space-y-4 text-gray-700 leading-relaxed">
                                <p>
                                    אנחנו ב-commUnity מאמינים שבכל שכונה טמון פוטנציאל של חיבור, שיתוף פעולה ועזרה הדדית.
                                    הפלטפורמה שלנו נועדה לגשר בין תושבי השכונה ולהעצים את הקהילה המקומית בעזרת כלים דיגיטליים מתקדמים.
                                </p>
                                <p>
                                    הפרויקט נבנה במטרה לספק תשתית נוחה לשיתוף אירועים, דיונים, קביעת מניינים ואירועים,
                                    עזרה הדדית ועוד, והכל תוך הקפדה על חוויית משתמש פשוטה ונגישה.
                                </p>
                            </div>
                        </div>
                        <div className="bg-indigo-50 rounded-2xl p-8">
                            <div className="flex items-center mb-6">
                                <FaUsers className="ml-4 text-indigo-500" size={40} />
                                <h3 className="text-2xl font-semibold text-indigo-600">
                                    יעדי הפלטפורמה
                                </h3>
                            </div>
                            <ul className="space-y-3">
                                <li className="flex items-center">
                                    <FaHeart className="ml-3 text-indigo-400" size={24} />
                                    חיזוק הקשר השכונתי
                                </li>
                                <li className="flex items-center">
                                    <FaHeart className="ml-3 text-indigo-400" size={24} />
                                    שיתוף מידע וזמינות קהילתית
                                </li>
                                <li className="flex items-center">
                                    <FaHeart className="ml-3 text-indigo-400" size={24} />
                                    עזרה הדדית ותמיכה קהילתית
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Developers Section */}
                <section className="bg-gray-50 px-8 py-16">
                    <h2 className="text-3xl font-bold text-center text-indigo-600 mb-12">צוות הפיתוח</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {developers.map((developer, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                            >
                                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 h-1 w-full"></div>
                                <div className="p-6 text-center">
                                    <FaUserCircle
                                        className="mx-auto mb-4 text-indigo-500"
                                        size={64}
                                    />
                                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                        {developer.name}
                                    </h3>
                                    <p className="text-gray-600 mb-4">
                                        {developer.role}
                                    </p>
                                    <a
                                        href={developer.linkedin}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="flex items-center justify-center text-indigo-600 hover:text-indigo-800 transition-colors"
                                    >
                                        <FaLinkedin className="ml-2" size={20} />
                                        פרופיל לינקדאין
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </main>
    );
}

export default AboutPage;