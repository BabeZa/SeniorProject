import React, {useState, useEffect, useContext } from 'react';
import Card from './Card';
import Bar from './005bar';
import Head from '../../components/Head';
import PostgreAPI from '../../apis/PostgreAPI';
import { useTranslation } from 'react-i18next';
import { SelectContext } from '../../context/index'


export default function Curriculum(props) {

    const { t } = useTranslation();
    const  [curriculum, setCurriculum] = useState([]);
    const { select1, setSelect1 } = useContext(SelectContext);

    const [ isSetInit, setIsSetInit ] = useState(false);
    useEffect(() => {   setSelect1({type: "", type2: "", search:""});setIsSetInit(true);}, [])

    const fetchAllCurriculum = async () =>{
      try{
          const res = await PostgreAPI.post('/tqf2/allfilter', select1)
          setCurriculum(res.data);
          console.log('[Curriculum.js] tqf2:',res.data ,"select1: ",select1);    
      }catch(err){
          console.log(err)
      }
    }
    useEffect(() => {    
        if(isSetInit){
            fetchAllCurriculum();
        }
        
        
    }, [select1])
    
return (
    <>
    <Head title="หลักสูตรทั้งหมด"/>
    <Bar />
    <div className="listall-content">
        <h1>หลักสูตรทั้งหมด</h1>
        <hr className="listall-content-line"/>
        <div className="card-container">
        <div className="card-wrapper">
            {curriculum.map((item) =>(
                <Card 
                    id={item.id} 
                    name={localStorage.getItem('i18nextLng') == "th" ? item.program_thainame : item.program_engname} 
                    file_id={item.file_id} 
                    degrees={item.degrees}
                    type={localStorage.getItem('i18nextLng') == "th" ? item.program_type_th : item.program_type_en} 
                    link={item.link}
                />
            ))}
            
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
