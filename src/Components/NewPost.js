import React from "react";
import Tiny from "./Tiny";

export default function NewPost() {
  const handleSave = () => {};
  return (
    <div className="dark:bg-gray-700 container mt-10 md:w-2/3 flex flex-wrap items-center justify-center bg-white">
      <form className="container mt-10 mb-2 flex flex-wrap justify-center items-center">
        <input
          placeholder="title"
          className="w-full my-10 text-center text-red-400 font-sans font-bold text-4xl"
        />
        <Tiny />
        <div className="flex flex-wrap w-full">
          <button
            onClick={handleSave}
            className="p-1 mt-2 mb-5 flex rounded-full bg-red-400 px-2 text-sm text-white"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
