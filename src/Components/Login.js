import React, { useContext, useEffect, useState } from "react";
import { logIn} from "../blogApi";
import { UserContext } from "../App";

export default function Login({ setUser }) {
  
  const [message, setMesssage] = useState(null);
  const [response, setResponse] = useState(null);
  const user = useContext(UserContext);

  const logInUser = (e) => {
    e.preventDefault()
    // Login with inserted credentials and setUser
    logIn({
      username: e.target.form[0].value,
      password: e.target.form[1].value,
    }).then((resolve) => {
      console.log(resolve)
      if (resolve && resolve.allow === "WRITE"){
        setUser({
            user_id: resolve.user_id,
            username: resolve.username,
            token: resolve.token,
            password: e.target.form[1].value,
          });
        } else setResponse( prev => "Log-in failed.")
      })
    };

  const logOutUser = () => {
    setUser((prev) => null);
  };

  useEffect( () => {
    setMesssage( prev => response)
    return () => setMesssage( prev => null)
  }, [response])

  return (
    <div
      className="absolute top-24 right-0 h-30 md:w-1/3 sm:w-40 w-full bg-gray-800 px-5 pb-5 z-10 font-sans text-base text-justify"
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
            Log-out
          </button>
        </div>
      ) : (
        <form className="container flex flex-wrap w-full justify-center items-between">
          <input
            name="username"
            type="email"
            placeholder="username/mail"
            className="w-full my-3"
          />
          <input
            name="password"
            type="password"
            placeholder="password"
            className="w-full mb-3"
          />
          <p>{message}</p>
          <button
            type="button"
            onClick={(e) => logInUser(e)}
            className="text-red-400 w-full mb-2"
          >
            Log-in
          </button>
        </form>
      )}
    </div>
  );
}
