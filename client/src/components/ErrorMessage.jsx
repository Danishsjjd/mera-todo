import React from "react";

const ErrorMessage = ({ err, className }) => {
  if (!err) return null;

  return <div className={`${className} text-red-300`}>{err}</div>;
};

export default ErrorMessage;
