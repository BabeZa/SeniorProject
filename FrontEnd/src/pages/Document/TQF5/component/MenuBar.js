import React, { useState, useContext, useEffect } from "react";
import { TQF5Context } from "../../../../context/TQF5Context";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import PostgreAPI from "../../../../apis/PostgreAPI";

export default function MenuBar() {
  const { t } = useTranslation();
  const history = useHistory();
  const {
    TQF5data,
    documents,
    setDocuments,
    isEdit,
    canEdit,
    setIsEdit,
  } = useContext(TQF5Context);

  // -------------------------------------------save-------------------------------------------------------
  const handleSumbit = (e) => {
    e.preventDefault();
    updatetqf5();
    saveDocument();
  };

  const saveDocument = () => {
    try {
      const res = PostgreAPI.put("/document/update/" + documents.id, documents);
      toast.success("Update Successfully!");
      setIsEdit(false);
    } catch (error) {
      console.log(error);
    }
  };

  const updatetqf5 = () => {
    try {
      PostgreAPI.put("/tqf5/update/" + TQF5data.id, TQF5data)
        .then((res) => {
          toast.success("Update Successfully!");
          // fetchSubject(documents.documentdata_id);
          setIsEdit(false);
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.log(error);
    }
  };
  // -------------------------------------------end save-------------------------------------------------------

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
  // -------------------------------------------Delete-------------------------------------------------------
  const Delete = () => {
    if (window.confirm("Do you want to delete this document?")) {
      if (window.confirm("Are you sure to delete this document?")) {
        PostgreAPI.delete("/document/delete/" + documents.id)
          .then(
            (res) => {
              toast.success("Document was deleted!");
              PostgreAPI.delete("/tqf5/delete/" + TQF5data.id)
                .then(
                  (res) => {
                    toast.success("TQF5 was deleted!");
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
  // -------------------------------------------end Delete-------------------------------------------------------
  // -------------------------------------------clone-------------------------------------------------------
  const CloneTQF5 = async () => {
    if (window.confirm("Are you sure to clone this document?")) {
      try {
        const res = PostgreAPI.post("/tqf5/clone/" + TQF5data.id);
        res.then((result) => {
          console.log("result ", result.data.id);
          // CloneDocument(result.data.id, "TQF3");

          toast.success("Clone a document successfully");
          history.push("/document/tqf5/detail/" + result.data.id);
          window.location.reload();
        });
      } catch (error) {
        console.log(error);
      }
    }
  };
  // -------------------------------------------end clone-------------------------------------------------------

  return (
    <>
      <div className="sticky-container">
        <div className="absolute-container">
          {canEdit && (
            <div className="save-bar-container">
              <div className="save-bar">
                {isEdit ? (
                  <>
                    <div
                      className="save-bar-item a"
                      onClick={() => setIsEdit(false)}
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
                    onClick={() => setIsEdit(true)}
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
                <div className="save-bar-item b" onClick={CloneTQF5}>
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
                  // onClick={async () => {
                  //   await TQF3PDFMake(data);
                  // }}
                >
                  <i className="fal fa-file-pdf"></i>
                  <label>Download</label>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
