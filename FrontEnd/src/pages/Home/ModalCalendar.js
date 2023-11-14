import React,{useState,useEffect} from 'react'
import moment from 'moment'


const ModalCalendar = (props) => {
    // const date = [
    //     {title: "ส่งมคอ.3",date:"2021-03-26 18:00:00"}
    // ]

    // const [findDate, setfindDate] = useState({})
    
    // useEffect(() => {
    //     const formatDate = moment(props.date).format('YYYY-MM-DD HH:mm:ss')
    //     setfindDate(date.find(x => x.date.slice(0,10) == formatDate.slice(0,10)))
    // }, [])


    return (
        <div>
            {/* {findDate?.title||""} */}
            {props.event.title}
        </div>
    )
}

export default ModalCalendar
