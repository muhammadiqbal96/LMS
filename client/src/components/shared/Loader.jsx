import React from "react";

const Loader = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-[#00000038] backdrop-blur-sm z-[60]">
      <div className="flex space-x-1">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="w-2 sm:w-2.5 lg:w-3 h-12 sm:h-16 lg:h-20 bg-[#395972] animate-bounce-custom rounded"
            style={{
              animationDelay: `${index * 0.15}s`,
              animationDuration: "1s",
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Loader;