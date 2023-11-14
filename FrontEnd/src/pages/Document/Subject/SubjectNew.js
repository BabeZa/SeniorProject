import React, {useState, useEffect } from 'react';
import Head from '../../../components/Head';
import MongoAPI from "../../../apis/MongoAPI";
import { Link } from 'react-router-dom';

import { useTranslation } from 'react-i18next';


export default function SubjectNew(props) {
    const  [data, setData] = useState({
        subject_code: "",
        subject_thainame: "",
        subject_engname: "",
        termyear: ""
    });

    const { t } = useTranslation();

    const handleChange = (e) => {
        e.preventDefault();
        const value = e.target.value;
        setData({...data,[e.target.name]:value})
        console.log(e.target.value)
    }


    const handleSumbit = (e) => {
        e.preventDefault();
        try {
            const res = MongoAPI.post("/TQF/create",
            data
            )
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }
    
return (
    <>
    <Head title={t('subjectnew.title')}/>
    <form onSubmit={handleSumbit}>
        <div>
            <input type="text" placeholder="รหัสรายวิชา" className="document-input" name="subject_code" value={data.subject_code} onChange={handleChange} />
        </div>
        <div>
            <input type="text" placeholder="ชื่อวิชาภาษาไทย" className="document-input" name="subject_thainame" value={data.subject_thainame} onChange={handleChange} />
        </div>
        <div>
            <input type="text" placeholder="ชื่อวิชาภาษาอังกฤษ" className="document-input" name="subject_engname" value={data.subject_engname} onChange={handleChange} />
        </div>
        <div>
            <input type="text" placeholder="ภาคเรียน/ปีการศึกษา" className="document-input" name="termyear" value={data.termyear} onChange={handleChange}/>
        </div>
    </form>
    </>
)
}
