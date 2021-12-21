import React from "react";
import { useState } from "react";

export default function Switch({ bollean_click }) {
  return (
    <div className="w-full mt-5 mx-10 mb-0 flex justify-end">
      <label className="switch">
        <input onClick={bollean_click} type="checkbox" checked={bollean_click}/>
        <span className="slider round"></span>
      </label>
    </div>
  );
}
