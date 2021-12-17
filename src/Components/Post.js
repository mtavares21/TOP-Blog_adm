import React from "react";
import { useState, useEffect, useContext } from "react";
import Comment from "./Comment";
import { getComments } from "../blogApi";
import NewComment from "./NewComment";
import { UserContext } from "../App";
import Button from "./Button";

export default function Post({ id, postId, title, text, date, html, preview }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const user = useContext(UserContext);

  useEffect(() => {
    if (showComments && user) {
      getComments(postId, user.token)
        .then((response) => {
          setComments((prev) => response);
        })
        .catch((err) => {
          setError((prev) => true);
        })
        .finally(() => {
          setLoading((prev) => false);
        });
    }
    return () => setError((prev) => false);
  }, [postId, showComments, user]);

  const renderComments = () => {
    if (loading) return <div className="loader"></div>;
    else if (error) {
      return "Failed to load comments.";
    } else if (!comments.length) {
      return "No comments yet.";
    } else {
      return comments.map((comment) => {
        const date = new Date(comment.updatedAt);
        return (
          <div
            key={comment._id}
            className="flex flex-wrap w-full justify-start"
          >
            <Comment
              id={comment._id}
              author={comment.author}
              text={comment.text}
              date={date.toDateString()}
            />
          </div>
        );
      });
    }
  };

  const renderNewComment = () => {
    if (!!user && newComment) {
      return <NewComment postid={postId} setNewComment={setNewComment} />;
    } else if (!!user) {
      return (
        <Button
          onClick={preview ? () => {} : () => setNewComment((prev) => !prev)}
          label="New Comment"
        />
      );
    } else return null;
  };
  return (
    <div className="dark:bg-gray-700 container mt-10 md:w-2/3 flex flex-wrap items-center justify-center bg-white">
      <div className="container mt-10 flex flex-wrap justify-center items-center">
        <h1 className="w-full my-10 text-center text-red-400 font-sans font-bold text-4xl">
          {title}
        </h1>
        <p className="dark:text-gray-200 w-full font-serif text-justify min-h-70">
          {!!html ? <div dangerouslySetInnerHTML={{ __html: html }} /> : text}
        </p>
        <p className="w-full font-serif underline-red-500">
          <mark className="bg-red-400 px-2 text-sm text-white">{date}</mark>
        </p>
      </div>
      <div className="flex flex-wrap w-full">
        {renderNewComment()}
        <div className="w-full">
          {!!user ? (
            <Button
              onClick={
                preview ? () => {} : () => setShowComments((prev) => !prev)
              }
              label={showComments ? "Hide comments" : "See comments"}
            />
          ) : null}
          {showComments && !!user ? renderComments() : null}
        </div>
      </div>
    </div>
  );
}
