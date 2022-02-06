import React, { useState } from "react";
import PuffLoader from "react-spinners/PuffLoader";

const Loader = () => {
  let [loading, setLoading] = useState(true);

  return (
    <div style={{ marginTop: "10px" }}>
      <div className="sweet-loading text-center">
        <PuffLoader color="#000" loading={loading} css="" size={80} />
      </div>
    </div>
  );
};

export default Loader;
