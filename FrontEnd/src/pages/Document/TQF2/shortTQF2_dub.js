import React, { useState, useEffect, Fragment } from 'react'
import './TQF2.css'
import MongoAPI from "../../../apis/MongoAPI";
import moment from 'moment';
import autosize from 'autosize';

const ShortTQF2 = () => {
    const [textarea, setTextarea] = useState(true);
    const [toggleindex, setToggleindex] = useState(true);
    const [data, setData] = useState({
        id: "",
        program_name: "",
        program_depart: "",
        program_year: "",
        program_code: "",
        program_thainame: "",
        program_engname: "",
        full_thai: "",
        mini_thai: "",
        full_eng: "",
        mini_eng: "",
        major: "",
        allcredit: "",
        course: [{
            course_id: "",
            index: 0,
            course_code: "",
            course_thainame: "",
            course_engname: "",
            course_credit: "",
            course_prerequi: "",
            course_describtion: "",
            course_describtionarray: [],
            course_expectlearningoutcome: [{
                course_clo_id: "",
                index: 0,
                value: ""
            }]
        }]
    })
    // const [form, setForm] = useState({
    //     input:""
    // })

    useEffect(() => {
        console.log("work")
        const fetchdata = async () => {
            try {
                const res = await MongoAPI.get("/TQF/Query")
                setData(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        // fetchdata();
    }, [])

    useEffect(() => {
        console.log("data change");
    }, [data])

    useEffect(()=>{
        // const count = data.course.length
        let list = [...data.course];
        for (const index in list)
        {
            list[index].index = parseInt(index)
        }
        setData(prevdata => {return {...prevdata, course:list}})

    },[toggleindex])

    useEffect(() => {
        console.log("autosize work")
        autosize(document.querySelectorAll('textarea'));
    }, [textarea])

    const handleInputChange = (e) => {
        e.persist();
        if(e.target.validity.valid){
            const value = e.target.value;
            setData(prevdata => { return { ...prevdata, [e.target.name]: value } })
        }
    }

    const handleCoursechange = (e, arrayname, index) => {
        if (e.target.validity.valid) {
            let list = [...data.[arrayname]];
            const value = e.target.value;
            list[index][e.target.name] = value
            setData(prevdata => { return { ...prevdata, [arrayname]: list } })
        }
    }

    const CourseAdd = (e, arrayname, subarrayname, index) => {
        e.stopPropagation();
        e.preventDefault();
        let list = [...data.[arrayname]];
        let sublist = [...data.[arrayname][0].[subarrayname]]
        const list2 = {};
        const sublist2 = {};
        for (const key in sublist[0]) {
            if(key == "index"){
                sublist2[key] = 0
            }else{
                sublist2[key] = ''
            }
        }
        const sublist2Array = [];
        sublist2Array.push(sublist2)

        for (const key in list[0]) {
            if (key == subarrayname) {
                list2[key] = sublist2Array
            } else {
                list2[key] = ''
            }
        }
        list.splice(index + 1, 0, list2);
        setData(prevdata => { return { ...prevdata, [arrayname]: list } })
        setTextarea(prevtextarea => !prevtextarea)
        setToggleindex(previndex => !previndex)
    }

    const CourseRemove = (e, arrayname, index) => {
        e.stopPropagation();
        e.preventDefault();
        const list = [...data.[arrayname]];
        list.splice(index, 1);
        setData(prevdata => { return { ...prevdata, [arrayname]: list } })
        setToggleindex(previndex => !previndex)
    }

    const handleELOchange = (e, arrayname, subarrayname, index, index2) => {
        if (e.target.validity.valid) {
            let list = [...data.[arrayname]];
            let sublist = [...data.[arrayname][index].[subarrayname]]
            const value = e.target.value;
            sublist[index2][e.target.name] = value
            list[index][subarrayname] = sublist
            setData((prevdata => { return { ...prevdata, [arrayname]: list } }))
        }
    }

    const handleELOadd = (e, arrayname, subarrayname, index, index2) => {
        e.stopPropagation();
        let list = [...data.[arrayname]];
        let sublist = [...data.[arrayname][index].[subarrayname]]
        const sublist2 = {};
        for (const key in sublist[0]) {
            if(key == "index"){
                sublist2[key] = index2+1
            }else{
                sublist2[key] = ''
            }
        }
        sublist = [...sublist, sublist2]
        list[index][subarrayname] = sublist
        setData(prevdata => { return { ...prevdata, [arrayname]: list } })
        setTextarea(prevtextarea => !prevtextarea)
    }

    const handleELOremove = (e, arrayname, subarrayname, index, index2) => {
        e.stopPropagation();
        let list = [...data.[arrayname]];
        let sublist = [...data.[arrayname][index].[subarrayname]]
        sublist.splice(index2, 1);
        list[index][subarrayname] = sublist
        setData(prevdata => { return { ...prevdata, [arrayname]: list } })
    }

    const splitstring = (e, arrayname, index) => {
        e.stopPropagation();
        // let regex =/\n|และ|หรือ|เป็นต้น|เช่น/g
        let list = [...data.[arrayname]];
        let string = e.target.value.trim().replace(/\n/g, "").split(/\s+/g);
        list[index]["course_describtionarray"] = string
        setData(prevdata => { return { ...prevdata, [arrayname]: list } })
    }

    const Tabhandle = (e) => {
        if (e.key === 'Tab' && !e.shiftKey) {
            document.execCommand('insertText', false, "\t");
            e.preventDefault();
            return false;
        };
    }

    const handleSumbit = (e) => {
        e.preventDefault();
        console.log("work");
        try {
            const res = MongoAPI.post("shortTQF2/create",
                data
            )
        } catch (error) {
            console.log(error)
        }
    }

    // const normalizecredit = (value,prevdata) => {
    //     if(!value) return value;    
    //     const currentvalue = value.replace(/[^\d]/g,'')
    //     const cvlength = currentvalue.length;
    //     if(!prevdata||value.length > prevdata.length){
    //         if(cvlength < 2) return currentvalue;
    //         else if(cvlength == 2) return `${currentvalue.slice(0,1)} (${currentvalue.slice(1)}`;
    //         else if(cvlength == 3) return `${currentvalue.slice(0,1)} (${currentvalue.slice(1,2)}-${currentvalue.slice(2)}`;
    //         else if(cvlength == 4) return `${currentvalue.slice(0,1)} (${currentvalue.slice(1,2)}-${currentvalue.slice(2,3)}-${currentvalue.slice(3)})`;
    //         else return prevdata
    //     }
    // }

    return (
        <div>
            <div className="container clearfix pl-5">
                <div className="text-center">
                    <h1>รวบรวมข้อมูล</h1>
                </div>
                <br />
                <form onSubmit={(e) => handleSumbit(e)}>
                <div className="form-group">
                        <h2>1. รหัสและชื่อรายหลักสูตร</h2>
                        <div>
                            <input type="text" placeholder="รหัสหลักสูตร" className="first" name="program_code" value={data.program_code || ""} onChange={handleInputChange} />
                        </div>
                        <div>
                            <input type="text" placeholder="ชื่อหลักสูตรภาษาไทย" pattern="[\u0E00-\u0E7F ()]*" className="first" name="program_thainame" value={data.program_thainame || ""} onChange={handleInputChange} />
                        </div>
                        <div>
                            <input type="text" placeholder="ชื่อหลักสูตรภาษาอังกฤษ" pattern="[a-zA-Z ()]*" className="first" name="program_engname" value={data.program_engname || ""} onChange={handleInputChange} />
                        </div>
                    </div>
                    <div className="form-group">
                        <h2>2. ชื่อปริญญาและสาขาวิชา</h2>
                        <h3>ภาษาไทย</h3>
                        <div>
                            <input type="text" placeholder="ชื่อเต็ม" pattern="[\u0E00-\u0E7F ()]*" className="first" name="full_thai" value={data.full_thai || ""} onChange={handleInputChange} />
                        </div>
                        <div>
                            <input type="text" placeholder="ชื่อย่อ" pattern="[\u0E00-\u0E7F ().]*" className="first" name="mini_thai" value={data.mini_thai || ""} onChange={handleInputChange} />
                        </div>
                        <h3>ภาษาอังกฤษ</h3>
                        <div>
                            <input type="text" placeholder="ชื่อเต็ม" pattern="[a-zA-Z ()]*" className="first" name="full_eng" value={data.full_eng || ""} onChange={handleInputChange} />
                        </div>
                        <div>
                            <input type="text" placeholder="ชื่อย่อ" pattern="[a-zA-Z ().]*" className="first" name="mini_eng" value={data.mini_eng || ""} onChange={handleInputChange} />
                        </div>
                    </div>
                    <div className="form-group">
                        <h2>3. วิชาเอก</h2>
                        <div>
                            <input type="text" placeholder="วิชาเอก" className="first" name="major" value={data.major || ""} onChange={handleInputChange} />
                        </div>
                    </div>
                    <div className="form-group">
                        <h2>4. จำนวนหน่วยกิต</h2>
                        <div>
                            <input type="text" placeholder="จำนวนหน่วยกิต" pattern="[0-9]*" className="first" name="allcredit" value={data.allcredit || ""} onChange={handleInputChange} />
                        </div>
                    </div>
                    {data.course.map((el, index) => {
                        return (
                            <div className="form-group" key={index}>
                                <h2>วิชาที่ {index + 1}</h2>
                                <div className="row justify-content-start">
                                    <div className="col-lg-2">
                                        <input style={{ width: "100%" }} type="text" placeholder="รหัสวิชา" name="course_code" value={el.course_code || ""} onChange={(e) => handleCoursechange(e, "course", index)} />
                                    </div>
                                    <div className="col-lg-6">
                                        <input style={{ width: "100%" }} className="mb-2" type="text"  placeholder="ชื่อภาษาไทย" pattern="[\u0E00-\u0E7F ()]*" name="course_thainame" value={el.course_thainame || ""} onChange={(e) => handleCoursechange(e, "course", index)} />
                                        <input style={{ width: "100%" }} type="text" placeholder="ชื่อภาษาอังกฤษ" pattern="[a-zA-Z ()]*" name="course_engname" value={el.course_engname || ""} onChange={(e) => handleCoursechange(e, "course", index)} />
                                        <input style={{ width: "100%" }} type="text" placeholder="วิชาบังคับก่อน" name="course_prerequi" value={el.course_prerequi || ""} onChange={(e) => handleCoursechange(e, "course", index)} />
                                    </div>
                                    <div className="col-lg-2">
                                        <input style={{ width: "100%" }} type="text" placeholder="หน่วยกิต" name="course_credit" value={el.course_credit || ""} onChange={(e) => handleCoursechange(e, "course", index)} />
                                    </div>
                                </div>
                                <br />
                                <div className="row">
                                    <div className="col-lg-10">
                                        <textarea style={{ width: "100%" }} placeholder="คำอธิบายรายวิชา" name="course_describtion" value={el.course_describtion} onChange={(e) => handleCoursechange(e, "course", index)} onBlur={(e) => splitstring(e, "course", index)} onKeyDown={(e) => Tabhandle(e)} />
                                    </div>
                                </div>
                                <br />
                                <div>
                                    <h3>ผลการเรียนรู้</h3>
                                    {el.course_expectlearningoutcome.map((el2, index2) => {
                                        return (
                                            <div className="row" key={index2}>
                                                <div className="col-lg-10">
                                                    <textarea style={{ width: "100%" }} name="value" value={el2.course_expectionglearningoutcome} onChange={(e) => handleELOchange(e, "course", "course_expectlearningoutcome", index, index2)} />
                                                </div>
                                                <div className="col-lg-2 inline align-self-center">
                                                    {1 !== el.course_expectlearningoutcome.length && index2 === el.course_expectlearningoutcome.length - 1 ? <button type="submit" className="btn btn-danger mr-3" onClick={(e) => handleELOremove(e, "course", "course_expectlearningoutcome", index, index2)} >-</button> : ""}
                                                    {index2 === el.course_expectlearningoutcome.length - 1 ? <button type="submit" className="btn btn-primary" onClick={(e) => handleELOadd(e, "course", "course_expectlearningoutcome", index, index2)}>+</button> : ""}
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                                {1 !== data.course.length ? <button type="submit" className="btn btn-danger mr-3" onClick={(e) => CourseRemove(e, "course", index)} >ลด</button> : ""}
                                {1 ? <button type="submit" className="btn btn-primary" onClick={(e) => CourseAdd(e, "course", "course_expectlearningoutcome", index)}>เพิ่ม</button> : ""}
                            </div>
                        )
                    })}
                    <button type="submit" className="btn btn-primary"  >บันทึกข้อมูล</button>
                </form>
                <div style={{ marginTop: 20 }}><pre>{JSON.stringify(data, null, 2)}</pre></div>
            </div>
        </div>
    )
}

export default ShortTQF2