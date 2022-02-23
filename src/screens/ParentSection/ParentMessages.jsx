import React from "react";

const ParentMessages = ({ messages }) => {
  const printMessages = messages.map((message, i) => {
    return (
      <div key={i}>
        <p>Message: {message}</p>
      </div>
    );
  });

  return (
    <div>
      <h1> Parent Messages</h1>
      {printMessages}
    </div>
  );
};

export default ParentMessages;
