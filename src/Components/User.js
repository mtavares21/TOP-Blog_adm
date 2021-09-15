import React from "react";

export default function User({ setShow }) {
  return (
    <div className="absolute sm:right-12 right-4  top-0">
      <div
        onClick={() => setShow((prev) => !prev)}
        className="flex flex-wrap justify-center w-full"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="sm:h-10 sm:w-10 h-7 w-7 absolute right-1 top-8"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
}
