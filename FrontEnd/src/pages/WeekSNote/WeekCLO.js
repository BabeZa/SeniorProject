import React, { useState, useContext, useEffect } from 'react';
import './WeekSNote.css'
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import { toast } from "react-toastify";
import { AuthContext, ProfileContext, WeekSNoteContextProvider, WeekSNoteContext } from "../../context/index";
import { useHistory } from 'react-router-dom';
import PostgreAPI from "../../apis/PostgreAPI";
import autosize from 'autosize';
import cancel from './../../assert/icon/cancel.svg'

export default function WeekCLO() {

    const { subjectID, setModalCLOIsOpen, WeekSNoteData, setWeekSNoteData} = useContext(WeekSNoteContext);

    useEffect(() => {
        autosize(document.querySelectorAll('textarea'));
    }, []);

    const handleCLOchange = (e, index) => {
        if (e.target.validity.valid) {
            const list = [...WeekSNoteData.CLO];
            const { name, value } = e.target
            list[index][name] = value
            // console.log("[WeekCLO.ks]"+name+" "+index+" "+value)
            setWeekSNoteData(prevdata => ({ ...prevdata, CLO: list }))
        }

    }
    const handleTab = (e) => {

        if (e.key === 'Tab' && !e.shiftKey) {
          document.execCommand('insertText', false, "\t");
          e.preventDefault();
          return false;
        };
    }

    const updateWeekSNoteCLO = () => {
        PostgreAPI.put('/weeksnote/update-clo/' + subjectID, WeekSNoteData)
          .then((res) => {
            toast.success("Update Successfully!");
            setModalCLOIsOpen(false);
          })
          .catch((error) => {
            console.error(error)
          });
    }


    return (
        <>
            <div className="modal-weeksnote-clo">
            {console.log("[WeekCLO.js] render")}
                <div className="modal-weeksnote-cancel">
                    <img src={cancel} onClick={() => setModalCLOIsOpen(false)} className="modal-weeksnote-cancel-icon cancel-icon-rotate" />
                </div>

                <table className="modal-weeksnote-table ">
                    {/* <colgroup>
                        <col style={{ width: "200px" }} />
                        <col style={{ width: "190px" }} />
                        <col style={{ width: "270px" }} />

                    </colgroup> */}
                    <thead>
                        <tr>
                            <th style={{ width: "200px" }}><h1>CLO</h1></th>
                            <th style={{ width: "190px" }}><h2>จำนวนนักศึกษาที่ผ่านเกณฑ์</h2><h2 style={{ marginBottom: "10px" }}>(นักศึกษาทั้งหมด {WeekSNoteData.no_students || ""} คน)</h2></th>
                            <th style={{ width: "286px" }}><h2>ถ้าผ่านไม่ถึงเกณฑ์ที่กำหนด</h2><h2 style={{ marginBottom: "10px" }}>ปัญหาของวิธีการสอนและการแก้ไขปัญหา</h2></th>
                        </tr>

                    </thead>
                    <tbody>
                        {
                            WeekSNoteData.CLO.map((el, index) =>
                                <tr key={index}>
                                    <td style={{ width: "200px" }}><p>{el.text}</p></td>
                                    <td style={{ width: "190px" }}>
                                        <input style={{fontSize:"14px"}} className="MyInput weeksnote-week-input b" placeholder="จำนวนนักศึกษาที่ผ่าน" pattern="[0-9]*" name="pass" value={el.pass || ""} onChange={e => handleCLOchange(e, index)}></input>
                                        <label style={{ marginLeft: "16px" }} className="weeksnote-week-input c">{WeekSNoteData.no_students && el.pass ? "คิดเป็น " + (el.pass / WeekSNoteData.no_students * 100).toFixed(2) + "%" : ""}</label>
                                    </td>
                                    <td style={{ width: "270px" }}><textarea className="MyTextarea weeksnote-week-textarea d" placeholder="ปัญหาและวิธีการแก้ไข" name="problem" value={el.problem || ""} onChange={e => handleCLOchange(e, index)}  onKeyDown={handleTab}></textarea></td>
                                </tr>
                            )
                        }
                        {/* <tr>
                    <td><p>awdwdwdawdaawdwedawdaw</p></td>
                    <td><input className="MyInput weeksnote-week-input b"></input></td>
                    <td><textarea className="MyTextarea weeksnote-week-textarea d"></textarea></td>
                </tr>

                <tr>
                    <td><p>awdwdwdawdaawdwedawdawdawdawdwaawdawdawd</p></td>
                    <td><input className="MyInput weeksnote-week-input b"></input></td>
                    <td><textarea className="MyTextarea weeksnote-week-textarea d"></textarea></td>
                </tr> */}
                    </tbody>


                </table>
                <div className="modal-weeksnote-save">
                    <button className="modal-weeksnote-save-btn MyButton" onClick={updateWeekSNoteCLO}>บันทึกข้อมูล</button>
                </div>

            </div>
        </>
    )
}