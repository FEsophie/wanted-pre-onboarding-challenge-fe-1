import React, { ChangeEvent } from "react";

interface TextAreaProps {
  value?: string;
  onChange: (v: string) => void;
  className?: string;
}

function TextArea({ value, onChange, className }: TextAreaProps) {
  function handleTextArea(e: ChangeEvent<HTMLTextAreaElement>) {
    onChange?.(e.target.value);
  }

  return (
    <textarea className={className} value={value} onChange={handleTextArea} />
  );
}

export default TextArea;
