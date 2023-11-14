import React,{useState, useContext, useEffect} from 'react';
import '../../components/Head.css'
import './Professor.css'
import note from '../../assert/icon/note.svg'
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import file from '../../assert/icon/file.svg'
import uploadfile from '../../assert/icon/uploadfile.svg'
import { toast} from "react-toastify";
import { AuthContext, ProfileContext } from "../../context/index";
import MyCalendar from './MyCalendar';
import { useHistory } from 'react-router-dom';
import PostgreAPI from "../../apis/PostgreAPI";
import ProfessorHead from './ProfessorHead';



export default function Professor() {

    const { t } = useTranslation();
    const history = useHistory();

    const { profile, setProfile} = useContext(ProfileContext);
    const { isAuthenticated, loading } = useContext(AuthContext);

    useEffect(() => {
    if(loading){
      if(isAuthenticated){
      PostgreAPI.get("/employee/getprofile").then((res) => {
        console.log("[ProfessorHome.js] Data: ",res.data);
        setProfile(res.data);
      })
      .catch((error) => {
        console.error(error)
      })
    }else{
      history.push('/');
    }
    }
      
  }, [loading, isAuthenticated]);
    
return (
    <>
    <ProfessorHead/>
    <div className="professorhome-container">
        <div className="professorhome-content">
            <div className="professorhome-calendar">
              <MyCalendar date={"2021-03-30"}/>
                
            </div>
            
            <div className="professorhome-createdoc">
              <div className="createdoc-main" onClick={() => history.push('/professor/createdoc')}>
                <img src={file} className="createdoc-logo"/>
                <h1 className="createdoc-head">จัดการ เอกสาร</h1>
                <div className="createdoc-footer">
                    <p>SAR / PLO / CLO / TQF /</p>
                    <p>{t('professorhome.create.subtitle2')}</p>
                </div>
              </div>
            </div>
            
            <div className="professorhome-uploaddoc">
              {/* <div className="uploaddoc-main" onClick={() => history.push('/professor/uploaddoc')}> */}
              <div className="uploaddoc-main" onClick={() => history.push('/professor/uploaddoc')}>
                  <img src={uploadfile} className="uploaddoc-logo"/>
                  <h1 className="uploaddoc-head">{t('professorhome.upload.title')}</h1>
                  <div className="uploaddoc-footer">
                      <p>SAR / PLO / CLO / TQF /</p>
                      <p>{t('professorhome.upload.subtitle2')}</p>
                  </div>
              </div>
            </div>
              
            <div className="professorhome-note">
              <div className="professorhome-note-main" onClick={() => history.push('/professor/weeksnote')}>
                <img src={note} className="note-logo"/>
                <h1 className="note-head">{t('professorhome.note')}</h1>  
              </div>
              
            </div>
            {/* <div className="professorhome-item1">
              <div className="professorhome-item1-in">
                <p>{t('professorhome.suggestion')}</p>
                <p>{t('professorhome.suggestion2')}</p>
              </div>
                
            </div>
            <div className="professorhome-item2">
                
            </div> */}
        </div>
    </div>
    
    </>
)
}
