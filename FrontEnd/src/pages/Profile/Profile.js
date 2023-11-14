import React,{useState, useContext, useEffect} from 'react';
import '../../components/Head.css'
import './Profile.css'
import { useTranslation } from 'react-i18next';
import { toast} from "react-toastify";
import { AuthContext, ProfileContextProvider, ProfileContext } from "../../context/index";
import { useHistory } from 'react-router-dom';
import Information from './Information.js';
import Courses from './Courses';
import DocCreate from './DocCreate';
import PostgreAPI from "../../apis/PostgreAPI";
import HeadProfile from './HeadProfile'


function MyProfile() {

    const { t } = useTranslation();
    const history = useHistory();
    
    const { isAuthenticated, loading } = useContext(AuthContext);
    const { profile, setProfile, setCanEdit  } = useContext(ProfileContext);

    // const getProfile = async () => {
    //     try {
          
    //       const res = await fetch(host+"/professor/get/"+uid, {
    //         method: "GET",
    //         headers: {
    //             "Content-type": "application/json"
    //         }
    //       });
    //       const parseData = await res.json();

    //     //   console.log("User data", parseData2);
    //       console.log(parseData);
    //       setProfessor(parseData)



    //     //   setData(parseData);
    //     } catch (err) {
    //       console.error(err.message);
    //     }
    //   };
    

    useEffect(() => {
        // console.log("isAuthenticated "+ isAuthenticated);
      if(loading){
        if(isAuthenticated){
        PostgreAPI.get("/employee/getprofile").then((res) => {
          console.log("[Profile.js] Profile: ",res.data);
          setProfile(res.data);
          setCanEdit(res.data.canedit);
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
      <HeadProfile/>
      <div className="container-center">
        <div className="profile-content">
          <Information/>
          {/* <Courses/> */}
          <DocCreate/>
        </div>
      </div>
      
      </>
  )
}


const Profile = () => (
      <MyProfile/>
 
)

export default Profile