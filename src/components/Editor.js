import React from "react";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";

export default function Editor({ value, onChange }) {
  const handleChange = (content) => {
    onChange(content);
  };

  return <ReactQuill theme="snow" value={value} onChange={handleChange} />;
}
