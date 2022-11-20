import React, { ChangeEvent } from "react";

interface TextAreaProps {
  value: string;
  onChange: (v: string) => void;
  className?: string;
}

function TextArea({ onChange, value, className }: TextAreaProps) {
  function handleTextArea(e: ChangeEvent<HTMLTextAreaElement>) {
    onChange?.(e.target.value);
  }
  return (
    <textarea value={value} className={className} onChange={handleTextArea} />
  );
}

export default TextArea;
