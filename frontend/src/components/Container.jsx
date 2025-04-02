import React from "react";

const Container = ({ children, className }) => {
  return <div className={`max-auto ${className}`}>{children}</div>;
};

export default Container;
