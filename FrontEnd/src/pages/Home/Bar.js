import React,{useState, useContext, useEffect} from 'react';
import { useTranslation } from 'react-i18next';
import PostgreAPI from "../../apis/PostgreAPI";
import { useHistory } from 'react-router-dom';
import { HostAuthContext} from "../../context/index";
import moment from 'moment';
import "./Home.css";
import Curriculum from '../../assert/icon/Curriculum.svg';
import Professor from '../../assert/icon/Professor.svg';
import Student from '../../assert/icon/Student.svg';


export default function Bar() {

    const { t } = useTranslation();
    const history = useHistory();
    

    
return (
    <>
        <div className="home-bar-container">
            <div className="home-bar-item a">
                <img src={Curriculum} className="home-bar-icon"/>
                <p className="home-bar-text1">{t('home.curriculum')}</p>
                <p className="home-bar-text2">3 {t('home.curriculum2')}</p>
            </div>
            <div className="home-bar-item b">
                <img src={Professor} className="home-bar-icon"/>
                <p className="home-bar-text1">{t('home.professor')}</p>
                <p className="home-bar-text2">29 {t('home.professor2')}</p>
            </div>
            <div className="home-bar-item c">
                <img src={Student} className="home-bar-icon"/>
                <p className="home-bar-text1">{t('home.student')}</p>
                <p className="home-bar-text2">0 {t('home.student2')}</p>
            </div>
        </div>
    </>
)
}
