import React, { useState, useEffect } from 'react'
import './TQF2.css'
// import SubjectFinder from "../../apis/SubjectFinder";
import moment from 'moment';
import autosize from 'autosize';

const TQF2 = () => {
    moment.updateLocale('en', {
        months: [
            "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฏาคม",
            "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
        ]
    });
    const [click, setClick] = useState(false);
    const [data, setData] = useState(() => {
        console.log("data render")
        return ({
            program_name:"",
            program_depart:"",
            program_year:"",
            program_code: "",
            program_thainame: "",
            program_engname: "",
            full_thai: "",
            mini_thai: "",
            full_eng: "",
            mini_eng: "",
            major: "",
            allcredit: "",
            type_degree: "",
            type_year: "",
            language_use: "",
            howreceive: "",
            co_college: "",
            deegree_graduate: "",
            program: "",
            year: "",
            start_term: "",
            start_year: "",
            other: "",
            meeting: [{
                meet_time: "",
                meet_year: "",
                meet_date: ""
            }],
            readiness: "",
            graduate_job: [{
                job: ""
            }],
            program_professor: [{
                index: 1,
                name: "",
                education: "",
                graduate_year: "",
                hide: false
            }],
            location: "",
            commer_situation: "",
            social_situation: "",
            program_dev: "",
            concern_institution: "",
            service_subject: [{
                group: "",
                amount: 1,
                subjectlist: [{
                    index: 1,
                    subject_code: "",
                    subject_name: "",
                    subject_credit: ""
                }]
            }],
            open_subject: [{
                group: "",
                amount: 1,
                subjectlist: [{
                    index: 1,
                    subject_code: "",
                    subject_name: "",
                    subject_credit: ""
                }]
            }],
            management: "",
            philosophy: "",
            importance: "",
            objective: "",
            PLO: [{
                mainPLO: "",
                subPLO: [{
                    index: 1,
                    value: ""
                }]
            }],
            develop_plan: [{
                develop_planchange: "",
                strategy: "",
                evidence: ""
            }],
            system: "",
            summer_study: "",
            compare_credit: "",
            study_manage: [{
                start: "",
                end: ""
            }],
            property_student: [{
                text: ""
            }],
            problem_student: [{
                text: ""
            }],
            problem_strategy: [{
                text: ""
            }],
            recruit_plan: [{ 
                year: "",
                year1:"",
                year2:"",
                year3:"",
                year4:"",
                sum:"",
                expect_graduate: ""
            }],
            budget_plan:{
                rowdata:[{
                    title:"",
                    term:"",
                    year:""
                }],
                all:""
            }
        })
    });

    const [textarea, settextarea] = useState(true);

    useEffect(() => {
        console.log("set time work")
        setData({ ...data, UpdateDate: moment().add(543, 'year').format("DD MMMM YYYY HH:mm:ss") })
    }, [click])

    useEffect(() => {
        console.log("autosize work")
        autosize(document.querySelectorAll('textarea'));
    }, [textarea])

    // useEffect(() => {
    //     const fetchSubject = async () => {
    //         // 5f9da5bd29dffd042852d992
    //         // 5f9c4525a7edf37214b429cb
    //         try {
    //             const res = await SubjectFinder.get("/TQF/5f9c4525a7edf37214b429cb")
    //             setData(res.data);
    //             autosize.update(document.querySelectorAll('textarea'));
    //             console.log(res.data);
    //         } catch (err) {
    //             console.log(err)
    //         }
    //     }
    //     //fetchSubject();
    // }, [])

    //ใช้เปลี่ยนค่า input ปกติ
    const handleInputChange = (e) => {
        e.persist();
        if(e.target.validity.valid){
            const value = e.target.value;
            console.log("valid?",e.target.validity.valid)
            setData(prevdata => { return { ...prevdata, [e.target.name]: value } })
        }
    }

    //ใช้เปลี่ยนค่า input ที่หัวข้อไม่เหมือนกันแต่ข้อมูลที่รับเหมือนกัน
    const handleSamedataChange = (e, arrayname, index) => {
        if(e.target.validity.valid){
            let list = [...data.[arrayname]];
            const value = e.target.value;
            //ถ้า index ที่เข้ามาเป็น undeined ให้เพิ่ม list เข้าไปรองรับ index
            if (list[index] === undefined) {
                while (list.length - 1 < index) {
                    const list2 = {};
                    for (const key in list[0]) {
                        list2[key] = ''
                    }
                    list = [...list, list2]
                }
            }
            console.log("set")
            console.log("index", index)
            list[index][e.target.name] = value
            setData(prevdata => { return { ...prevdata, [arrayname]: list } })
        }
        // console.dir(e.target)
    }


    const handleSumbit = (e) => {
        e.preventDefault();
        // try {
        //     const res = SubjectFinder.post("/TQF/create",
        //         data
        //     )
        //     res.then(result => {
        //         console.log(result.data)
        //     })
        // } catch (error) {
        //     console.log(error)
        // }
    }

    //ใช้เปลี่ยนค่า input ที่ lv1
    const handleFirstInputChange = (e, arrayname, index) => {
        if(e.target.validity.valid){
            //ให้ list array ของ arrayname
            let list = [...data.[arrayname]];
            const value = e.target.value;
            //เลือก index และตัวที่จะเปลี่ยนใน dict
            list[index][e.target.name] = value
            if(list[index]["sum"] !== undefined){
                calculatecolsum(arrayname);
            }
            setData(prevdata => { return { ...prevdata, [arrayname]: list } })
        }
    }

    //ใช้เพิ่ม input ที่ lv1
    const FirstInputAdd = (e, arrayname, index) => {
        e.stopPropagation();
        let list = [...data.[arrayname]];
        const list2 = {};
        for (const key in list[0]) {
            if (key == "index") {
                list2[key] = index + 2
            } else {
                list2[key] = ''
            }
        }
        list2["hide"] = false
        list = [...list, list2]
        if (index != 0) {
            list[index]["hide"] = true
        }
        setData(prevdata => { return { ...prevdata, [arrayname]: list } })
        settextarea(prevtextarea => !prevtextarea)
    }

    //ใช้ลด input ที่ lv1
    const FirstInputRemove = (e, arrayname, index) => {
        e.stopPropagation();
        const list = [...data.[arrayname]];
        list.splice(index, 1);
        setData(prevdata => { return { ...prevdata, [arrayname]: list } })
    }
    //ใช้ลด input ที่ lv1 และมี hide
    const TableInputRemove = (e, arrayname, index) => {
        e.stopPropagation();
        const list = [...data.[arrayname]];
        list[index - 1]["hide"] = false
        list.splice(index, 1);
        setData(prevdata => { return { ...prevdata, [arrayname]: list } })
    }

    //ใช้เพิ่ม input ที่ lv1 และ lv2
    const FirstandSecondInputAdd = (e, arrayname, subarrayname) => {
        e.stopPropagation();
        let list = [...data.[arrayname]];
        let sublist = [...data.[arrayname][0].[subarrayname]]
        const list2 = {};
        const sublist2 = {};
        for (const key in sublist[0]) {
            if (key == "index") {
                sublist2[key] = 1
            } else {
                sublist2[key] = ''
            }
        }
        const sublist2Array = [];
        sublist2Array.push(sublist2)

        for (const key in list[0]) {
            if (key == subarrayname) {
                list2[key] = sublist2Array
            } else if (key == 'amount') {
                list2[key] = 1
            } else {
                list2[key] = ''
            }
        }
        list = [...list, list2]
        console.log(list)
        setData(prevdata => { return { ...prevdata, [arrayname]: list } })
    }

    //ใช้เปลี่ยนค่าที่ lv2
    const handleSecondInputChange = (e, arrayname, subarrayname, index, index2) => {
        if(e.target.validity.valid){
            let list = [...data.[arrayname]];
            let sublist = [...data.[arrayname][index].[subarrayname]]
            const value = e.target.value;
            sublist[index2][e.target.name] = value
            list[index][subarrayname] = sublist
            setData((prevdata => { return { ...prevdata, [arrayname]: list } }))
        }
    }
    //ใช้เพิ่ม input ที่ lv2
    const SecondInputAdd = (e, arrayname, subarrayname, index, index2) => {
        e.stopPropagation();
        let list = [...data.[arrayname]];
        let sublist = [...data.[arrayname][index].[subarrayname]]
        const sublist2 = {};
        for (const key in sublist[0]) {
            if (key == "index") {
                sublist2[key] = index2 + 2
            } else {
                sublist2[key] = ''
            }
        }
        sublist = [...sublist, sublist2]
        list[index]['amount'] = list[index]['amount'] + 1
        list[index][subarrayname] = sublist
        setData(prevdata => { return { ...prevdata, [arrayname]: list } })

    }
    //ใช้ลบ input ที่ lv2
    const SecondInputRemove = (e, arrayname, subarrayname, index, index2) => {
        e.stopPropagation();
        let list = [...data.[arrayname]];
        let sublist = [...data.[arrayname][index].[subarrayname]]
        sublist.splice(index2, 1);
        list[index]['amount'] = list[index]['amount'] - 1
        list[index][subarrayname] = sublist
        setData(prevdata => { return { ...prevdata, [arrayname]: list } })

    }

    //ใช้แสดง/ซ่อนแถวตารางที่เป็น array
    const ToggleTableArray = (e, arrayname, index) => {
        e.stopPropagation();
        const list = [...data.[arrayname]];
        list[index]["hide"] = !data.[arrayname][index].hide
        setData(prevdata => { return { ...prevdata, [arrayname]: list } })
    }

    //ใช้แสดง/ซ่อนแถวตารางที่เป็น object
    const ToggleTableObject = (e,objectname,subobjectname,index) => {
        e.stopPropagation();
        const sublist = [...data.[objectname].[subobjectname]];
        sublist[index]["hide"] = !data.[objectname].[subobjectname][index].hide
        setData(prevdata => { return { ...prevdata, [objectname]: {...data.[objectname], [subobjectname]: sublist} } })
    }

    //ใช้ทำให้กดได้โดยไม่โดน parent ก่อนหน้า
    const handleclick = (e) => {
        e.stopPropagation();
    }

    //ใช้เปลี่ยนค่าตารางแบบ static 
    const tablehandlechange = (e, objectname, subobjectname, index) => {
        const list = { ...data.[objectname] };
        //ถ้ามี index เปลี่ยนค่า array ภายใน subobject
        if(index !== undefined){
            list[subobjectname][index][e.target.name] = e.target.value
        }else if(index === undefined && subobjectname === undefined){
            //ถ้าไม่มี index และ subobject เปลี่ยนค่า subobject
            list[e.target.name]=e.target.value
        }
        //ถ้ามีไม่มี index แต่มี suboject เปลี่ยนค่า object ภายใน subobject
        else{
            list[subobjectname][e.target.name] = e.target.value
        }
        
        //ถ้ามี sumdata ให้คิด
        if(list["sumdata"] !== undefined){
            const sum = calculatesum(objectname);
            list["sumdata"] = sum
        }
        setData(prevdata => { return { ...prevdata, [objectname]: list } })
    }

    //เพิ่มobject มารองรับ
    const addstaticobject = (objectname, subobjectname, number) => {
        let list = { ...data.[objectname] };
        let sublist = [...data.[objectname].[subobjectname]]
        while (sublist.length < number) {
            const sublist2 = {};
            for (const key in sublist[0]) {
                sublist2[key] = ''
            }
            sublist = [...sublist, sublist2]
        }
        list.[subobjectname] = sublist
        setData(prevdata => { return { ...prevdata, [objectname]: list } })
    }

    const addstaticarray = (arrayname, number) => {
        let list = [...data.[arrayname]];
        while (list.length < number) {
            const list2 = {};
            for (const key in list[0]) {
                list2[key] = ''
            }
            list = [...list, list2]
        }
        setData(prevdata => { return { ...prevdata, [arrayname]: list } })
    }

    //เพิ่ม input ที่เป็นตาราง object
    const addobjectarray = (e,objectname, subobjectname,index) => {
        e.stopPropagation();
        let sublist = [...data.[objectname].[subobjectname]];
        const sublist2 = {};
        for (const key in sublist[0]) {
            if (key == "index") {
                sublist2[key] = index + 2
            } else {
                sublist2[key] = ''
            }
        }
        sublist2["hide"] = false
        sublist = [...sublist, sublist2]
        if (index != 0) {
            sublist[index]["hide"] = true
        }
        setData(prevdata => { return { ...prevdata, [objectname]: {...data.[objectname], [subobjectname]: sublist} } })
        settextarea(prevtextarea => !prevtextarea)
    }

    const removeobjectarray = (e,objectname, subobjectname,index) => {
        e.stopPropagation();
        let sublist = [...data.[objectname].[subobjectname]];
        sublist[index - 1]["hide"] = false
        sublist.splice(index,1)
        setData(prevdata => { return { ...prevdata, [objectname]: {...data.[objectname], [subobjectname]: sublist} } })
    }
    //ผลรวมคิดแบบแนวนอน
    const calculatesum = (objectname) =>{
        const rowdata = {...data.[objectname].rowdata}
        let sum = {year1:0,year2:0,year3:0,year4:0,year5:0};
        // for(const test in data.[objectname].sumdata){
        //     console.log("test",test);
        // }
        for(const index in rowdata){
            for(const key in rowdata[index]){
                if(rowdata[index][key]!="" && key.includes("year")){
                    sum[key] += parseFloat(rowdata[index][key])
                }
            }
        }
        return sum
        // setData(prevdata => {return  {...prevdata, [objectname]:{...prevdata.[objectname],sumdata:sum}}})
    }

    const calculatecolsum = (arrayname) =>{
        const coldata = [...data.[arrayname]]
        let sum = 0;
        for(const index in coldata){
            sum = 0;
            for(const key in coldata[index]){
                if(coldata[index][key]!=="" && key.includes("year") && key !== "year"){
                    sum += parseFloat(coldata[index][key])
                }
            }
            coldata[index]["sum"]=sum
        }
    }

    return (
        <div>
            {console.log("render")}
            <br />
            <div className="container clearfix">
                <div className="text-center">
                    <h1>หมวดที่ 1 ข้อมูลทั่วไป</h1>
                </div>
                <br />
                <form onSubmit={handleSumbit}>
                    <div className="form-group">
                        <h2>1. รหัสและชื่อรายวิชา</h2>
                        <div>
                            <input type="text" placeholder="รหัสรายวิชา" className="first" name="program_code" value={data.program_code || ""} onChange={handleInputChange} />
                        </div>
                        <div>
                            <input type="text" placeholder="ชื่อวิชาภาษาไทย" className="first" name="program_thainame" value={data.program_thainame || ""} onChange={handleInputChange} />
                        </div>
                        <div>
                            <input type="text" placeholder="ชื่อวิชาภาษาอังกฤษ" className="first" name="program_engname" value={data.program_engname || ""} onChange={handleInputChange} />
                        </div>
                    </div>
                    <div className="form-group">
                        <h2>2. ชื่อปริญญาและสาขาวิชา</h2>
                        <h3>ภาษาไทย</h3>
                        <div>
                            <input type="text" placeholder="ชื่อเต็ม" className="first" name="full_thai" value={data.full_thai || ""} onChange={handleInputChange} />
                        </div>
                        <div>
                            <input type="text" placeholder="ชื่อย่อ" className="first" name="mini_thai" value={data.mini_thai || ""} onChange={handleInputChange} />
                        </div>
                        <h3>ภาษาอังกฤษ</h3>
                        <div>
                            <input type="text" placeholder="ชื่อเต็ม" className="first" name="full_eng" value={data.full_eng || ""} onChange={handleInputChange} />
                        </div>
                        <div>
                            <input type="text" placeholder="ชื่อย่อ" className="first" name="mini_eng" value={data.mini_eng || ""} onChange={handleInputChange} />
                        </div>
                    </div>
                    <div className="form-group">
                        <h2>3. วิชาเอก</h2>
                        <div>
                            <input type="text" placeholder="ชื่อเต็ม" className="first" name="major" value={data.major || ""} onChange={handleInputChange} />
                        </div>
                    </div>
                    <div className="form-group">
                        <h2>4. จำนวนหน่วยกิต</h2>
                        <div>
                            <input type="text" placeholder="ชื่อเต็ม" pattern="[0-9]*" className="first" name="allcredit" value={data.allcredit || ""} onChange={handleInputChange} />
                        </div>
                    </div>
                    <div className="form-group">
                        <h2>5. รูปแบบของหลักสูตร</h2>
                        <h3>5.1 รูปแบบ</h3>
                        <div>
                            <select style={{ marginLeft: 50 }} name="type_degree" onChange={handleInputChange}>
                                <option value="" defaultValue disabled hidden>เลือกหลักสูตรระดับปริญญา</option>
                                <option value="ปริญญาตรี">ปริญญาตรี</option>
                                <option value="ปริญญาโท">ปริญญาโท</option>
                                <option value="ปริญญาเอก">ปริญญาเอก</option>
                            </select>
                            <input type="text" placeholder="จำนวนปี" pattern="[0-9]*" className="first" name="type_year" value={data.type_year || ""} onChange={handleInputChange} />
                        </div>
                        <h3>5.2 ภาษาที่ใช้</h3>
                        <div>
                            <input type="text" placeholder="ภาษาที่ใช้" className="first" name="language_use" value={data.language_use || ""} onChange={handleInputChange} />
                        </div>
                        <h3>5.3 การรับเข้าศึกษา</h3>
                        <div>
                            <input type="text" placeholder="การรับเข้าศึกษา" className="first" name="howreceive" value={data.howreceive || ""} onChange={handleInputChange} />
                        </div>
                        <h3>5.4 การร่วมมือกับสถาบันอื่น</h3>
                        <div>
                            <input type="text" placeholder="การร่วมมือกับสถาบันอื่น" className="first" name="co_college" value={data.co_college || ""} onChange={handleInputChange} />
                        </div>
                        <h3>5.4 การให้ปริญญาแก่ผู้สำเร็จการศึกษา</h3>
                        <div>
                            <input type="text" placeholder="การให้ปริญญาแก่ผู้สำเร็จการศึกษา" className="first" name="deegree_graduate" value={data.deegree_graduate || ""} onChange={handleInputChange} />
                        </div>
                    </div>
                    <div className="form-group">
                        <h2>6. สถานภาพของหลักสูตรและการพิจารณาอนุมัติ/เห็นชอบหลักสูตร</h2>
                        <div className="mb-3">
                            <select style={{ marginLeft: 50 }} name="program" onChange={handleInputChange}>
                                <option value="" defaultValue disabled hidden>เลือกประเภทหลักสูตร</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                            </select>
                            <input type="text" placeholder="จำนวนปี" pattern="[0-9]*" className="first" name="year" value={data.year || ""} onChange={handleInputChange} />
                        </div>
                        <div>
                            <p style={{ marginLeft: 50 }}>เริ่มใช้ใน<input style={{ width: 110 }} type="text" placeholder="ภาคเรียนที่" pattern="[0-9]*" className="ml-1" name="start_term" value={data.start_term || ""} onChange={handleInputChange} /> ใน <input style={{ width: 110 }} type="text" placeholder="ปีการศึกษา" pattern="[0-9]*" className="ml-1" name="start_year" value={data.start_year || ""} onChange={handleInputChange} /></p>
                        </div>
                        <div>
                            <p style={{ marginLeft: 50 }}>สภาวิชากลางหรือคณะกรรมการวิชาการหรือ<input style={{ width: 110 }} type="text" placeholder="ระบุอื่นๆ" className="ml-1" name="other" value={data.other || ""} onChange={handleInputChange} /> </p>
                        </div>
                        <div>
                            <p style={{ marginLeft: 50 }}>พิจารณาและเห็นชอบให้นำเสนอหลักสูตรต่อสภามหาวิทยาลัย</p>
                        </div>
                        <div>
                            <p style={{ marginLeft: 50 }}>ในการประชุม<input style={{ width: 70 }} type="text" placeholder="ครั้งที่" pattern="[0-9]*" className="ml-1" name="meet_time" value={data.meeting[0].meet_time || ""} onChange={e => handleSamedataChange(e, "meeting", 0)} />/<input style={{ width: 70 }} type="text" placeholder="ปี" pattern="[0-9]*" className="ml-1" name="meet_year" value={data.meeting[0].meet_year || ""} onChange={e => handleSamedataChange(e, "meeting", 0)} /> เมื่อวันที่<input style={{ width: 110 }} type="text" placeholder="วัน/เดือน/ปี" className="ml-1" name="meet_date" value={data.meeting[0].meet_date || ""} onChange={e => handleSamedataChange(e, "meeting", 0)} /></p>
                        </div>
                        <div>
                            <p style={{ marginLeft: 50 }}>สภามหาวิทยาลัยอนุมัติหลักสูตร</p>
                        </div>
                        <div>
                            <p style={{ marginLeft: 50 }}>ในการประชุม<input style={{ width: 70 }} type="text" placeholder="ครั้งที่" pattern="[0-9]*" className="ml-1" name="meet_time" value={data.meeting[1]?.meet_time || ""} onChange={e => handleSamedataChange(e, "meeting", 1)} />/<input style={{ width: 70 }} type="text" placeholder="ปี" pattern="[0-9]*" className="ml-1" name="meet_year" value={data.meeting[1]?.meet_year || ""} onChange={e => handleSamedataChange(e, "meeting", 1)} /> เมื่อวันที่<input style={{ width: 110 }} type="text" placeholder="วัน/เดือน/ปี" className="ml-1" name="meet_date" value={data.meeting[1]?.meet_date || ""} onChange={e => handleSamedataChange(e, "meeting", 1)} /></p>
                        </div>
                    </div>
                    <div className="form-group">
                        <h2>7. ความพร้อมในการเผยแพร่หลักสูตรที่มีคุณภาพและมาตรฐาน</h2>
                        <div>
                            <textarea placeholder="หลักสูตรจะมีความพร้อมในการเผยแพร่หลักสูตรที่มีคุณภาพและมาตรฐาน" className="first" name="readiness" value={data.readiness || ""} onChange={handleInputChange} />
                        </div>
                    </div>
                    <div className="form-group">
                        <h2>8. อาชีพที่สามารถประกอบได้หลังสำเร็จการศึกษา</h2>
                        {data.graduate_job.map((el, index) => {
                            return (
                                <div key={index}>
                                    <input type="text" placeholder="อาชีพที่ประกอบได้หลังสำเร็จการศึกษา" className="first mr-3" name="job" value={el.job || ""} onChange={e => handleFirstInputChange(e, "graduate_job", index)} />
                                    <div className="inline">
                                        {1 !== data.graduate_job.length && index === data.graduate_job.length - 1 ? <button type="submit" className="btn btn-danger mr-3" onClick={(e) => FirstInputRemove(e, "graduate_job", index)} >-</button> : ""}
                                        {index === data.graduate_job.length - 1 ? <button type="submit" className="btn btn-primary " onClick={(e) => FirstInputAdd(e, "graduate_job", index)} >+</button> : ""}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="form-group">
                        <h2>9. ชื่อ, นามสกุล, ตำแหน่งและคุณวุฒิการศึกษาของอาจารย์ผู้รับผิดชอบหลักสูตร</h2>
                        <div>
                            <table className="table table-borderless table-hover">
                                <colgroup>
                                    <col style={{ width: "10%" }} />
                                    <col style={{ width: "40%" }} />
                                    <col style={{ width: "20%" }} />
                                    <col style={{ width: "20%" }} />
                                    <col style={{ width: "5%" }} />
                                    <col style={{ width: "5%" }} />
                                </colgroup>
                                <thead>
                                    <tr>
                                        <th>ลำดับที่</th>
                                        <th>ชื่อ-สกุล และตำแหน่ง</th>
                                        <th>คุณวุฒิการศึกษา</th>
                                        <th>ปีสำเร็จการศึกษา</th>
                                        <th>&nbsp;</th>
                                        <th>&nbsp;</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.program_professor.map((el, index) => (
                                        <React.Fragment key={index}>
                                            <tr onClick={(e) => ToggleTableArray(e, "program_professor", index)}>
                                                <th>{index + 1}</th>
                                                <td><textarea placeholder="ชื่อ-สกุล และตำแหน่ง" className={el.hide ? "mytable hide" : "mytable"} name="name" value={el.name || ""} onChange={e => handleFirstInputChange(e, "program_professor", index)} onClick={e => handleclick(e)} /></td>
                                                <td><textarea placeholder="คุณวุฒิการศึกษา" className={el.hide ? "mytable hide" : "mytable"} name="education" value={el.education || ""} onChange={e => handleFirstInputChange(e, "program_professor", index)} onClick={e => handleclick(e)} /></td>
                                                <td><textarea placeholder="ปีสำเร็จการศึกษา" className={el.hide ? "mytable hide" : "mytable"} name="graduate_year" value={el.graduate_year || ""} onChange={e => handleFirstInputChange(e, "program_professor", index)} onClick={e => handleclick(e)} /></td>
                                                <td>{1 !== data.program_professor.length && index === data.program_professor.length - 1 ? <button type="submit" className="btn btn-danger low" onClick={e => TableInputRemove(e, "program_professor", index)} >-</button> : ""}</td>
                                                <td>{index === data.program_professor.length - 1 ? <button type="submit" className="btn btn-primary low" onClick={e => FirstInputAdd(e, "program_professor", index)} >+</button> : ""}</td>
                                            </tr>
                                        </React.Fragment>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="form-group">
                        <h2>10. สถานที่จัดการเรียนการสอน</h2>
                        <div>
                            <textarea placeholder="สถานที่จัดการเรียนการสอน" className="first" name="location" value={data.location || ""} onChange={handleInputChange} />
                        </div>
                    </div>
                    <div className="form-group">
                        <h2>11. สถานการณ์ภายนอกหรือการพัฒนาที่จำเป็นต้องนำมาพิจารณาในการวางแผนหลักสูตร</h2>
                        <h3>11.1 สถานการณ์หรือการพัฒนาทางเศรษฐกิจ</h3>
                        <div>
                            <textarea placeholder="สถานการณ์หรือการพัฒนาทางเศรษฐกิจ" className="first" name="commer_situation" value={data.commer_situation || ""} onChange={handleInputChange} />
                        </div>
                        <h3>11.2 สถานการณ์หรือการพัฒนาทางสังคมและวัฒนธรรม</h3>
                        <div>
                            <textarea placeholder="สถานการณ์หรือการพัฒนาทางสังคมและวัฒนธรรม" className="first" name="social_situation" value={data.social_situation || ""} onChange={handleInputChange} />
                        </div>
                    </div>
                    <div className="form-group">
                        <h2>12. ผลกระทบจากข้อ 11.1 และ 11.2 ต้องการพัฒนาหลักสูตรและความเกี่ยวข้องกับพันธกิจของสถาบัน</h2>
                        <h3>12.1 การพัฒนาหลักสูตร</h3>
                        <div>
                            <textarea placeholder="การพัฒนาหลักสูตร" className="first" name="program_dev" value={data.program_dev || ""} onChange={handleInputChange} />
                        </div>
                        <h3>12.2 ความเกี่ยวข้องกับพันธกิจของสถาบัน</h3>
                        <div>
                            <textarea placeholder="ความเกี่ยวข้องกับพันธกิจของสถาบัน" className="first" name="concern_institution" value={data.concern_institution || ""} onChange={handleInputChange} />
                        </div>
                    </div>
                    <div className="form-group">
                        <h2>13. ความสัมพันธ์กับหลักสูตรอื่นที่เปิดสอนในคณะ/ภาควิชาอื่นของสถาบัน</h2>
                        <h3>13.1 รายวิชาในหลักสูตรที่เปิดสอนเพื่อให้บริการคณะ/ภาควิชาอื่น</h3>
                        <div>
                            {data.service_subject.map((el, index) => {
                                return (
                                    <React.Fragment key={index}>
                                        <p><input style={{ width: 200 }} type="text" placeholder="หมวด" className="first mr-3" name="group" value={el.group || ""} onChange={e => handleFirstInputChange(e, "service_subject", index)} /><input style={{ width: 80 }} type="text" placeholder="จำนวน" className="ml-3" name="amount" value={el.amount} disabled /> รายวิชา {1 !== data.service_subject.length && index === data.service_subject.length - 1 ? <button type="submit" className="btn btn-danger mr-3" onClick={(e) => FirstInputRemove(e, "service_subject", index)} >-</button> : ""}
                                            {index === data.service_subject.length - 1 ? <button type="submit" className="btn btn-primary " onClick={(e) => FirstandSecondInputAdd(e, "service_subject", "subjectlist")} >+</button> : ""}
                                        </p>
                                        {el.subjectlist.map((el2, index2) => {
                                            return (
                                                <React.Fragment key={index2}>
                                                    <p style={{ marginLeft: 50 }}>ได้แก่ <input style={{ width: 100 }} type="text" placeholder="รหัสวิชา" name="subject_code" value={el2.subject_code || ""} onChange={e => handleSecondInputChange(e, "service_subject", "subjectlist", index, index2)} />
                                                        <input style={{ width: 200 }} type="text" placeholder="ชื่อวิชา" className="ml-2" name="subject_name" value={el2.subject_name || ""} onChange={e => handleSecondInputChange(e, "service_subject", "subjectlist", index, index2)} />
                                                        <input style={{ width: 100 }} type="text" placeholder="หน่วยกิต" pattern="[0-9]*" className="ml-2 mr-3" name="subject_credit" value={el2.subject_credit || ""} onChange={e => handleSecondInputChange(e, "service_subject", "subjectlist", index, index2)} />
                                                        {1 !== data.service_subject[index].subjectlist.length && index2 === data.service_subject[index].subjectlist.length - 1 ? <button type="submit" className="btn btn-danger mr-3" onClick={(e) => SecondInputRemove(e, "service_subject", "subjectlist", index, index2)} >-</button> : ""}
                                                        {index2 === data.service_subject[index].subjectlist.length - 1 ? <button type="submit" className="btn btn-primary " onClick={(e) => SecondInputAdd(e, "service_subject", "subjectlist", index, index2)} >+</button> : ""}
                                                    </p>
                                                </React.Fragment>
                                            );
                                        })}

                                    </React.Fragment>
                                );
                            })}
                        </div>
                        <h3>13.2 รายวิชาในหลักสูตรที่เปิดสอนให้คณะ/ภาควิชาอื่น</h3>
                        <div>
                            {data.open_subject.map((el, index) => {
                                return (
                                    <React.Fragment key={index}>
                                        <p><input style={{ width: 200 }} type="text" placeholder="หมวด" className="first mr-3" name="group" value={el.group || ""} onChange={e => handleFirstInputChange(e, "open_subject", index)} /><input style={{ width: 80 }} type="text" placeholder="จำนวน" className="ml-3" name="amount" value={el.amount} disabled /> รายวิชา {1 !== data.open_subject.length && index === data.open_subject.length - 1 ? <button type="submit" className="btn btn-danger mr-3" onClick={(e) => FirstInputRemove(e, "open_subject", index)} >-</button> : ""}
                                            {index === data.open_subject.length - 1 ? <button type="submit" className="btn btn-primary " onClick={(e) => FirstandSecondInputAdd(e, "open_subject", "subjectlist")} >+</button> : ""}
                                        </p>
                                        {el.subjectlist.map((el2, index2) => {
                                            return (
                                                <React.Fragment key={index2}>
                                                    <p style={{ marginLeft: 100 }}>ได้แก่ <input style={{ width: 100}} type="text" placeholder="รหัสวิชา" name="subject_code" value={el2.subject_code || ""} onChange={e => handleSecondInputChange(e, "open_subject", "subjectlist", index, index2)} />
                                                        <input style={{ width: 200 }} type="text" placeholder="ชื่อวิชา" className="ml-2" name="subject_name" value={el2.subject_name || ""} onChange={e => handleSecondInputChange(e, "open_subject", "subjectlist", index, index2)} />
                                                        <input style={{ width: 100 }} type="text" placeholder="หน่วยกิต" pattern="[0-9]*" className="ml-2 mr-3" name="subject_credit" value={el2.subject_credit || ""} onChange={e => handleSecondInputChange(e, "open_subject", "subjectlist", index, index2)} />
                                                        {1 !== data.open_subject[index].subjectlist.length && index2 === data.open_subject[index].subjectlist.length - 1 ? <button type="submit" className="btn btn-danger mr-3" onClick={(e) => SecondInputRemove(e, "open_subject", "subjectlist", index, index2)} >-</button> : ""}
                                                        {index2 === data.open_subject[index].subjectlist.length - 1 ? <button type="submit" className="btn btn-primary " onClick={(e) => SecondInputAdd(e, "open_subject", "subjectlist", index, index2)} >+</button> : ""}
                                                    </p>
                                                </React.Fragment>
                                            );
                                        })}

                                    </React.Fragment>
                                );
                            })}
                        </div>
                        <h3>13.3 การบริหารจัดการ</h3>
                        <div>
                            <textarea placeholder="การบริหารจัดการ" className="first" name="management" value={data.management || ""} onChange={handleInputChange} />
                        </div>
                    </div>
                </form>
            </div>
            <br />
            <div className="container clearfix">
                <div className="text-center">
                    <h1>หมวดที่ 2 ข้อมูลเฉพาะของหลักสูตร</h1>
                </div>
                <br />
                <form onSubmit={handleSumbit}>
                    <div className="form-group">
                        <h2>1. ปรัชญา ความสำคัญ และวัตถุประสงค์ของหลักสูตร</h2>
                        <h3> 1.1 ปรัญชาของหลักสูตร</h3>
                        <div>
                            <input type="text" placeholder="ปรัญชาของหลักสูตร" className="first" name="philosophy" value={data.philosophy || ""} onChange={handleInputChange} />
                        </div>
                        <h3> 1.2 ความสำคัญของหลักสูตร</h3>
                        <div>
                            <input type="text" placeholder="ความสำคัญของหลักสูตร" className="first" name="importance" value={data.importance || ""} onChange={handleInputChange} />
                        </div>
                        <h3> 1.3 วัตถุประสงค์</h3>
                        <div>
                            <input type="text" placeholder="วัตถุประสงค์" className="first" name="objective" value={data.objective || ""} onChange={handleInputChange} />
                        </div>
                        <h3> 1.4 ผลการเรียนรู้ที่คาดหวังระดับหลักสูตร</h3>
                        <div>
                            {data.PLO.map((el, index) => {
                                return (
                                    <React.Fragment key={index}>
                                        <p style={{ marginLeft: 50 }}>PLO {index + 1}<input type="text" className="first ml-3" name="group" value={el.mainPLO || ""} onChange={e => handleFirstInputChange(e, "PLO", index)} /> {1 !== data.PLO.length && index === data.PLO.length - 1 ? <button type="submit" className="btn btn-danger mr-3" onClick={(e) => FirstInputRemove(e, "PLO", index)} >-</button> : ""}
                                            {index === data.PLO.length - 1 ? <button type="submit" className="btn btn-primary " onClick={(e) => FirstandSecondInputAdd(e, "PLO", "subPLO")} >+</button> : ""}
                                        </p>
                                        {el.subPLO.map((el2, index2) => {
                                            return (
                                                <React.Fragment key={index2}>
                                                    <p style={{ marginLeft: 70 }}>sub PLO {index2 + 1}<input className="ml-3" type="text" name="value" value={el2.value || ""} onChange={e => handleSecondInputChange(e, "PLO", "subPLO", index, index2)} />
                                                        {1 !== data.PLO[index].subPLO.length && index2 === data.PLO[index].subPLO.length - 1 ? <button type="submit" className="btn btn-danger mr-3" onClick={(e) => SecondInputRemove(e, "PLO", "subPLO", index, index2)} >-</button> : ""}
                                                        {index2 === data.PLO[index].subPLO.length - 1 ? <button type="submit" className="btn btn-primary " onClick={(e) => SecondInputAdd(e, "PLO", "subPLO", index, index2)} >+</button> : ""}
                                                    </p>
                                                </React.Fragment>
                                            );
                                        })}

                                    </React.Fragment>
                                );
                            })}
                        </div>
                    </div>
                    <div className="form-group">
                        <h2>2. แผนพัฒนาปรับปรุง</h2>
                        <h3>หลักสูตรนี้จะดำเนินการแล้วเสร็จครบถ้วนในรอบการศึกษา</h3>
                        <div>
                            <table className="table table-borderless table-hover">
                                <colgroup>
                                    <col style={{ width: "10%" }} />
                                    <col style={{ width: "40%" }} />
                                    <col style={{ width: "20%" }} />
                                    <col style={{ width: "20%" }} />
                                    <col style={{ width: "5%" }} />
                                    <col style={{ width: "5%" }} />
                                </colgroup>
                                <thead>
                                    <tr>
                                        <th>ลำดับที่</th>
                                        <th>แผนการพัฒนา/เปลี่ยนแปลง</th>
                                        <th>กลยุทธ์</th>
                                        <th>หลักฐาน/ตัวบ่งชี้</th>
                                        <th>&nbsp;</th>
                                        <th>&nbsp;</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.develop_plan.map((el, index) => (
                                        <React.Fragment key={index}>
                                            <tr onClick={(e) => ToggleTableArray(e, "develop_plan", index)}>
                                                <th>{index + 1}</th>
                                                <td><textarea placeholder="แผนการพัฒนา/เปลี่ยนแปลง" className={el.hide ? "mytable hide" : "mytable"} name="develop_planchange" value={el.develop_planchange || ""} onChange={e => handleFirstInputChange(e, "develop_plan", index)} onClick={e => handleclick(e)} /></td>
                                                <td><textarea placeholder="กลยุทธ์" className={el.hide ? "mytable hide" : "mytable"} name="strategy" value={el.strategy || ""} onChange={e => handleFirstInputChange(e, "develop_plan", index)} onClick={e => handleclick(e)} /></td>
                                                <td><textarea placeholder="หลักฐาน/ตัวบ่งชี้" className={el.hide ? "mytable hide" : "mytable"} name="evidence" value={el.evidence || ""} onChange={e => handleFirstInputChange(e, "develop_plan", index)} onClick={e => handleclick(e)} /></td>
                                                <td>{1 !== data.develop_plan.length && index === data.develop_plan.length - 1 ? <button type="submit" className="btn btn-danger low" onClick={e => TableInputRemove(e, "develop_plan", index)} >-</button> : ""}</td>
                                                <td>{index === data.develop_plan.length - 1 ? <button type="submit" className="btn btn-primary low" onClick={e => FirstInputAdd(e, "develop_plan", index)} >+</button> : ""}</td>
                                            </tr>
                                        </React.Fragment>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </form>
            </div>
            <br />
            <div className="container clearfix">
                <div className="text-center">
                    <h1>หมวดที่ 3 ระบบการจัดการศึกษา การดำเนินการ และโครงสร้างของหลักสูตร</h1>
                </div>
                <br />
                <form onSubmit={handleSumbit}>
                    <div className="form-group">
                        <h2>1. ระบบการจัดการศึกษา</h2>
                        <h3> 1.1 ระบบ</h3>
                        <div>
                            <textarea placeholder="ระบบ" className="first" name="system" value={data.system || ""} onChange={handleInputChange} />
                        </div>
                        <h3> 1.2 การจัดการศึกษาภาคพิเศษฤดูร้อน</h3>
                        <div>
                            <textarea placeholder="การจัดการศึกษาภาคพิเศษฤดูร้อน" className="first" name="summer_study" value={data.summer_study || ""} onChange={handleInputChange} />
                        </div>
                        <h3> 1.3 การเทียบเคียงหน่วยกิตในระบบทวิภาค</h3>
                        <div>
                            <textarea placeholder="การจัดการศึกษาภาคพิเศษฤดูร้อน" className="first" name="summer_study" value={data.summer_study || ""} onChange={handleInputChange} />
                        </div>
                    </div>
                    <div className="form-group">
                        <h2>2. การดําเนินการหลักสูตร</h2>
                        <h3>2.1 วัน – เวลาในการดําเนินการเรียนการสอน</h3>
                        <div>
                            <p style={{ marginLeft: 70 }}>ภาคเรียนการศึกษาที่ 1 <input style={{ width: 200 }} type="text" placeholder="เดือน" pattern="^(0?[1-9]|1[012])$" className="ml-1" name="start" value={data.study_manage[0]?.start || ""} onChange={e => handleSamedataChange(e, "study_manage", 0)} /> ถึง <input style={{ width: 150 }} type="text" placeholder="เดือน" pattern="^(0?[1-9]|1[012])$" name="end" value={data.study_manage[0]?.end || ""} onChange={e => handleSamedataChange(e, "study_manage", 0)} /></p>
                            <p style={{ marginLeft: 70 }}>ภาคเรียนการศึกษาที่ 2 <input style={{ width: 200 }} type="text" placeholder="เดือน" pattern="^(0?[1-9]|1[012])$" className="ml-1" name="start" value={data.study_manage[1]?.start || ""} onChange={e => handleSamedataChange(e, "study_manage", 1)} /> ถึง <input style={{ width: 150 }} type="text" placeholder="เดือน" pattern="^(0?[1-9]|1[012])$" name="end" value={data.study_manage[1]?.end || ""} onChange={e => handleSamedataChange(e, "study_manage", 1)} /></p>
                            <p style={{ marginLeft: 70 }}>ภาคฤดูร้อน <input style={{ width: 200 }} type="text" placeholder="เดือน" pattern="^(0?[1-9]|1[012])$" className="ml-1" name="start" value={data.study_manage[2]?.start || ""} onChange={e => handleSamedataChange(e, "study_manage", 2)} /> ถึง <input style={{ width: 150 }} type="text" placeholder="เดือน" pattern="^(0?[1-9]|1[012])$" name="end" value={data.study_manage[2]?.end || ""} onChange={e => handleSamedataChange(e, "study_manage", 2)} /></p>
                        </div>
                        <h3>2.2 คุณสมบัติของผู้เข้าศึกษา</h3>
                        <div>
                            {data.property_student.map((el, index) => {
                                return (
                                    <div key={index}>
                                        <input type="text" placeholder="คุณสมบัติของผู้เข้าศึกษา" className="first mr-3" name="text" value={el.text || ""} onChange={e => handleFirstInputChange(e, "property_student", index)} />
                                        <div className="inline">
                                            {1 !== data.property_student.length && index === data.property_student.length - 1 ? <button type="submit" className="btn btn-danger mr-3" onClick={(e) => FirstInputRemove(e, "property_student", index)} >-</button> : ""}
                                            {index === data.property_student.length - 1 ? <button type="submit" className="btn btn-primary " onClick={(e) => FirstInputAdd(e, "property_student", index)} >+</button> : ""}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <h3>2.3 ปัญหาของนักศึกษาแรกเข้า</h3>
                        <div>
                            {data.problem_student.map((el, index) => {
                                return (
                                    <div key={index}>
                                        <input type="text" placeholder="คุณสมบัติของผู้เข้าศึกษา" className="first mr-3" name="text" value={el.text || ""} onChange={e => handleFirstInputChange(e, "problem_student", index)} />
                                        <div className="inline">
                                            {1 !== data.problem_student.length && index === data.problem_student.length - 1 ? <button type="submit" className="btn btn-danger mr-3" onClick={(e) => FirstInputRemove(e, "problem_student", index)} >-</button> : ""}
                                            {index === data.problem_student.length - 1 ? <button type="submit" className="btn btn-primary " onClick={(e) => FirstInputAdd(e, "problem_student", index)} >+</button> : ""}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <h3>2.4 กลยุทธ์ในการดำเนินการเพื่อแก้ไขปัญหา</h3>
                        <div>
                            {data.problem_strategy.map((el, index) => {
                                return (
                                    <div key={index}>
                                        <input type="text" placeholder="คุณสมบัติของผู้เข้าศึกษา" className="first mr-3" name="text" value={el.text || ""} onChange={e => handleFirstInputChange(e, "problem_strategy", index)} />
                                        <div className="inline">
                                            {1 !== data.problem_strategy.length && index === data.problem_strategy.length - 1 ? <button type="submit" className="btn btn-danger mr-3" onClick={(e) => FirstInputRemove(e, "problem_strategy", index)} >-</button> : ""}
                                            {index === data.problem_strategy.length - 1 ? <button type="submit" className="btn btn-primary " onClick={(e) => FirstInputAdd(e, "problem_strategy", index)} >+</button> : ""}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <br/>
                        <h3> 2.5 แผนการรับนักศึกษาและผู้สำเร็จการศึกษาในระยะ 5 ปี</h3>
                        <br />
                        <div>
                            <table className="table table-borderless table-hover">
                                <colgroup>
                                    <col style={{ width: "30%" }} />
                                    <col style={{ width: "14%" }} />
                                    <col style={{ width: "14%" }} />
                                    <col style={{ width: "14%" }} />
                                    <col style={{ width: "14%" }} />
                                    <col style={{ width: "14%" }} />
                                </colgroup>
                                <thead>
                                    <tr>
                                        <th style={{ verticalAlign: 'middle', textAlign: 'center', borderBottom: '3px solid #465F87' }} rowSpan="2">ชั้นปีที่</th>
                                        <th style={{ textAlign: 'center', borderBottom: '2px solid #384653', padding: 0 }} colSpan="5">จำนวนนักศึกษาแต่ละปีการศึกษา</th>
                                    </tr>
                                    <tr style={{ borderBottom: '3px solid #465F87' }}>
                                        {data.recruit_plan.length < 5 ? addstaticarray("recruit_plan", 5) :
                                            <>
                                                <th style={{ padding: "7px 12px" }}><input style={{ width: "100%" }} type="text" placeholder="ปี พ.ศ." name="year" value={data.recruit_plan[0]?.year || ""} onChange={e => handleFirstInputChange(e, "recruit_plan", 0)} /></th>
                                                <th style={{ padding: "7px 12px" }}><input style={{ width: "100%" }} type="text" placeholder="ปี พ.ศ." name="year" value={data.recruit_plan[1]?.year || ""} onChange={e => handleFirstInputChange(e, "recruit_plan", 1)} /></th>
                                                <th style={{ padding: "7px 12px" }}><input style={{ width: "100%" }} type="text" placeholder="ปี พ.ศ." name="year" value={data.recruit_plan[2]?.year || ""} onChange={e => handleFirstInputChange(e, "recruit_plan", 2)} /></th>
                                                <th style={{ padding: "7px 12px" }}><input style={{ width: "100%" }} type="text" placeholder="ปี พ.ศ." name="year" value={data.recruit_plan[3]?.year || ""} onChange={e => handleFirstInputChange(e, "recruit_plan", 3)} /></th>
                                                <th style={{ padding: "7px 12px" }}><input style={{ width: "100%" }} type="text" placeholder="ปี พ.ศ." name="year" value={data.recruit_plan[4]?.year || ""} onChange={e => handleFirstInputChange(e, "recruit_plan", 4)} /></th>
                                            </>}
                                    </tr>
                                </thead>
                                <tbody>
                                    {//data.recruit_plan.rowdata.length < 4 ? addstaticobject("recruit_plan", "rowdata", 4) :
                                        data.recruit_plan.map((el, index) => {
                                            if(index<4)
                                                return(
                                                    <React.Fragment key={index}>
                                                        <tr>
                                                            <th style={{ verticalAlign: 'middle', textAlign: 'center' }}>ชั้นปีที่ {index + 1}</th>
                                                            <td><input style={{ width: "100%" }} type="text" name={"year"+ (index+1)} value={data.recruit_plan[0]?.["year"+ (index+1)] || ""} onChange={e => handleFirstInputChange(e, "recruit_plan", 0)} /></td>
                                                            <td><input style={{ width: "100%" }} type="text" name={"year"+ (index+1)} value={data.recruit_plan[1]?.["year"+ (index+1)] || ""} onChange={e => handleFirstInputChange(e, "recruit_plan", 1)} /></td>
                                                            <td><input style={{ width: "100%" }} type="text" name={"year"+ (index+1)} value={data.recruit_plan[2]?.["year"+ (index+1)] || ""} onChange={e => handleFirstInputChange(e, "recruit_plan", 2)} /></td>
                                                            <td><input style={{ width: "100%" }} type="text" name={"year"+ (index+1)} value={data.recruit_plan[3]?.["year"+ (index+1)] || ""} onChange={e => handleFirstInputChange(e, "recruit_plan", 3)} /></td>
                                                            <td><input style={{ width: "100%" }} type="text" name={"year"+ (index+1)} value={data.recruit_plan[4]?.["year"+ (index+1)] || ""} onChange={e => handleFirstInputChange(e, "recruit_plan", 4)} /></td>
                                                        </tr>
                                                    </React.Fragment>
                                                )
                                            })}
                                        </tbody>
                                        <tfoot>
                                    <tr style={{ borderTop: '2px solid #384653',borderBottom: '2px solid #384653' }}>
                                        <th style={{ verticalAlign: 'middle', textAlign: 'center' }}>รวมทั้งหมด</th>
                                        <td><input style={{ width: "100%" }} type="text" name="sum" value={data.recruit_plan[0]?.sum || ""} disabled/></td>
                                        <td><input style={{ width: "100%" }} type="text" name="sum" value={data.recruit_plan[1]?.sum || ""} disabled/></td>
                                        <td><input style={{ width: "100%" }} type="text" name="sum" value={data.recruit_plan[2]?.sum || ""} disabled/></td>
                                        <td><input style={{ width: "100%" }} type="text" name="sum" value={data.recruit_plan[3]?.sum || ""} disabled/></td>
                                        <td><input style={{ width: "100%" }} type="text" name="sum" value={data.recruit_plan[4]?.sum || ""} disabled/></td>
                                    </tr>
                                    <tr>
                                        <th style={{ verticalAlign: 'middle', textAlign: 'center' }}>จำนวนที่คาดว่า<br/>จะสำเร็จการศึกษา</th>
                                        <td><input style={{ width: "100%" }} type="text" name="expect_graduate" value={data.recruit_plan[0]?.expect_graduate || ""} onChange={e => handleFirstInputChange(e, "recruit_plan", 0)}/></td>
                                        <td><input style={{ width: "100%" }} type="text" name="expect_graduate" value={data.recruit_plan[1]?.expect_graduate || ""} onChange={e => handleFirstInputChange(e, "recruit_plan", 1)}/></td>
                                        <td><input style={{ width: "100%" }} type="text" name="expect_graduate" value={data.recruit_plan[2]?.expect_graduate || ""} onChange={e => handleFirstInputChange(e, "recruit_plan", 2)}/></td>
                                        <td><input style={{ width: "100%" }} type="text" name="expect_graduate" value={data.recruit_plan[3]?.expect_graduate || ""} onChange={e => handleFirstInputChange(e, "recruit_plan", 3)}/></td>
                                        <td><input style={{ width: "100%" }} type="text" name="expect_graduate" value={data.recruit_plan[4]?.expect_graduate || ""} onChange={e => handleFirstInputChange(e, "recruit_plan", 4)}/></td>
                                    </tr>
                                    </tfoot>
                            </table>
                        </div>
                        <h3>2.6 งบประมาณตามแผน</h3>
                        <br />
                        <div>
                            <table className="table table-borderless table-hover">
                                <colgroup>
                                    <col style={{ width: "40%" }} />
                                    <col style={{ width: "25%" }} />
                                    <col style={{ width: "25%" }} />
                                    <col style={{ width: "5%" }} />
                                    <col style={{ width: "5%" }} />
                                </colgroup>
                                <thead>
                                    <tr style={{ borderBottom: '3px solid #465F87' }}>
                                        <th>อัตราค่าเล่าเรียน</th>
                                        <th>ภาคการศึกษา</th>
                                        <th>ปีการศึกษา</th>
                                        <th>&nbsp;</th>
                                        <th>&nbsp;</th>                                        
                                    </tr>
                                </thead>
                                <tbody>
                                        {data.budget_plan.rowdata.map((el,index) => (
                                            <React.Fragment key={index}>
                                                <tr>
                                                    <td><textarea style={{ width: "100%" }} name="title" value={el.title || ""} onChange={e => tablehandlechange(e, "budget_plan", "rowdata", index)}/></td>
                                                    <td><input style={{ width: "100%" }} type="text" name="term" value={el.term || ""} onChange={e => tablehandlechange(e, "budget_plan", "rowdata",index)}/></td>
                                                    <td><input style={{ width: "100%" }} type="text" name="year" value={el.year || ""} onChange={e => tablehandlechange(e, "budget_plan", "rowdata",index)}/></td>
                                                    <td>{1 !== data.budget_plan.rowdata.length && index === data.budget_plan.rowdata.length - 1 ? <button type="submit" className="btn btn-danger low" onClick={e => removeobjectarray(e, "budget_plan", "rowdata", index)} >-</button> : ""}</td>
                                                    <td>{index === data.budget_plan.rowdata.length - 1 ? <button type="submit" className="btn btn-primary low" onClick={e => addobjectarray(e, "budget_plan", "rowdata", index)} >+</button> : ""}</td>
                                                </tr>
                                            </React.Fragment>
                                        ))}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td>ค่าใช้จ่ายตลอดหลักสูตรของนักศึกษาโดยประมาณ</td>
                                        <td><input style={{ width: "100%" }} type="text" name="all" value={data.budget_plan.all || ""} onChange={e => tablehandlechange(e, "budget_plan")}/></td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                    <div style={{ marginTop: 20 }}><pre>{JSON.stringify(data, null, 2)}</pre></div>
                </form>
            </div>
            <br />

        </div>
    )
}

export default TQF2


