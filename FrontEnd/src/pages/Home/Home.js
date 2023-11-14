import React,{useState,useEffect} from 'react';
import Head from '../../components/Head';
import Calendar from 'react-calendar';
import moment from 'moment';
import CalendarDetail from './ModalCalendar'
import './HomeCalendar.css';

import { useTranslation } from 'react-i18next';
import Bar from "./Bar";
import Modal from 'react-modal';
import PostgreAPI from "../../apis/PostgreAPI";


export default function Home() {
    const data = [
        {title: "ส่งมคอ.3",duedate:"2021-03-11 18:00:00",isshowed:true},
        {title: "ส่งมคอ.5",duedate:"2021-03-11 18:00:00",isshowed:true},
        {title: "ส่งมคอ.2",duedate:"2021-03-26 18:00:00",isshowed:true},
        
    ]

    const { t } = useTranslation();
    const [modalIsOpen,setModalIsOpen] = useState(false);
    const [event, setEvent] = useState({})

    const changedate = (value,event) => {
        if(event.target.className.indexOf('hasevent') !== -1 || event.target.parentElement.className.indexOf('hasevent') !== -1) {
            const findevent = data.find(x => x.duedate.slice(0,10) == moment(value).format('YYYY-MM-DD'))
            setEvent(findevent)
            setModalIsOpen(true);
        }
    }

    const hasEvent = ({activeStartDate, date, view}) =>{
        const findevent = data.find(x => x.duedate.slice(0,10) == moment(date).format('YYYY-MM-DD'))
        return view === 'month' && findevent?.isshowed ? 'hasevent' : null;
        // console.log(data.find(x => x.duedate.slice(0,10) == moment(date).format('YYYY-MM-DD'))?true:"")
    }

    useEffect(() => {
        PostgreAPI.post("/calendar/getallbydate")
            .then((res) => {
                console.log("[Home.js] calendar: ", res.data);
                // setProfile(res.data);
            })
            .catch((error) => {
                console.error(error);
            });
      }, []);

    
    
return (
    <>
    <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)'
          },
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '400px',
            height: '250px'
          }
        }}
      > <CalendarDetail event={event}/>  </Modal>
    <Head title={t('home.title1')} title2={t('home.title2')}/>
    <div className="container-center">
        <div className="home-content">
            <div className="in-col-center">
                <Bar/>
            </div>
            <div style={{ marginTop: '20px', paddingBottom: '40px',boxSizing: 'border-box'}} className="home-calendar">
                <Calendar
                    locale={localStorage.getItem('i18nextLng')}
                    onChange={changedate}
                    minDetail={"year"}
                    className={["home"]}
                    showNeighboringMonth={false}
                    tileClassName={hasEvent}
                    // formatLongDate={(locale, date) => console.log(moment(date).format('D-M-YYYY'))}
                />
            </div>
            <div className="home-update-info">
                <h2>อัพเดทข่าวสาร</h2>
                <div className="home-update-info-content">
                    {data.map((el, index) => 
                        <div className="home-update-info-box" key={index}>
                            <div className="home-update-info-box-head">{moment(el.duedate).format('MM / DD')}</div>
                            <label>{el.title}</label>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </div>
    
    
    </>
)
}
