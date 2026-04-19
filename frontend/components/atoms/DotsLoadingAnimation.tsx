import React from "react";

const Loader = () => {
  const dots = [
    { className: "left-[35px] top-0", delay: "0s" },
    { className: "right-[10px] top-[10px]", delay: "0.125s" },
    { className: "right-0 top-[35px]", delay: "0.25s" },
    { className: "right-[10px] bottom-[10px]", delay: "0.375s" },
    { className: "left-[35px] bottom-0", delay: "0.5s" },
    { className: "left-[10px] bottom-[10px]", delay: "0.625s" },
    { className: "left-0 top-[35px]", delay: "0.75s" },
    { className: "left-[10px] top-[10px]", delay: "0.875s" },
  ];

  return (
      <div className="relative w-20 h-20">
        {dots.map((dot, index) => (
          <div
            key={index}
            className={`absolute w-2.5 h-2.5 rounded-full bg-yellow-400 animate-loader ${dot.className}`}
            style={{ animationDelay: dot.delay }}
          />
        ))}

        {/* Keyframes defined inline for simplicity */}
        <style>
          {`
            @keyframes loader {
              0% { opacity: 0; transform: scale(1); }
              30% { opacity: 1; transform: scale(1.3); }
              60% { opacity: 1; transform: scale(1); }
              100% { opacity: 0; transform: scale(0.9); }
            }

            .animate-loader {
              animation: loader 1s linear infinite;
            }
          `}
        </style>
      </div>
  );
};

export default Loader;
