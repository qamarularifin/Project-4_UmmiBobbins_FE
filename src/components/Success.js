import React from "react";

const Success = (props) => {
  const { message } = props;
  return (
    <div>
      <div class="alert alert-success" role="alert">
        {message}
      </div>
    </div>
  );
};

export default Success;
