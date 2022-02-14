import React from "react";
import { Datepicker } from "@mobiscroll/react";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";

const DatePicker = () => {
  const [myAppointment, setMyAppointment] = React.useState(null);
  const myPickerChange = (ev) => {
    setMyAppointment(ev.value);
  };
  return (
    <>
      <Datepicker
        controls={["date", "time"]}
        value={myAppointment}
        onChange={myPickerChange}
      />
    </>
  );
};

export default DatePicker;
