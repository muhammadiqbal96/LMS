import React, { useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function RichTextEditor({ input, setInput }) {
    const quillRef = useRef(null);
    const handleChange = (content) => {
        setInput(prev => ({ ...prev, description: content }));
    };

    return <ReactQuill ref={quillRef}  theme="snow" value={input.description || ""} onChange={handleChange} />;
}
