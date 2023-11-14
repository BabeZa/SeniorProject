import React,{useState, useContext, useEffect} from 'react';
import Calendar from 'react-calendar';
import './Calendar.css';

export default function MyCalendar(props) {
    const [date, setDate] = useState(new Date("2021-01-15"));

    const dateEvent = new Date(props.date)
  
    return (
        // console.log("[MyCalendar.js] MyCalendar:", new Date(2021, 0, 15)),
        <Calendar
            // onChange={setDate}
            value={dateEvent}
            className={["professor"]}
        />
    );
  }