import React from 'react';
import { Link } from 'react-router-dom';
import './Card.css';
import ImgCourse from '../../assert/image/img-course.png'
import { useHistory } from 'react-router-dom';

function Card(props) {
  const history = useHistory();

  const gogo = (e,ID) => {
    e.preventDefault()
    // console.log("[Course/Card.js] e:",e.target.tagName.toLowerCase());
    if(e.target.tagName.toLowerCase() === 'a'){
      // console.log("[Course/Card.js] e:",e.target.href);
      window.open(e.target.href,'_blank');
    }else{
      history.push('/course/detail/'+ID);
    }
  }

  return (
    <>
      <div className='course-cards-item card-hover1' onClick={(e) => gogo(e,props.id)}>
         
        <div className="course-cards-photo">
          <div className="course-cards-head">
            <h2>{props.code}<br/>{props.name}</h2>
          </div>
          <img src={props.photo === null ? ImgCourse : props.photo}/>
        </div>
        <div className="course-cards-text">
          {props.pre && <h3>วิชาพื้นฐาน : {props.pre}</h3>}
          {/* <h3>อาจารย์ผู้สอน : <a onClick={() => gogo(props.professor.employee_id)}>{localStorage.getItem('i18nextLng') == "th" ? props.professor.thainame : props.professor.engname}</a></h3> */}
          <h3>อาจารย์ผู้สอน : <a href={"personnel/detail/"+props.professor.employee_id}>{localStorage.getItem('i18nextLng') == "th" ? props.professor.thainame : props.professor.engname}</a></h3>
          {/* <h3>ชั้นปีสำหรับนักศึกษา : {props.year}</h3> */}
          {props.assistant.length > 0 &&
            <h3>อาจารย์ผู้ช่วยสอน :
              {props.assistant.map((item,i) => 
                i == props.assistant.length-1 ? 
                <a href={"personnel/detail/"+item.employee_id}> {localStorage.getItem('i18nextLng') == "th" ? item.thainame : item.engname} </a>:
                <a href={"personnel/detail/"+item.employee_id}> {localStorage.getItem('i18nextLng') == "th" ? item.thainame : item.engname}, </a>
              )}
            </h3>
          }
          
        </div>
          
        {/* <Link className='course-cards-item-button' to={'/course/detail/'+props.id}>เพิ่มเติม</Link> */}
      </div>
    </>
  );
}

export default Card;