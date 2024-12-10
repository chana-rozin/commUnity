"use client";
import React from "react";

export const HelpRequests: React.FC = () => {
  return (
    <section className="flex flex-wrap gap-5 justify-center items-center px-4 py-6 w-full bg-indigo-100 rounded-2xl min-h-[669px] max-md:max-w-full">
      <h2 className="text-lg font-bold leading-10 text-neutral-950">
        בקשות לעזרה
      </h2>
      <p className="text-neutral-700">אין בקשות לעזרה כרגע.</p>
    </section>
  );
};
