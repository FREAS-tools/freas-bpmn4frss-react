import React from "react";

export type ButtonProps = {
  caption: string;
  onClick: () => void;
  type?: "button" | "submit" | "reset";
}

// A button for manipulating the library
export const Button: React.FC<ButtonProps> = ({caption, onClick, type}) => (
  <button 
    className="button clickable"
    onClick={() => onClick()}
    type={type}
  >
    {caption}
  </button>
);