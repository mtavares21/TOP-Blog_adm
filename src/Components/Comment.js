import React, { useContext, useState } from "react";
import { updateComment, deleteComment } from "../blogApi";
import { UserContext } from "../App";

export default function Comment({ id, text, author, date }) {
  const [editable, setEditable] = useState(false);
  const [error, setError] = useState(null);
  const [inputText, setInputText] = useState(text);
  const [deleted, setDeleted] = useState(false);
  const user = useContext(UserContext);

  const handleDeleteComment = () => {
    deleteComment(user, id)
      .then(setDeleted(true))
      .catch((err) => setError((prev) => err))
      .finally(() => setEditable(false));
  };
  const handleUpdateComment = (e) => {
    const text = e.target.form[0].value;
    updateComment(id, user, text)
      .then((response) => {
        setInputText((prev) => text);
      })
      .catch((err) => setError((prev) => error))
      .finally(() => setEditable((prev) => false));
  };
  return (
    <div
      key={id}
      className={`${
        deleted ? "hidden" : "flex"
      } container w-full p-5 pr-10 max-h-42 mb-3 grid items-center justify-center bg-red-400 rounded-full text-white`}
    >
      <form className="md:w-full">
        <div className="my-2 w-full max-h-40 flex flex-wrap items-start justify-center ">
          <h1 className="w-full mb-2 text-white font-sans font-medium overflow-scroll text-md">
            {author.username}:
          </h1>
          {editable ? (
            <textarea
              defaultValue={text}
              className="w-full max-h-20 h-full overflow-scroll font-serif text-black text-justify"
            />
          ) : (
            <div className="w-full max-h-42 flex flex-wrap  items-start justify-center ">
              <p className="flex md:w-96 sm:96 ml-4 max-h-16 h-full overflow-scroll font-serif text-justify">
                {inputText}
              </p>
            </div>
          )}
        </div>
        <div className="flex md:flex-nowrap flex-wrap mt-2 w-full md:justify-between justify-center">
          {editable ? (
            <div className="w-20 ml-4 max-h-16 h-full"> </div>
          ) : (
            <p className="flex justify-start mt-1 md:w-full  w-full font-serif text-sm text-center">
              {date}
            </p>
          )}
          <div className="flex flex-nowrap w-1/3 justify-center md:justify-end">
            <button
              onClick={
                editable
                  ? handleUpdateComment
                  : () => setEditable((prev) => true)
              }
              type="button"
              className="p-1 h-7 mb-1 mx-1 flex rounded-full bg-white px-5 text-sm text-red-400"
            >
              {editable ? "Save" : "Edit"}
            </button>
            <button
              onClick={handleDeleteComment}
              type="button"
              className="p-1 h-7 flex rounded-full bg-white px-3 text-sm text-red-400"
            >
              Delete
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
