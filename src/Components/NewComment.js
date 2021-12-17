import React, { useContext } from "react";
import { useState } from "react";
import { saveComment } from "../blogApi";
import { UserContext } from "../App";

export default function NewComment({postid, setNewComment }) {
  const [error, setError] = useState(false);
  const user = useContext(UserContext);

  const createComment = (e) => {
    const text = e.target.form[0].value;
    saveComment(postid, user.token, text)
      .then((response) => {
        setNewComment((prev) => false);
      })
      .catch((err) => {
        setError((prev) => err);
      });
  };

  const cancelComment = () => {
    setNewComment((prev) => false);
  };

  return (
    <div
      className={
        "container w-full sm:py-3 sm:px-9 px-5 py-5 max-h-52 mb-3 md:w-5/6 flex flex-wrap items-center sm:justify-center bg-red-400 rounded-full text-white"
      }
    >
      <form className="flex w-full max-h-52 justify-center flex-wrap">
        <div className="w-full max-h-52 flex flex-wrap items-center justify-center">
          <textarea className="w-96 sm:mt-5 max-h-20 h-full overflow-scroll font-serif text-black text-justify" />
          <div className="flex sm:flex-wrap md:justify-end justify-center items-center sm:h-1/4 w-full mx-5">
            <button
              type="button"
              onClick={createComment}
              className="p-1 my-2 flex rounded-full bg-white px-2 text-sm text-red-400"
            >
              Save
            </button>
            <button
              type="button"
              onClick={cancelComment}
              className="p-1 my-2 ml-2 flex rounded-full bg-white px-2 text-sm text-red-400"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
