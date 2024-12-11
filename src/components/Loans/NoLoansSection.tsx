export const NoLoansSection = ({ title, description }: { title: string, description: string }) => (
    <div className="flex flex-col items-center justify-center w-full p-8 text-center bg-white rounded-2xl">
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="w-24 h-24 text-gray-300 mb-4"
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
        />
      </svg>
      <h2 className="text-xl font-bold text-neutral-700 mb-2">{title}</h2>
      <p className="text-neutral-500">{description}</p>
    </div>
  );