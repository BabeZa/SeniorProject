import React,{useState,useContext, useEffect} from 'react';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import moment from 'moment';
import { ProfileContext } from "../../context/index";
import Bar from './002bar';
import './Professor.css'



export default function ProfessorHead() {

    const { t } = useTranslation();
    const { profile} = useContext(ProfileContext);

    return (
        
        <>
        <div className="Head">
            <div className="Head-professorhome-content">
                <div className="Head-name">
                    <h6>{t('professorhome.welcome')}</h6>
                    <h1>{i18next.languages[0] === 'th' ? profile.thainame : profile.engname}</h1>
                </div>
                <div className="Head-noti">
                    <Bar title={"เอกสารมคอ.3"} date={"2021-03-30"}/>
                </div>
            </div>
        </div>
        </>
    )
}
