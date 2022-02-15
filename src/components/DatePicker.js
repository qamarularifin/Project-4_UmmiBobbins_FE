import React, { useState, useCallback, useEffect } from "react";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import {
  Datepicker,
  CalendarPrev,
  CalendarNav,
  CalendarNext,
  CalendarToday,
  formatDate,
  getJson,
  setOptions,
} from "@mobiscroll/react";

setOptions({
  theme: "ios",
  themeVariant: "light",
});

const now = new Date();

const DatepickerThis = () => {
  const [labels, setLabels] = useState([]);
  const [invalid, setInvalid] = useState([]);
  const [colors, setColors] = useState([]);

  const getColors = useCallback((start, end) => {
    return [
      {
        date: start,
        cellCssClass: "vacation-check-in",
      },
      {
        date: end,
        cellCssClass: "vacation-check-out",
      },
      {
        start: new Date(
          start.getFullYear(),
          start.getMonth(),
          start.getDate() + 1
        ),
        end: new Date(end.getFullYear(), end.getMonth(), end.getDate() - 1),
        background: "#ffbaba80",
        cellCssClass: "vacation-booked",
      },
    ];
  }, []);

  useEffect(() => {
    const monthColors = [
      {
        background: "#b2f1c080",
        start: "2022-01-01T00:00",
        end: "2022-01-31T00:00",
        cellCssClass: "md-book-rental-bg-off",
        recurring: {
          repeat: "yearly",
          month: 1,
          day: 1,
        },
      },
      {
        background: "#b2f1c080",
        start: "2022-02-01T00:00",
        end: "2022-02-28T00:00",
        cellCssClass: "md-book-rental-bg-off",
        recurring: {
          repeat: "yearly",
          month: 2,
          day: 1,
        },
      },
      {
        background: "#b2f1c080",
        cellCssClass: "md-book-rental-bg-off",
        recurring: {
          repeat: "yearly",
          month: 2,
          day: 29,
        },
      },
      {
        background: "#a3cdff80",
        start: "2022-03-01T00:00",
        end: "2022-03-31T23:59",
        cellCssClass: "md-book-rental-bg-pre",
        recurring: {
          repeat: "yearly",
          month: 3,
          day: 1,
        },
      },
      {
        background: "#a3cdff80",
        start: "2022-04-01T00:00",
        end: "2022-04-30T00:00",
        cellCssClass: "md-book-rental-bg-pre",
        recurring: {
          repeat: "yearly",
          month: 4,
          day: 1,
        },
      },
      {
        background: "#a3cdff80",
        start: "2022-05-01T00:00",
        end: "2022-05-31T00:00",
        cellCssClass: "md-book-rental-bg-pre",
        recurring: {
          repeat: "yearly",
          month: 5,
          day: 1,
        },
      },
      {
        background: "#f7f7bb80",
        start: "2022-06-01T00:00",
        end: "2022-06-30T00:00",
        cellCssClass: "md-book-rental-bg-in",
        recurring: {
          repeat: "yearly",
          month: 6,
          day: 1,
        },
      },
      {
        background: "#f7f7bb80",
        start: "2022-07-01T00:00",
        end: "2022-07-31T00:00",
        cellCssClass: "md-book-rental-bg-in",
        recurring: {
          repeat: "yearly",
          month: 7,
          day: 1,
        },
      },
      {
        background: "#f7f7bb80",
        start: "2022-08-01T00:00",
        end: "2022-08-31T00:00",
        cellCssClass: "md-book-rental-bg-in",
        recurring: {
          repeat: "yearly",
          month: 8,
          day: 1,
        },
      },
      {
        background: "#f7f7bb80",
        start: "2022-09-01T00:00",
        end: "2022-09-30T00:00",
        cellCssClass: "md-book-rental-bg-in",
        recurring: {
          repeat: "yearly",
          month: 9,
          day: 1,
        },
      },
      {
        background: "#f7f7bb80",
        start: "2022-10-01T00:00",
        end: "2022-10-31T23:59",
        cellCssClass: "md-book-rental-bg-in",
        recurring: {
          repeat: "yearly",
          month: 10,
          day: 1,
        },
      },
      {
        background: "#b2f1c080",
        start: "2022-11-01T00:00",
        end: "2022-11-30T00:00",
        cellCssClass: "md-book-rental-bg-off",
        recurring: {
          repeat: "yearly",
          month: 11,
          day: 1,
        },
      },
      {
        background: "#b2f1c080",
        start: "2022-12-01T00:00",
        end: "2022-12-31T00:00",
        cellCssClass: "md-book-rental-bg-off",
        recurring: {
          repeat: "yearly",
          month: 12,
          day: 1,
        },
      },
    ];

    getJson(
      "https://trial.mobiscroll.com/getrentals/?year=" +
        now.getFullYear() +
        "&month=" +
        now.getMonth(),
      (data) => {
        const prices = data.prices;
        const bookings = data.bookings;
        let labels = [];
        let invalids = [];
        let colors = [];
        let endDate = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate(),
          0,
          0
        );

        for (let i = 0; i < prices.length; ++i) {
          const price = prices[i];
          const booked = bookings.find(
            (b) => formatDate("YYYY-M-D", new Date(b.checkIn)) === price.date
          );
          if (booked) {
            const checkIn = new Date(booked.checkIn);
            const checkOut = new Date(booked.checkOut);
            const newCheckOut = new Date(
              checkOut.getFullYear(),
              checkOut.getMonth(),
              checkOut.getDate() - 1
            );
            colors = [...colors, ...getColors(checkIn, checkOut)];
            labels.push({
              start: checkIn,
              end: newCheckOut,
              text: "booked",
              textColor: "#1e1e1ecc",
            });
            invalids.push({
              start: checkIn,
              end: newCheckOut,
            });
            endDate = checkOut;
          } else if (new Date(price.date) >= endDate) {
            labels.push({
              date: new Date(price.date),
              text: price.text,
              textColor: price.textColor,
            });
          }
        }
        setLabels(labels);
        setInvalid(invalids);
        setColors([...colors, ...monthColors]);
      },
      "jsonp"
    );
  }, [getColors]);

  const calendarHeader = useCallback(() => {
    return (
      <React.Fragment>
        <CalendarNav />
        <div className="md-book-rental-header">
          <div className="md-book-rental-zone md-book-rental-pre">
            pre-season
          </div>
          <div className="md-book-rental-zone md-book-rental-in">in-season</div>
          <div className="md-book-rental-zone md-book-rental-off">
            off-season
          </div>
          <div className="md-book-rental-zone md-book-rental-booked">
            booked
          </div>
        </div>
        <CalendarPrev />
        <CalendarToday />
        <CalendarNext />
      </React.Fragment>
    );
  }, []);

  return (
    <Datepicker
      cssClass="md-book-rental"
      controls={["calendar"]}
      select="range"
      display="inline"
      calendarType="month"
      calendarSize={6}
      min="2022-02-15T00:00"
      showRangeLabels={false}
      inRangeInvalid={false}
      rangeEndInvalid={true}
      renderCalendarHeader={calendarHeader}
      labels={labels}
      invalid={invalid}
      colors={colors}
    />
  );
};

export default DatepickerThis;
