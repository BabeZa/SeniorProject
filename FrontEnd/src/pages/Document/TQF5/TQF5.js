import React, { useState, useEffect, useContext } from "react";
import autosize from "autosize";
import Chapter1 from "./Chapter1";
import Chapter2 from "./Chapter2";
import Chapter3 from "./Chapter3";
import Chapter4 from "./Chapter4";
import Chapter5 from "./Chapter5";
import Chapter6 from "./Chapter6";
import HeadTQF5 from "./component/HeadTQF5";
import MenuBar from "./component/MenuBar";
import { TQF5Context, TQF5ContextProvider } from "../../../context/TQF5Context";
import PostgreAPI from "../../../apis/PostgreAPI";
let count = 0;

const MyTQF5 = (props) => {
  const { TQF5data, setTQF5data, setDocId, setDocuments, isEdit } = useContext(
    TQF5Context
  );
  const [pageNotFound, setPageNotFound] = useState(false);
  count++;

  const Grade = () => {
    let allgrade = ["A", "B+", "B", "C+", "C", "D+", "D", "F"];
    let list = allgrade.map((el) => {
      return { grade: el, student_amount: undefined, percent: undefined };
    });
    setTQF5data((prev) => ({ ...prev, student_grade: list }));
  };

  useEffect(() => {
    PostgreAPI.get("/tqf5/getbydocid/" + props.tempdocId)
      .then((res) => {
        console.log("[TQF5.js] document get: ", res.data);
        setDocuments(res.data.document);
        setTQF5data(res.data.tqf5data);
        setTQF5data((prev) => ({ ...prev, autosize: !TQF5data.autosize }));

        // const body = {
        //   id: res.data.createby,
        //   tqf3id: res.data.documentdata_id
        // };

        // PostgreAPI.post("/permissions/tqf3", body)
        // .then((res) => {
        //   console.log("[TQF3.js] permissions:", res.data);
        //   if (res.data) {
        //     // console.log("[TQF3.js] isme: 1");
        //     setCanEdit(true);
        //   } else {
        //     // console.log("[TQF3.js] isme: 0");
        //     setCanEdit(false);
        //   }

        //   // console.log("[TQF3.js] isme: ", res.data);
        // });
        // console.log("[TQF3.js] found: ",res);
      })
      .catch((error) => {
        console.log("[TQF5.js] document not found!!");
        setPageNotFound(true);
        console.error(error);
      });

    setDocId(props.tempdocId);
    // console.log("[TQF3.js] id:",props.tempdocId,"/",props.tempTQFId);
  }, []);

  useEffect(() => {
    Grade();
  }, []);

  // useEffect(() => {
  //   autosize(document.querySelectorAll("textarea"));
  //   autosize.update(document.querySelectorAll("textarea"));
  // }, [TQF5data.autosize, isEdit]);
  return (
    <>
      {/* {console.log("[TQF5.js] count", count)}
      {console.log("[TQF5.js] data", TQF5data)} */}

      <div className="Head">
        <HeadTQF5 />
      </div>
      <MenuBar />
      <div className="container-center">
        <div className="document-content">
          <br />
          {/* หมวดที่1 */}
          <div className="document-chapter-container">
            <Chapter1 />
          </div>
          <br />
          {/* หมวดที่2 */}
          <div className="document-chapter-container">
            <Chapter2 />
          </div>
          <br />
          {/* หมวดที่3 */}
          <div className="document-chapter-container">
            <Chapter3 />
          </div>
          <br />
          {/* หมวดที่4 */}
          <div className="document-chapter-container">
            <Chapter4 />
          </div>
          <br />
          {/* หมวดที่5 */}
          <div className="document-chapter-container">
            <Chapter5 />
          </div>
          <br />
          {/* หมวดที่6 */}
          <div className="document-chapter-container">
            <Chapter6 />
          </div>
          <br />
        </div>
      </div>
    </>
  );
};

const TQF5 = (props) => (
  <TQF5ContextProvider>
    <MyTQF5 tempdocId={props.match.params.id} />
  </TQF5ContextProvider>
);

export default TQF5;
