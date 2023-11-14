import React, {useState, useEffect, useContext } from 'react';
import Card from './Card';
import Bar from './003bar';
import Head from '../../components/Head';
import PostgreAPI from '../../apis/PostgreAPI';
import { useTranslation } from 'react-i18next';
import { SelectContext } from '../../context/index'


export default function PersonnelContent(props) {

    const { t } = useTranslation();
    const  [professor, setProfessor] = useState([]);
    const { select1, setSelect1 } = useContext(SelectContext);

    const [ isSetInit, setIsSetInit ] = useState(false);
    useEffect(() => {   setSelect1({type: "", type2: "", search:""});setIsSetInit(true);}, [])

    const fetchAllProfessor = async () =>{
      try{
          const res = await PostgreAPI.post('/employee/allfilter', select1)
          setProfessor(res.data);
          console.log('[ProfessorsRouter.js] employee',res.data ,"select1: ",select1);    
      }catch(err){
          console.log(err)
      }
    }
    useEffect(() => {
        if(isSetInit){
            fetchAllProfessor();
        } 
        
        
    }, [select1])
    
return (
    <>
    <Head title={t('personnel.title')}/>
    <Bar />
    <div className="listall-content">
        <h1>{t('personnel.allpersonnel')}</h1>
        <hr className="listall-content-line"/>
        <div className="card-container">
        <div className="card-wrapper">
            {professor.map((item) =>(
            <Card id={item.id} name={localStorage.getItem('i18nextLng') == "th" ? item.thainame : item.engname} photo={item.photo}/>
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
