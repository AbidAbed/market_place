import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

function Notification({ text ,onChange}) {
  const [showNotification, setShowNotification] = useState(true);

  useEffect(() => {
    let timer;
    if (showNotification) {
      timer = setTimeout(() => {
        setShowNotification(false);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [showNotification]);

  return ReactDOM.createPortal(
    <div>
      {showNotification && (
        <div className="fixed bottom-0 right-0 m-8 p-4 border-gray-500  bg-gray-100 border-2 text-bold rounded-md shadow-lg" onClick={onChange}>
          <p>{text}</p>
        </div>
      )}
    </div>,
    document.querySelector(".modal-container")
  );
}

export default Notification;
