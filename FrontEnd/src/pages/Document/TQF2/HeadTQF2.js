import React,{useState, useContext, useEffect} from 'react';
import { TQF2Context } from '../../../context/index'
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { toast } from "react-toastify";
import i18next from 'i18next';
import PostgreAPI from "../../../apis/PostgreAPI";




export default function HeadTQF2() {

    const { t } = useTranslation();
    const { documentData, setDocumentData, canEdit, isEdit } = useContext(TQF2Context);

    const handleChangeTitle = (e) => {
        e.preventDefault();
        const value = e.target.value;
        setDocumentData({...documentData,[e.target.name]:value})
        // console.log(e.target.value)
    }

    
    return (
        <>
        
        <div className={isEdit ? "Head-content none" : "Head-content"}>
            {/* <div className="Head-edit-container">
                    {canEdit &&<img src={ edit } onClick={() => setIsEdit(true)} className="tqf-head-edit" />}
            </div> */}
            <div className="Head-input">
                <input readOnly="readOnly" className="title-name" type="text"  value={documentData.name} onChange={ handleChangeTitle } />
            </div>
        </div>
    

        {/* ----------------------------------------------------------------------------------------- */}

        <div className={isEdit ? "Head-content" : "Head-content none"}>
            {/* <div className="Head-edit-container">
                    <img src={ cancel2 } onClick={() => setIsEdit(false)} className="tqf-head-edit" />
            </div> */}
            <div className="Head-input">
                <input className="title-name" type="text"  value={documentData.name} onChange={ handleChangeTitle } name='name' placeholder={t('tqf.head.name')}/>
            </div>
            {/* <div className="Head-footer">
                <button className="chapter-footer-button" onClick={saveDocument}>{t('btn.save')}</button>
            </div> */}
        </div>
        </>
    )
}
