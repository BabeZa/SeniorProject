import React, {
  useState,
  useEffect,
  useRef,
  createRef,
  useContext,
} from "react";
import PostgreAPI from "../../../apis/PostgreAPI";
import "../TQF.css";
import "../Document.css";
import Head from "../../../components/Head";
import moment from "moment";
import autosize from "autosize";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import Delete from "../../../assert/icon/delete.svg";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { TQF3ContextProvider, TQF3Context } from "../../../context/index";
import NotFound from "../../NotFound";
import Chapter1 from "./Chapter1";
import Chapter2 from "./Chapter2";
import Chapter3 from "./Chapter3";
import Chapter4 from "./Chapter4";
import Chapter5 from "./Chapter5";
import Chapter6 from "./Chapter6";
import Chapter7 from "./Chapter7";
import HeadTQF3 from "./HeadTQF3";
import MyDocument from "./TQF3PDF";
import TQF3PDF from "./TQF3PDF";
import TQF3PDFMake from "./TQF3PDFMake";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { debounce } from "../debounce";

function MyTQF3(props) {
  const { t } = useTranslation();
  const history = useHistory();
  const [pageNotFound, setPageNotFound] = useState(false);
  const [clicked, setClicked] = useState(false);
  //-------------------------------------------scrollTo-----------------------------------------------
  const ref = [1, 2, 3, 4, 5, 6, 7];
  const scrollToRef = (ref) =>
    window.scrollTo({ top: ref.current.offsetTop - 90, behavior: "smooth" });
  const myRef = useRef(ref.map(() => createRef()));
  const executeScroll = (num) => {
    scrollToRef(myRef.current[num]);
  };
  //-------------------------------------------End scrollTo-----------------------------------------------

  const {
    data,
    setData,
    setDocId,
    setTQFId,
    canEdit,
    setCanEdit,
    documents,
    setDocuments,
    setMultiinput,
    isEdit2,
    setIsEdit2,
  } = useContext(TQF3Context);

  const fetchSubject = async (tqfid) => {
    PostgreAPI.get("/tqf3/get/" + tqfid)
      .then((res) => {
        console.log("[TQF3.js] tqf3 get: ", res.data);
        setData(res.data);
        autosize.update(document.querySelectorAll("textarea"));
      })
      .catch((error) => {
        console.log("[TQF3.js] tqfid not found!!");
        setPageNotFound(true);
        console.error(error);
      });
  };

  useEffect(() => {
    PostgreAPI.get("/document/get/" + props.tempdocId)
      .then((res) => {
        // console.log("[TQF3.js] document get: ",res.data);
        setDocuments(res.data);
        fetchSubject(res.data.documentdata_id);

        const body = {
          id: res.data.createby,
          tqf3id: res.data.documentdata_id,
        };

        PostgreAPI.post("/permissions/tqf3", body).then((res) => {
          console.log("[TQF3.js] permissions:", res.data);
          if (res.data) {
            // console.log("[TQF3.js] isme: 1");
            setCanEdit(true);
          } else {
            // console.log("[TQF3.js] isme: 0");
            setCanEdit(false);
          }

          // console.log("[TQF3.js] isme: ", res.data);
        });
        // console.log("[TQF3.js] found: ",res);
      })
      .catch((error) => {
        console.log("[TQF3.js] document not found!!");
        setPageNotFound(true);
        console.error(error);
      });

    setDocId(props.tempdocId);
    // console.log("[TQF3.js] id:",props.tempdocId,"/",props.tempTQFId);
  }, []);

  useEffect(() => {
    autosize(document.querySelectorAll("textarea"));
  }, [data]);

  useEffect(() => {
    autosize.update(document.querySelectorAll("textarea"));
  }, [isEdit2]);

  // -------------------------------------------save-------------------------------------------------------
  const handleSumbit = (e) => {
    e.preventDefault();
    if (!clicked) {
      setClicked(true);
      setData({
        ...data,
        UpdateDate: moment().format("DD MMMM YYYY HH:mm:ss"),
      });
      updatetqf3();
      saveDocument();
    }
  };

  const saveDocument = () => {
    try {
      const res = PostgreAPI.put(
        "/document/update/" + props.tempdocId,
        documents
      );
      // toast.success("Update Successfully!");
    } catch (error) {
      console.log(error);
    }
  };

  const updatetqf3 = () => {
    try {
      PostgreAPI.put("/tqf3/update/" + data.id, data)
        .then((res) => {
          toast.success("Update Successfully!");
          fetchSubject(documents.documentdata_id);
          setIsEdit2(false);
          setClicked(false);
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.log(error);
    }
  };
  // -------------------------------------------end save-------------------------------------------------------
  // -------------------------------------------clone-------------------------------------------------------
  const CloneTQF3 = async () => {
    if (window.confirm("Are you sure to clone this document?")) {
      try {
        const res = PostgreAPI.post("/tqf3/clone/" + data.id);
        res.then((result) => {
          console.log("result ", result.data.id);
          // CloneDocument(result.data.id, "TQF3");

          toast.success("Clone a document successfully");
          history.push("/document/tqf3/detail/" + result.data.id);
          window.location.reload();
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  // const CloneDocument = async (ID, type) => {
  //   try {
  //     const body = {
  //       name: "Clone " + documents.name,
  //       createby: "",
  //       createdate: moment().format("DD MMMM YYYY HH:mm:ss"),
  //       documenttype_code: type,
  //       documentstatus_code: "DRAFT",
  //       documentdata_id: ID,
  //       isactive: true,
  //     };
  //     const res = PostgreAPI.post("/document/tqf3", body);
  //     res.then((result) => {
  //       // console.log('result ',result.data.id);
  //       toast.success("Clone a document successfully");
  //       history.push("/document/tqf3/detail/" + result.data.id + "/" + ID);
  //       window.location.reload();
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // -------------------------------------------end clone-------------------------------------------------------
  // ------------------------------------------- Share -------------------------------------------------------
  const ShareURL = () => {
    const el = document.createElement("textarea");
    el.value = window.location.href;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    toast.success("Copy URL Successfully!");
  };
  // -------------------------------------------end Share-------------------------------------------------------
  // ------------------------------------------- Nav Detect -------------------------------------------------------
  const checkvisible = (el) => {
    if (!el) return false;
    let rect = el.getBoundingClientRect();
    let viewheight = Math.max(
      document.documentElement.clientHeight,
      window.innerHeight
    );
    const bottom = 400;
    const top = -470;
    console.log(
      "[TQF3.js] bottom",
      rect.bottom,
      rect.bottom < bottom,
      "top",
      rect.top - viewheight,
      rect.top - viewheight >= top,
      "viewheight",
      viewheight,
      !(rect.bottom < bottom || rect.top - viewheight >= top)
    );
    // console.log("[TQF3.js] rect.top",rect.top,"viewheight",viewheight,"rect.bottom",rect.bottom);
    return !(rect.bottom < bottom || rect.top - viewheight >= top);
  };
  const onScroll = debounce(() => {
    myRef.current.map((el, index) => {
      // console.log("[TQF3.js] ref",index,el.current)
      if (!el) return null;
      checkvisible(el.current)
        ? document.getElementById("nav" + index).classList.add("hasactived")
        : document.getElementById("nav" + index).classList.remove("hasactived");
    });
  }, 100);
  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
  // -------------------------------------------end Nav Detect -------------------------------------------------------
  const goToNote = () => {
    history.push("/professor/weeksnote/detail/" + data.id);
  };

  const Delete = () => {
    if (window.confirm("Do you want to delete this document?")) {
      if (
        window.confirm(
          "Are you sure to delete this document? If you delete this document, other related documents will also be deleted such as WeekNote TQF5"
        )
      ) {
        PostgreAPI.delete("/document/delete/" + props.tempdocId)
          .then(
            (res) => {
              toast.success("Document was deleted!");
              PostgreAPI.delete("/tqf3/delete/" + res.data.documentdata_id)
                .then(
                  (res) => {
                    toast.success("TQF3 was deleted!");
                    toast.success("Week Note was deleted!");
                    history.push("/professor/createdoc");
                  },
                  (error) => {
                    const resMessage = error.toString();
                    toast.error(resMessage);
                  }
                )
                .catch((error) => {
                  toast.error(error);
                  console.error(error);
                });
            },
            (error) => {
              const resMessage = error.toString();
              toast.error(resMessage);
            }
          )
          .catch((error) => {
            toast.error(error);
            console.error(error);
          });
      }
    }
  };

  // .then((res) => {
  //   toast.success(res.data);
  // },(error) => {
  //   const resMessage = error.toString();
  //   toast.error(resMessage);
  // })

  return (
    <>
      {pageNotFound ? (
        <NotFound />
      ) : (
        <>
          <div className="Head">
            <HeadTQF3 />
          </div>

          <div className="sticky-container">
            <div className="absolute-container">
              {canEdit && (
                <div className="save-bar-container">
                  <div className="save-bar">
                    {isEdit2 ? (
                      <>
                        <div
                          className="save-bar-item a"
                          onClick={() => setIsEdit2(false)}
                        >
                          <i className="fal fa-times"></i>
                          <label>Cancel</label>
                        </div>
                        <hr />
                        <div className="save-bar-item a" onClick={handleSumbit}>
                          <i className="fal fa-save"></i>
                          <label>Save</label>
                        </div>
                      </>
                    ) : (
                      <div
                        className="save-bar-item a"
                        onClick={() => setIsEdit2(true)}
                      >
                        <i className="fal fa-edit"></i>
                        <label>Edit</label>
                      </div>
                    )}

                    <hr />
                    <div className="save-bar-item c" onClick={Delete}>
                      <i className="fal fa-trash-alt"></i>
                      <label>Delete</label>
                    </div>

                    <hr />
                    <div className="save-bar-item b" onClick={CloneTQF3}>
                      <i className="fal fa-copy"></i>
                      <label>Clone</label>
                    </div>
                    <hr />
                    <div className="save-bar-item c" onClick={ShareURL}>
                      <i className="fal fa-share-square"></i>
                      <label>Share</label>
                    </div>
                    <hr />
                    <div
                      className="save-bar-item d"
                      onClick={async () => {
                        await TQF3PDFMake(data);
                      }}
                    >
                      <i className="fal fa-file-pdf"></i>
                      <label>Download</label>
                    </div>
                    {data.documentstatus_code != "DRAFT" && (
                      <>
                        <hr />
                        <div className="save-bar-item e" onClick={goToNote}>
                          <i className="fal fa-clipboard"></i>
                          <label>Note</label>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}
              <div className="detail-tqf-chapter">
                <div
                  id="nav0"
                  onClick={() => executeScroll(0)}
                  className="bar-scroll"
                >
                  <span className="first-text">
                    {t("tqf3.chapter1.bartitle")}
                  </span>
                  {/* {console.log("[TQF3.js] getelementbyid",document.getElementById("nav1"))}
                                         {console.log("[TQF3.js] myref",myRef.current[0].current)} */}
                </div>
                <div
                  id="nav1"
                  onClick={() => executeScroll(1)}
                  className="bar-scroll"
                >
                  <span className="first-text">
                    {t("tqf3.chapter2.bartitle")}
                  </span>
                </div>
                <div
                  id="nav2"
                  onClick={() => executeScroll(2)}
                  className="bar-scroll"
                >
                  <span className="first-text">
                    {t("tqf3.chapter3.bartitle")}
                  </span>
                </div>
                <div
                  id="nav3"
                  onClick={() => executeScroll(3)}
                  className="bar-scroll"
                >
                  <span className="first-text">
                    {t("tqf3.chapter4.bartitle")}
                  </span>
                </div>
                <div
                  id="nav4"
                  onClick={() => executeScroll(4)}
                  className="bar-scroll"
                >
                  <span className="first-text">
                    {t("tqf3.chapter5.bartitle")}
                  </span>
                </div>
                <div
                  id="nav5"
                  onClick={() => executeScroll(5)}
                  className="bar-scroll"
                >
                  <span className="first-text">
                    {t("tqf3.chapter6.bartitle")}
                  </span>
                </div>
                <div
                  id="nav6"
                  onClick={() => executeScroll(6)}
                  className="bar-scroll"
                >
                  <span className="first-text">
                    {t("tqf3.chapter7.bartitle")}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="container-center">
            <div className="document-content">
              <div>
                <br />
                <div
                  ref={myRef.current[0]}
                  className="document-chapter-container"
                >
                  <Chapter1 />
                </div>
                <br />
                <div
                  ref={myRef.current[1]}
                  className="document-chapter-container"
                >
                  <Chapter2 />
                </div>
                <br />
                <div
                  ref={myRef.current[2]}
                  className="document-chapter-container"
                >
                  <Chapter3 />
                </div>
                <br />
                <div
                  ref={myRef.current[3]}
                  className="document-chapter-container"
                >
                  <Chapter4 />
                </div>
                <br />
                <div
                  ref={myRef.current[4]}
                  className="document-chapter-container"
                >
                  <Chapter5 />
                </div>
                <br />
                <div
                  ref={myRef.current[5]}
                  className="document-chapter-container"
                >
                  <Chapter6 />
                </div>
                <br />
                <div
                  ref={myRef.current[6]}
                  className="document-chapter-container"
                >
                  <Chapter7 />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

const TQF3 = (props) => (
  <TQF3ContextProvider>
    <MyTQF3 tempdocId={props.match.params.id} />
  </TQF3ContextProvider>
);

export default TQF3;

// const body = {
//     subject_code: res.data.code,
//     subject_thainame: res.data.thainame,
//     subject_engname: res.data.engname,
//     credit: res.data.credit,
//     program: res.data.program,
//     professor: "",
//     termyear: res.data.termyear_code,
//     pre_requi: res.data.pre_requisites_st,
//     co_requi: res.data.co_requisites,
//     place: res.data.place,
//     UpdateDate : res.data.updatedate,
//     outcome: res.data.Outcome,
//     objective: res.data.objective,
//     description: res.data.description,
//     describe: res.data.describe,
//     additionteach: res.data.additionteach,
//     activelearn: res.data.activelearn,
//     selflearn: res.data.selflearn,
//     consulthour: res.data.consulthour,
//     moraldev: res.data.moraldev,
//     moralteach: res.data.moralteach,
//     moralevaluation: res.data.moralevaluation,
//     knowledgeget: res.data.knowledgeget,
//     knowledgeteach: res.data.knowledgeteach,
//     knowledgetvaluation: res.data.knowledgetvaluation,
//     intellecdev: res.data.intellecdev,
//     intellecteach: res.data.intellecteach,
//     intellectevaluation: res.data.intellectevaluation,
//     analydev: res.data.analydev,
//     analyteach: res.data.analyteach,
//     analyevaluation: res.data.analyevaluation,
//     rangeoutcome: res.data.rangeoutcome,
//     rangeteach: res.data.rangeteach,
//     rangeevaluation: res.data.rangeevaluation,
//     Teachplan: res.data.Teachplan,
//     Evaluationplan: res.data.Evaluationplan,
//     book: res.data.book,
//     doc: res.data.doc,
//     addodc: res.data.addodc,
//     effect: res.data.effect,
//     evaluation: res.data.evaluation,
//     improve: res.data.improve,
//     exam: res.data.exam,
//     opeartion: res.data.opeartion
// }
