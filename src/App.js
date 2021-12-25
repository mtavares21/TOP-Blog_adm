import React from "react";
import Post from "./Components/Post";
import User from "./Components/User";
import Login from "./Components/Login";
import { getPosts } from "./blogApi";
import { useEffect, useState } from "react";
//import NewPost from "./Components/NewPost";
import Switch from "./Components/Switch";
import Tiny from "./Components/Tiny";

const UserContext = React.createContext(null);

function decodeHtml(html) {
  var txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

const isHtml = (txt) => {
  const htmlParser = new DOMParser();
  const parsedText = htmlParser.parseFromString(
    "<div>" + decodeHtml(txt) + "</div>",
    "text/xml"
  );
  return !!!parsedText.querySelector("parsererror");
};

function App() {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [show, setShow] = useState(false);
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  useEffect(() => {
    getPosts()
      .then((response) => {
        setPosts((prev) => response);
      })
      .catch((err) => {
        setError((prev) => err);
      })
      .finally(() => {
        setLoading((prev) => false);
      });
  }, []);

  const renderPosts = () => {
    if (loading) return <div className="loader"></div>;
    else if (error) {
      return <p>"Failed to load posts."</p>;
    } else {
      return posts.map((post) => {
        const date = new Date(post.updatedAt);
        if (isHtml(post.text)) {
          return (
            <div key={post._id} className="flex flex-wrap w-4/5 justify-center">
              <Post
                key={post._id}
                postId={post._id}
                title={post.title}
                html={post.text}
                isPublished={post.isPublished}
                date={date.toDateString()}
              />
            </div>
          );
        } else {
          return (
            <div key={post._id} className="flex flex-wrap w-4/5 justify-center">
              <Post
                postId={post._id}
                title={post.title}
                text={post.text}
                isPublished={post.isPublished}
                date={date.toDateString()}
              />
            </div>
          );
        }
      });
    }
  };
  return (
    <UserContext.Provider value={user}>
      <div
        className={`${
          theme ? "dark" : null
        } w-screen min-h-screen h-full  flex flex-wrap justify-center justify-items-center`}
      >
        <header className="flex pl-5 items-center justify-between font-sans text-2xl font-bold text-red-400 bg-gray-800 h-24 w-full">
          I'm a Blogger now
          <User setShow={setShow} />
        </header>
        {show ? <Login setUser={setUser} /> : null}
        <div className="dark:bg-gray-700 min-h-screen h-full self-center w-full flex flex-wrap justify-center justify-items-center font-sans">
          <Switch bollean_click={() => setTheme((prev) => !prev)} />
          {user ? <Tiny /> : null}
          {renderPosts()}
        </div>
      </div>
    </UserContext.Provider>
  );
}

export { App, UserContext };
