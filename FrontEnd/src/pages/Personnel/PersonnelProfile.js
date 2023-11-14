import React,{useState, useContext, useEffect} from 'react';
import '../../components/Head.css'
import '../Profile/Profile.css'
import { useTranslation } from 'react-i18next';
import { toast} from "react-toastify";
import { AuthContext, ProfileContextProvider, ProfileContext } from "../../context/index";
import { useHistory } from 'react-router-dom';
import UserPhoto from '../../assert/image/user.png'
import Information from '../Profile/Information';
import Courses from './Courses';
import DocCreate from '../Profile/DocCreate';
import HeadProfile from '../Profile/HeadProfile'
import {PostgreURL} from "../../apis/PostgreAPI";
import PostgreAPI from "../../apis/PostgreAPI";

function MyProfile(props) {

    const { t } = useTranslation();
    const history = useHistory();
    
    const { profile, setProfile, setCanEdit } = useContext(ProfileContext);


    useEffect(() => {
      PostgreAPI.get("/employee/getpersonnel/"+props.PersonnelID)
      .then((res) => {
        console.log("[PersonnelProfile.js] Profile: ",res.data);
        setProfile(res.data);
        setCanEdit(res.data.canedit)
      })
      .catch((error) => {
        console.error(error)
      })
    }, []);
    
  return (
      <>
      <HeadProfile/>
      <div className="container-center">
        <div className="profile-content">
          <Information/>
          <Courses/>
          {/* <DocCreate/> */}
        </div>
      </div>
      
      </>
  )
}


const PersonnelProfile = (props) => (
  <ProfileContextProvider>
      <MyProfile PersonnelID={props.match.params.id}/>
  </ProfileContextProvider>
)

export default PersonnelProfile