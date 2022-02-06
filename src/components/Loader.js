import React, { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const Loader = () => {
  let [loading, setLoading] = useState(true);

  return (
    <div style={{ marginTop: "150px" }}>
      <div className="sweet-loading text-center">
        <ClipLoader color="#000" loading={loading} css="" size={80} />
      </div>
    </div>
  );
};

export default Loader;
