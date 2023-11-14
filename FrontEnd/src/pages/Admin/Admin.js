import React, {useEffect, useState,useContext} from 'react';
import { Link  } from 'react-router-dom';
import MongoAPI from "../../apis/MongoAPI";
import {MongoURL} from "../../apis/MongoAPI";
import PostgreAPI from "../../apis/PostgreAPI";
import {PostgreURL} from "../../apis/PostgreAPI";
// import {  HostAuthContext } from "../../context/index";
import AuthService from "../../services/auth.service";
import UserService from "../../services/user.service";
import { useHistory } from 'react-router-dom';

export default function Admin() {
    const [ dataM, setDataM] = useState({})
    const [ dataP, setDataP] = useState({})
    const [ currentUser, setCurrentUser] = useState()
    const [ userReady, setUserReady] = useState(false)
    const history = useHistory();

    const fetchServer = async () =>{
        try{
            const res = await MongoAPI.get("/")
            setDataM(res.data)

            // const res2 = await fetch(hostP, {
            //     method: "GET",
            //     headers: {
            //         "Content-type": "application/json"
            //     }
            //   });
            // const parseData = await res2.json();
            // setDataP(parseData.data)
            // const res2 = await PostgreAPI.get("/")
            // setDataP(res2.data)
                
        }catch(err){
             console.log(err)
        }
    }

    useEffect(()=>{
        
        setCurrentUser(AuthService.getCurrentUser());
        if (!currentUser) {setUserReady(true)}

        // console.log("[Admin.js] isAdmin: ",UserService.isAdmin());
        UserService.isAdmin().then(
            response => {
                // console.log("admin:: 1111");
            },
            error => {
                //.. history.push("/");
                // console.log("admin:: 0000");
            }
        );
          
        fetchServer();
    }, [])

    return (
        <>  
            <div>
                <Link to='/admin/temp1' >TEMP1</Link>
                <Link to='/admin/temp2' >TEMP2</Link>
            </div>
            <div>
                <div>
                    <h1>MongoDB</h1>
                    <p>HostM: <a href={MongoURL} target="_blank">{MongoURL}</a></p>
                    <p>Port: {dataM.port}</p>
                    <p>Host: {dataM.dbhost}</p>
                    <p>Dir: {dataM.basedir}</p>
                </div>
                <div>
                    <h1>PostgreURL</h1>
                    {/* <p>Host : {host}</p> */}
                    <p>HostP: <a href={PostgreURL} target="_blank">{PostgreURL}</a></p>
                    <p>Port: {dataP.port}</p>
                    {/* <p>Host: {dataP.dbhost+":"+dataP.dbport}</p>
                    <p>DB name:{dataP.dbname}</p>
                    <p>Dir: {dataP.basedir}</p> */}
                </div>
                {userReady && <div>
                    <h1>Profile</h1>
                    <p>Token :  
                        {currentUser.accessToken.substring(0, 20)} ...{" "}
                        {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}</p>
                    <p>Id: {currentUser.id}</p>
                    <p>Name: {currentUser.name}</p>
                    <p>Authorities:</p> 
                    <ul>
                        {currentUser.roles && currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
                    </ul>
                </div>}
                
            </div>
            
        </>
)}
    

