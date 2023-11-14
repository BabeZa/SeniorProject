import React,{useState, useContext, useEffect} from 'react';
import { useTranslation } from 'react-i18next';
import { toast} from "react-toastify";
import file from '../../assert/icon/file.svg'
import { useOutside } from '../../components/Outside'
import PostgreAPI from "../../apis/PostgreAPI";
import { useHistory } from 'react-router-dom';
import { AuthContext, ProfileContext, SelectContext } from "../../context/index";
import moment from 'moment';
import Modal from 'react-modal';
import cancel from './../../assert/icon/cancel.svg'
import Select from 'react-select'
import ProfessorHead from '../Professor/ProfessorHead' 

const typeSelectDataTH = [
    {value: "tqf3",label: "แผนการสอน"},
    // {value: "tqf5",label: "การสรุปและรวบรวมข้อเสนอแนะ", isDisabled: true },
    {value: "sar",label: "รายงานการประเมินตนเอง" }
];
const typeSelectDataEN = [
    {value: "tqf3",label: "Lesson plan"},
    // {value: "tqf5",label: "Summarizing and collecting recommendations", isDisabled: true },
    {value: "sar",label: "Self-assessment report"}
];

export default function CreateDoc() {

    const { t } = useTranslation();
    const history = useHistory();
    const { isSelect, setIsSelect, ref } = useOutside(false)
    const { profile } = useContext(ProfileContext);

    const { modalIsOpenCreateDoc, setModalIsOpenCreateDoc } = useContext(SelectContext);
    const [ docName, setDocName] = useState("")


    const [ tqf2SelectData, setTqf2SelectData ] = useState({});
    const [ tqf2Select, setTqf2Select ] = useState({});
    const [ loadedTqf2Select, setLoadedTqf2Select] = useState(false);

    const [ tqf2CourseSelectData, setTqf2CourseSelectData ] = useState({});
    const [ tqf2CourseSelect, setTqf2CourseSelect ] = useState({});

    const [ typeSelectData, setTypeSelectData ] = useState({});
    const [ typeSelect, setTypeSelect ] = useState({});
    const [ typeSelectV, setTypeSelectV ] = useState("0");

    // ------------------------------ TQF3 -------------------------------

    const CreateTQF3 = async () => {
        try {
            const dataTQF3 ={
                code: "CPE000",
                thainame: "",
                engname: "Doc",
                credit: "",
                tqf2program_id: tqf2Select.value,
                tqf2course_id: tqf2CourseSelect.value,
                Professor: [{employee_id:profile.id}],
                termyear_code: "2/2020",
                pre_requisites_st: "",
                pre_requisites_nd: "",
                co_requisites: "",
                place: "",
                no_students: 0,
                createdate: moment().format("DD MMMM YYYY HH:mm:ss"),
                updatedate: moment().format("DD MMMM YYYY HH:mm:ss"),
                createby: null,
        
                outcome: "",
                objective: "",
                description: "",
                describe: "",
                additionteach: "",
                activelearn: "",
                selflearn: "",
                consulthour: "",
                moraldev: "",
                moralteach: "",
                moralevaluation: "",
                knowledgeget: "",
                knowledgeteach: "",
                knowledgetvaluation: "",
                intellecdev: "",
                intellecteach: "",
                intellectevaluation: "",
                analydev: "",
                analyteach: "",
                analyevaluation: "",
                rangeoutcome: "",
                rangeteach: "",
                rangeevaluation: "",
                Teachplan:[{
                    week:0,
                    title:"",
                    hour:0,
                    activity:"",
                    professorweek:""
                }],
                Evaluationplan:[{
                    evaactivity: 0,
                    evaoutcome: "",
                    howeva: "",
                    evaweek: "",
                    evaratio: ""
                }],
                book: "",
                doc: "",
                addodc: "",
                effect: "",
                evaluation: "",
                improve: "",
                exam: "",
                opeartion: "",
                documentstatus_code: "DRAFT"
            };

            if(tqf2CourseSelect.value !== ""){
                await PostgreAPI.get("/tqf2/gettqf2course/"+tqf2CourseSelect.value)
                  .then((res) => {
                    // console.log("[ProfessorHome/Create.js] gettqf2course: ",res.data);
                    dataTQF3.code = res.data.course_code
                    dataTQF3.thainame = res.data.course_thainame
                    dataTQF3.engname = res.data.course_engname
                    dataTQF3.credit = res.data.course_credit
                    dataTQF3.description = res.data.course_describtion
                    // dataTQF3.pre_requisites_st = res.data.course_prerequi
                  })
                  .catch((error) => {
                    console.error(error)
                  })
            }
            // console.log("[ProfessorHome/Create.js] gettqf2course body: ",dataTQF3);
            const res = PostgreAPI.post("/tqf3/create", dataTQF3)
            res.then(result => {
                console.log('result ',result.data.id);
                CreateDocument(result.data.id,"TQF3");
            })
        } catch (error) {
            console.error(error)
        }
    }
    const CreateDocument = async (ID,type) => {
        try {
            
            const body = {
                name : docName,
                createby : "",
                createdate : moment().format("DD MMMM YYYY HH:mm:ss"),
                documenttype_code : type,
                documentstatus_code: "DRAFT",
                documentdata_id : ID,
                isactive : true,
            }

            const res = PostgreAPI.post("/document/create", body)
            res.then(result => {
                // console.log('result ',result.data.id); 
                toast.success("Create a document successfully");
                history.push('/document/tqf3/detail/'+result.data.id);
            })
        } catch (error) {
            console.log(error)
        }
    }

    // --------------------------------------------------------------------------------------------
    useEffect(() => {
        PostgreAPI.get("/forselect/tqf2/"+localStorage.getItem('i18nextLng'))
            .then((res) => {
                setTqf2SelectData(res.data);
                setLoadedTqf2Select(true)
                // console.log("[profile/Create.js] Tqf2Select:", res.data);
                setTqf2Select(res.data.find(obj => obj.value === ""));
            })
            .catch((error) => {
                console.error(error)
            });
    }, []);
    
    const handleTqf2Select = (selectedOption) => {
        setTqf2Select(selectedOption);
    }


    useEffect(() => {
        if(loadedTqf2Select && tqf2Select.value !== ""){
            PostgreAPI.get("/forselect/tqf2-course/"+tqf2Select.value+"/"+localStorage.getItem('i18nextLng'))
            .then((res) => {
                setTqf2CourseSelectData(res.data);
                // console.log("[profile/Create.js] Tqf2CourseSelectData:", res.data);
                setTqf2CourseSelect(res.data.find(obj => obj.value === ""));
            })
            .catch((error) => {
                console.error(error)
            });
        }
        
    }, [loadedTqf2Select, tqf2Select.value]);
    
    const handleTqf2CourseSelect = (selectedOption) => {
        setTqf2CourseSelect(selectedOption);
    }
    // --------------------------------------------------------------------------------------------

    useEffect(() => {
        if(localStorage.getItem('i18nextLng') == "th"){
            setTypeSelectData(typeSelectDataTH);
        }else{
            setTypeSelectData(typeSelectDataEN);
        }
        
    }, [localStorage.getItem('i18nextLng')]);

    const handleTypeSelect = (selectedOption) => {
        setTypeSelect(selectedOption);
    }

    const handleTypeSelectV = () =>{
        setTypeSelectV(typeSelect.value)
        console.log("typeSelect.value :",typeSelect.value);
    }
return (
    <>
        <div className="modal-createdoc-container">
            <div className="modal-cancel">
                <img src={ cancel } onClick={() => setModalIsOpenCreateDoc(false)} className="modal-cancel-icon cancel-icon-rotate" />
            </div>

            {typeSelectV === "0" ? <>
                <div className="modal-header">
                    <h1>สร้างไฟล์เอกสาร</h1>
                </div>
                <div className="modal-createdoc-input-container">
                    <Select  className="modal-createdoc-select c MySelect2" options={typeSelectData} onChange={handleTypeSelect} menuPortalTarget={document.body} /> 
                    {/* <p><pre>{JSON.stringify(typeSelect, null, 2)}</pre></p> */}
                </div>
                <div className="modal-createdoc-btn b MyButton" onClick={handleTypeSelectV}>ต่อไป</div>
            </> : ""}


            {typeSelectV === "tqf3" ? <>
                <div className="modal-header">
                    <h1>Create TQF3</h1>
                </div>
                <div className="modal-createdoc-input-container">
                    <input className="modal-createdoc-input MyInput" type="text" onChange={(e) => setDocName(e.target.value)} placeholder={"Name of the document TQF 3"}/>
                    <div className="modal-createdoc-select-container">
                        <Select  className="modal-createdoc-select MySelect2" options={tqf2SelectData} value={tqf2Select} onChange={handleTqf2Select} menuPortalTarget={document.body} maxMenuHeight={220} /> 
                        {tqf2Select.value !== '' && 
                        <Select className="modal-createdoc-select b MySelect2" options={tqf2CourseSelectData} value={tqf2CourseSelect} onChange={handleTqf2CourseSelect}  menuPortalTarget={document.body} maxMenuHeight={220}/>}
                    </div>
                </div>

                <div className="modal-createdoc-btn a MyButton" onClick={() => setTypeSelectV("0")}>Back</div>
                <div className="modal-createdoc-btn b MyButton" onClick={CreateTQF3}>Create</div>
            </> : ""}
        </div> 
    
    

    
    </>
)
}
