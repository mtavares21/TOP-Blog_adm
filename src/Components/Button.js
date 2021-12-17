import React from "react";

export default function Button ({type,label, onClick}){
	return (
        <button
          type={type}
          onClick={onClick}
          className="p-1 mt-3 mx-full flex rounded-full bg-red-400 px-2 text-sm text-white"
        >
          {label}
        </button>
      );
}