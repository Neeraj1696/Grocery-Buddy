import React, { useEffect } from "react";
import "./App.css";

function Alert({ type, msg, list, removeAlert }) {
  useEffect(() => {
    const timeout = setTimeout(() => {
      removeAlert();
    }, [3000]);

    <p className={`alert alert-${type}`}>{msg}</p>;
    return () => clearTimeout(timeout);
  }, [list]);

  return <p className={`alert alert-${type}`}>{msg}</p>;
}

export default Alert;
