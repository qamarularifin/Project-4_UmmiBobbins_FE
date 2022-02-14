import React from "react";
import { Datepicker } from "@mobiscroll/react";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";

const DatePicker = () => {
  return (
    <div>
      <Datepicker controls={["date"]} />
    </div>
  );
};

export default DatePicker;
