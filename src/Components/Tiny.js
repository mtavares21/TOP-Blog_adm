import React, { useContext, useEffect, useCallback, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import Button from "./Button";
import Post from "./Post";
import {savePost} from "../blogApi"
import { UserContext } from "../App";

const DEFAULT_TITLE = "New post title";
const DEFAULT_TEXT = null;
const DEFAULT_SAVE = false;

export default function Tiny() {
  const [value, setValue] = useState(DEFAULT_TEXT);
  const [title, setTitle] = useState(DEFAULT_TITLE);
  const [saveFlag, setSaveFlag] = useState(DEFAULT_SAVE);
  const user = useContext(UserContext);
  const editorRef = useRef(null);

  const save = () => {
    savePost(user.token,title, value, true).then(
      (resolve, reject) => {
        if(!reject){
          setSaveFlag( prev => true)
        }
        else console.log(reject)
      }
    )
  }
  
  useEffect(() => {
    if(saveFlag){
      setTitle( prev => DEFAULT_TITLE);
      setValue( prev => DEFAULT_TEXT);
      setSaveFlag( prev => !prev);
      editorRef.current.setContent("")
    }
  },[saveFlag])

  const getDate = () => {
    const date = new Date();
    return date.toDateString();
  };

  return (
    <>
    <form action ="" className="mt-20 flex flex-wrap w-4/5 justify-center">
        <input
          type
          onChange={(title) => setTitle((prev) => title.target.value)}
          value={title}
          className="w-fit bg-gray-700 mb-10 text-center text-red-400 font-sans font-bold text-4xl"
        />
        <div className="flex flex-wrap justify-center w-4/5 mb-5">
          <Editor
            apiKey= {process.env.REACT_APP_TINY_PASS}
            onInit={(evt, editor) => (editorRef.current = editor)}
            value={value}
            onEditorChange={(newValue, editor) => setValue((prev) => newValue)}
            init={{
              height: 600,
              width: 1000,
              menubar: false,
              plugins: [
                "advlist autolink lists link image charmap print preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table paste code help wordcount",
              ],
              toolbar:
                "undo redo | formatselect | " +
                "bold italic backcolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "removeformat | help",
              content_style:
                "body { font-family:ui-serif, Georgia, Cambria, Times New Roman, Times, serif;line-height: 24px;}",
            }}
          />
          <div className="mt-5 mx-96">
            <Button type = "button"   onClick={save} label="Save" />
          </div>
        </div>
        <Post preview={true} title={title} html={value} date={getDate()} />
      </form>
    </>
  );
}
