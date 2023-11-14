import React,{useState, useContext, useEffect} from 'react';
import { useTranslation } from 'react-i18next';
import { toast} from "react-toastify";
import PostgreAPI from "../../apis/PostgreAPI";
import { useHistory } from 'react-router-dom';
import { AuthContext, ProfileContext, SelectContext } from "../../context/index";
import Modal from 'react-modal';
import ProfessorHead from '../Professor/ProfessorHead' 
import Bar from '../Document/000bar';
import Card from '../Document/Card';
import CreateDoc from './CreateDoc';
import UserService from "../../services/user.service";

export default function Create() {

    const { t } = useTranslation();
    const history = useHistory();
    const { profile, setProfile } = useContext(ProfileContext);
    const { isAuthenticated, loading } = useContext(AuthContext);

    const { modalIsOpenCreateDoc, setModalIsOpenCreateDoc } = useContext(SelectContext);

    const [document, setDocument] = useState([]);
    const { select1, setSelect1 } = useContext(SelectContext);
    const [ isLeader, setIsLeader ] = useState(false);

    const [ isSetInit, setIsSetInit ] = useState(false);
    useEffect(() => {   setSelect1({type: "", type2: "", search:""});setIsSetInit(true);}, [])
    // --------------------------------------------------------------------------------------------

    

    useEffect(() => {
        // if (loading && profile.successful) {
        if (loading) {
          if (isAuthenticated) {
            PostgreAPI.get("/employee/getprofile")
              .then((res) => {
                console.log("[WeekSNote.js] Data: ", res.data);
                setProfile(res.data);
              })
              .catch((error) => {
                console.error(error)
              })
            // fetchweeksnote("YrA5waEubMpc2S9wxOkVOwGFtbpCPt");
          } else {
            history.push('/');
          }
        }
        setSelect1({ type: "",type2: "self",search:"" })
        UserService.isProfessorLeader().then(
          response => {
              // console.log("[DocumentContent.js] isProfessoOrAdmin: 1");
              setIsLeader(true);
          },
          error => {
              // console.log("[DocumentContent.js] isProfessoOrAdmin: 0");
          }
        );
      }, [loading, isAuthenticated]);


    useEffect(() => {
        console.log("[CreateAndUploadDoc/Create.js] profile.id: ",profile.id);
        if(isSetInit){
          PostgreAPI.post('/document/profilter', select1) 
          .then((res) => {
              console.log("[CreateAndUploadDoc/Create.js] document: ",res.data);
              setDocument(res.data);
            })
            .catch((error) => {
              console.error("[CreateAndUploadDoc/Create.js] error:",error)
            })
        }
        
    }, [select1,profile.id])
    
    return (
        <>
        <Modal
            isOpen={modalIsOpenCreateDoc}
            onRequestClose={() => setModalIsOpenCreateDoc(false)}
            style={{
                overlay:{
                    backgroundColor: 'rgba(0, 0, 0, 0.5)'
                },
                content : {
                    top                   : '50%',
                    left                  : '50%',
                    right                 : 'auto',
                    bottom                : 'auto',
                    marginRight           : '-50%',
                    transform             : 'translate(-50%, -50%)',
                    borderRadius         : '60px'
                    }
            }}
        >  
            <CreateDoc/>
        </Modal>

        <ProfessorHead/>
        <Bar />

        <div className="listall-content">
            <h1>ไฟล์เอกสารที่สร้าง</h1>
            <hr className="listall-content-line"/>
            <div>
              <button className={select1.type2 === "self" ? "MyButton3 active" : "MyButton3 "}
                onClick={() => setSelect1({ ...select1, type2: "self" })}
              >เอกสารตนเอง</button>
              <button className={select1.type2 === "assistant" ? "MyButton3 active" : "MyButton3 "}
                onClick={() => setSelect1({ ...select1, type2: "assistant" })}
              >เอกสารอาจารย์ผู้สอนร่วม</button>
              {isLeader && <button className={select1.type2 === "leader" ? "MyButton3 active" : "MyButton3 "}
                onClick={() => setSelect1({ ...select1, type2: "leader" })}
              >เอกสารสำหรับผู้รับผิดชอบหลักสูตร</button>}
            </div>
            <div className="card-container">
            <div className="card-wrapper">
                <div className='card-add card-hover1' onClick={() => setModalIsOpenCreateDoc(true)}> <i className="fas fa-plus "/></div>
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
