import React from "react";

const Button = ({ children, testOnly, className, ...props }) => {
  let cssColor = testOnly ? "text-button" : "button";
  cssColor += " " + className;
  return (
    <button className={cssColor} {...props}>
      {children}
    </button>
  );
};

export default Button;
