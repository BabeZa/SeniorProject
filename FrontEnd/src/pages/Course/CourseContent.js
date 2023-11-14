import React, {useState, useEffect, useContext } from 'react';
import IMG from '../../assert/image/img-course.png'
import Card from './Card';
import Bar from './004bar';
import Head from '../../components/Head';
import PostgreAPI from '../../apis/PostgreAPI';
import { useTranslation } from 'react-i18next';
import { SelectContext } from '../../context/index'


export default function CourseContent(props) {

    const { t } = useTranslation();
    const  [course, setCourse] = useState([]);
    const { select1, setSelect1 } = useContext(SelectContext);

    const [ isSetInit, setIsSetInit ] = useState(false);
    useEffect(() => {   setSelect1({type: "", type2: "", search:""});setIsSetInit(true);}, [])

    const fetchAllCourse = async () =>{
      try{
          const res = await PostgreAPI.post('/tqf3/course-allfilter', select1)
          setCourse(res.data);
          console.log('[CourseContent.js] Course',res.data ,"select1: ",select1);    
      }catch(err){
          console.log(err)
      }
    }

    useEffect(() => {
        if(isSetInit){
            fetchAllCourse();
        }
    }, [select1])
    
    
return (
    <>
    <Head title={t('course.title')}/>
    <Bar />
    <div className="listall-content">
        <h1>ALL Course</h1>
        <hr className="listall-content-line"/>
        <div className="card-container">
        <div className="card-wrapper">
            {course.map((item) =>(
                <Card id={item.id} code={item.code} name={localStorage.getItem('i18nextLng') == "th" ? item.thainame : item.engname} year={"0"} pre={item.pre_requisites_st} professor={item.Professor} assistant={item.Assistant} photo={IMG}/>
            ))} 
            {/* <Card id={"item.id"} code={"CPE000"} name={'item.thainameawdwdaw'} year={"3"} pre={"-"} professor={"fwefwefw"} photo={IMG}/> */}
            <div className='card-null' />
            <div className='card-null' />
            <div className='card-null' />
            <div className='card-null' />
        </div>
        </div>
        <div>
        </div>
    </div>
    </>
)
}
