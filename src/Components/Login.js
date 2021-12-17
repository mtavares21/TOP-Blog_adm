import React, { useContext, useState } from "react";
import { logIn, createUser, logOut } from "../blogApi";
import { UserContext } from "../App";

export default function Login({ show, setUser }) {
  const [error, setError] = useState(null);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const user = useContext(UserContext);

  const logInUser = () => {
    // Login with inserted credentials and setUser
    logIn({
      username: username,
      password: password,
    }).then((resolve, reject) => {
      if (reject) {
        setError((prev) => "Log-in failed");
      } else if (!!resolve.message) {
        setError((prev) => "Please sign-up first.");
      } else if (resolve.allow !== "WRITE") {
        setError((prev) => "You're not an administrator.");
      } else {
        setUser((prev) => {
          return {
            user_id: resolve.user_id,
            username: resolve.username,
            token: resolve.token,
          };
        });
      }
    });
  };

  const signUpUser = (e) => {
    // Login with inserted credentials and setUser
    createUser({
      username: e.target.form[0].value,
      password: e.target.form[1].value,
    }).then((resolve, reject) => {
      if (reject) {
        setError((prev) => "Sign-up failed.");
      } else if (!!resolve.message) {
        setError((prev) => resolve.message);
      } else setError((prev) => resolve);
    });
  };

  const logOutUser = () => {
    logOut()
      .then(() => {
        setUser((prev) => null);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div
      key={show}
      className="absolute top-24 right-0 h-30 md:w-1/3 sm:w-40 w-full bg-gray-800 px-5 pb-5 z-10 font-sans text-base text-justify"
      style={{ display: show ? "fixed" : "none" }}
    >
      {!!user ? (
        <div>
          <p className="text-red-400 font-bold text-center mt-4">
            {user.username}
          </p>
          <button
            type="button"
            onClick={(e) => logOutUser(e)}
            className="text-red-400 w-full mb-2"
          >
            {" "}
            Log-out
          </button>
        </div>
      ) : (
        <form className="container flex flex-wrap w-full justify-center items-between">
          <input
            onChange={(e) => setUsername((prev) => e.target.value)}
            name="username"
            type="email"
            placeholder="username/mail"
            className="w-full my-3"
          />
          <input
            onChange={(e) => setPassword((prev) => e.target.value)}
            name="password"
            type="password"
            placeholder="password"
            className="w-full mb-3"
          />
          <p className="text-red-200">{error ? error : null}</p>
          <button
            type="button"
            onClick={logInUser}
            className="text-red-400 w-full mb-2"
          >
            Log-in
          </button>
          <button
            type="button"
            onClick={signUpUser}
            className="text-red-400 w-full"
          >
            Sign-up
          </button>
        </form>
      )}
    </div>
  );
}
