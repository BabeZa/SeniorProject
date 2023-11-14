import React, { useState, useEffect, useContext } from 'react';
import Card from './Card';
import Bar from './000bar';
import Head from '../../components/Head';
import { useHistory } from 'react-router-dom';
import PostgreAPI from '../../apis/PostgreAPI';
import { useTranslation } from 'react-i18next';
import UserService from "../../services/user.service";
import { SelectContext } from '../../context/index'


export default function DocumentContent() {


    const history = useHistory();
    const  [document, setDocument] = useState([]);
    const  [canAdd, setCanAdd] = useState(false);
    const { t } = useTranslation();

    const { select1, setSelect1 } = useContext(SelectContext);

    const [ isSetInit, setIsSetInit ] = useState(false);
    useEffect(() => {   setSelect1({type: "", type2: "", search:""});setIsSetInit(true);}, [])

    useEffect(() => {
        if(isSetInit){
            PostgreAPI.post('/document/allfilter',select1)
            .then((res) => {
                console.log("[DocumentContent.js] document: ",res.data);
                setDocument(res.data);
            })
            .catch((error) => {
                console.error("[DocumentContent.js] error:",error)
            })
        }

        

        UserService.isProfessoOrAdmin().then(
            response => {
                // console.log("[DocumentContent.js] isProfessoOrAdmin: 1");
                setCanAdd(true);
            },
            error => {
                // console.log("[DocumentContent.js] isProfessoOrAdmin: 0");
            }
          );
    }, [select1])

    useEffect(() => {   setSelect1({type: "", type2: "", search:""})    }, [])
    

    const handleSumbit = (e) => {
        e.preventDefault();
        history.push('/professor'); 
    }

    
return (
    <>
    <Head title={t('document.title')}/>
    <Bar />
    <div className="listall-content">
        <h1>{t('document.subtitle.all')}</h1>
        <hr className="listall-content-line"/>
        <div className="card-container">
        <div className="card-wrapper">
            { canAdd && <div className='card-add card-hover1' onClick={handleSumbit}> <i className="fas fa-plus "/></div> }
            {document.map((item) =>(
            <Card id={item.id} name={item.name} by={item.createbyeng} date={item.createdate} color={item.color} path={item.path} dataID={item.documentdata_id}/>
            ))}

            <div className='card-doc-null' />
            <div className='card-doc-null' />
            <div className='card-doc-null' />
            <div className='card-doc-null' />
        </div>
        </div>
        <div>
        </div>
    </div>
    </>
)
}
