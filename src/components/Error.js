import React from "react";

const Error = (props) => {
  const { message } = props;
  return (
    <div>
      <div class="alert alert-danger" role="alert">
        {message}
      </div>
    </div>
  );
};

export default Error;
