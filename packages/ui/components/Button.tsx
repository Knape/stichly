import React from "react";

export const Button: React.FC = () => {
  return (
    <button className="mt-10 flex w-full items-center justify-center rounded-md  bg-gradient-to-r from-indigo-400 to-fuchsia-600 py-3 px-8 text-base text-base font-medium font-medium font-bold text-white drop-shadow-2xl transition-all duration-200 hover:bg-gradient-to-r hover:from-indigo-500 hover:to-fuchsia-700 focus:ring-4 focus:ring-indigo-400 focus:ring-offset-2">
      Let&apos;s get it !
    </button>
  );
};
