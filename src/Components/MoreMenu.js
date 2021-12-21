import * as React from "react";
import { useState, useEffect, useContext } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { updatePost, deletePost } from "../blogApi";
import { UserContext } from "../App";

const ITEM_HEIGHT = 48;

export default function MoreMenu({ postId, isPublished , setDeleted}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [published, setPublished] = useState(isPublished);
  const user = useContext(UserContext);
  const open = Boolean(anchorEl);

  const options = ["Delete", published ? "Unpublish" : "Publish"];

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (event) => {
    setAnchorEl(null);
    console.log(published)
    console.log(event.target.innerText)
    if (
      event.target.innerText === "Publish" ||
      event.target.innerText === "Unpublish"
    ) {
      console.log(published)
      console.log(event.target.innerText)
      updatePost(user.token, postId, !published)
        .then(setPublished((prev) => !prev))
        .catch((error) => console.log(error));
    }
    else if (event.target.innerText === options[0]){
      deletePost(user.token, postId).catch((error) => console.log(error)).then(
      () => setDeleted(prev => true))
    }
  };
  return (
    <div className="color-red-400">
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls="menu"
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        sx={{ color: "rgba(248, 113, 113)" }}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
          },
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option}
            selected={option === "Pyxis"}
            onClick={handleClose}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
