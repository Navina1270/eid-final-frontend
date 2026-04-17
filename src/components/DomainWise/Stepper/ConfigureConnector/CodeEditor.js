"use client";
import React, { useState } from "react";
import Editor from "react-simple-code-editor";
import Prism from "prismjs";
import { highlight } from "prismjs";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism-tomorrow.css";

export default function CodeEditor() {
  const [code, setCode] = useState("");

  const getLineNumbers = () => {
    const lines = code.split("\n").length;
    return Array.from({ length: lines }, (_, i) => i + 1).join("\n");
  };

  return (
    <div className="bg-[#131E30] border-[#131E30] rounded-xl shadow-lg y-overflow min-h-[250px]">
      <div className="relative flex text-sm ">
        <pre className="select-none w-5 justify-center text-white text-center">
          {getLineNumbers()}
        </pre>

        <Editor
          placeholder="// Write your code here"
          value={code}
          onValueChange={(code) => setCode(code)}
          highlight={(code) =>
            highlight(code, Prism.languages.javascript, "javascript")
          }
          padding={0}
          className="flex-1 text-white bg-[#314158] border-[#314158] y-overflow-auto min-h-[250px]"
        />

      </div>
    </div>
  );
}