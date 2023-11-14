import React,{useState, useEffect} from 'react';
import { useTranslation } from 'react-i18next';

import './Professor.css'


import moment from 'moment';


export default React.memo (function Bar(props) {

    const { t } = useTranslation();
    const nowTemp = new Date().toISOString().slice(0,10);
    const now = new Date(nowTemp);
    const date = new Date(props.date);
    const [diffDays, setDiffDays ]= useState(0);
    

    useEffect(() => {
        console.log("[002bar.js] now: ", now ," date: ",date );
        if(date.getTime() === now.getTime()){
            console.log("[002bar.js] date === now");
        }else if(date.getTime() < now.getTime()){
            console.log("[002bar.js] date < now");
        }else{
            const diff = Math.round(Math.abs((date - now) / (24 * 60 * 60 * 1000)));
            setDiffDays(diff);
            console.log("[002bar.js] date: ", diff);
        }
      }, []);

return (
    
    <>
    <div className="professorhome-bar">
        <p>กำหนดส่ง{props.title} สิ้นสุดวันที่ {props.date}</p>
        <div className="professorhome-bar-count">
            {/* <div className="professorhome-bar-count-item"> */}
                <h2>เหลือเวลาอีก</h2>
                <h1>{diffDays}</h1>
                <h2>วัน</h2>
            {/* </div> */}
        </div>
        
    </div>
    </>
)
})
