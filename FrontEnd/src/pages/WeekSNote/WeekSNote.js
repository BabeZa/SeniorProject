import React, { useState, useContext, useEffect } from "react";
import "../../components/Head.css";
import "./WeekSNote.css";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import { toast } from "react-toastify";
import {
  AuthContext,
  ProfileContext,
  WeekSNoteContextProvider,
  WeekSNoteContext,
} from "../../context/index";
import { useHistory } from "react-router-dom";
import PostgreAPI from "../../apis/PostgreAPI";
import Bar from "../Professor/002bar";
import WeekSNoteDetail from "./WeekSNoteDetail";
import autosize from "autosize";
import Modal from "react-modal";
import RangeSlider from "react-bootstrap-range-slider";
import ProfessorHead from "../Professor/ProfessorHead";
import { Switch, Route } from "react-router-dom";

function MyWeekSNote() {
  const { t } = useTranslation();
  const history = useHistory();

  const { profile, setProfile } = useContext(ProfileContext);
  const { setSubjectID } = useContext(WeekSNoteContext);
  const { isAuthenticated, loading } = useContext(AuthContext);

  const [numCurrent, setNumCurrent] = useState(1);
  const [numTotal, setNumTotal] = useState(0);
  const [postsPerPage] = useState(5);

  const [courseList, setCourseList] = useState([
    {
      id: "",
      code: "",
      engname: "",
      study_time: "",
    },
  ]);

  const getcourseall = async () => {
    PostgreAPI.get("/weeksnote/getall")
      .then((res) => {
        setCourseList(res.data);
        setNumTotal(res.data.length);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    // if (loading && profile.successful) {
    if (loading) {
      if (isAuthenticated) {
        PostgreAPI.get("/employee/getprofile")
          .then((res) => {
            console.log("[WeekSNote.js] Data: ", res.data);
            setProfile(res.data);

            getcourseall();
          })
          .catch((error) => {
            console.error(error);
          });
        // fetchweeksnote("YrA5waEubMpc2S9wxOkVOwGFtbpCPt");
      } else {
        history.push("/");
      }
    }
  }, [loading, isAuthenticated]);

  const goto = async (ID) => {
    await setSubjectID(ID);
    await history.push("/professor/weeksnote/detail/" + ID);
  };

  const totolPages = Math.ceil(numTotal / postsPerPage);
  const indexOfLastPost = numCurrent * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = courseList.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <>
      <ProfessorHead />
      <div className="container-center">
        <div className="weeksnote-list">
          {currentPosts.map((item) => (
            <div>
              <div
                className="weeksnote-list-item"
                onClick={() => goto(item.id)}
              >
                <div className="weeksnote-list-item-text">
                  <h1>{item.code + " " + item.engname}</h1>
                  <h2>{item.study_time}</h2>
                </div>
                <i className="fas fa-chevron-right"></i>
              </div>
              <hr className="weeksnote-list-line" />
            </div>
          ))}
          <div className="flex-center">
            <div className="flex-row MyPagination2">
              {numCurrent === 1 ? (
                <i className="fal fa-chevron-left disabled"></i>
              ) : (
                <i
                  className="fal fa-chevron-left"
                  onClick={() => setNumCurrent(numCurrent - 1)}
                ></i>
              )}
              <h4>
                {numCurrent}/{totolPages}
              </h4>
              {numCurrent === totolPages ? (
                <i className="fal fa-chevron-right disabled"></i>
              ) : (
                <i
                  className="fal fa-chevron-right"
                  onClick={() => setNumCurrent(numCurrent + 1)}
                ></i>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const WeekSNote = () => <MyWeekSNote />;
export default WeekSNote;
