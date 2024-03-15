import React, { useEffect, useState } from "react";

const MessageBox = (props) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2000);

    // Clear the timeout when the component unmounts
    return () => clearTimeout(timer);
  }, [props.children]); // Run this effect whenever the message changes

  return (
    <>
      {isVisible && (
        <div className="alert-box">
          <p className="error-message">{props.children}</p>
        </div>
      )}
    </>
  );
};

export default MessageBox;
