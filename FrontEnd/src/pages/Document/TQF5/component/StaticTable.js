import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import TextareaAutosize from "react-textarea-autosize";

const StaticTable = (props) => {
  const {
    columns,
    datas,
    arrayname,
    onTableChange,
    remain_students,
    no_students,
    paramsClass,
    paramsReadOnly,
  } = props;

  const CustomText = (data) => {
    const { pass, criterion } = data;
    return pass
      ? remain_students
        ? (pass / remain_students) * 100 >= criterion
          ? "มี"
          : "ไม่มี"
        : (pass / no_students) * 100 >= criterion
        ? "มี"
        : "ไม่มี"
      : "";
  };

  return (
    <>
      <table className="document-textarea-table table-borderless table-hover">
        {/* <colgroup>
          <col style={{ width: 339 }} />
          <col style={{ width: 341 }} />
        </colgroup> */}
        <thead>
          <tr style={{ borderBottom: "2px solid #465F87" }}>
            {columns.map((column) => (
              <th
                key={column.name}
                style={{ paddingBottom: 10, whiteSpace: "pre-line" }}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {datas.map((data, index) => (
            <tr key={index}>
              {columns.map((column) => (
                <td key={column.name}>
                  <TextareaAutosize
                    style={{ width: "95%" }}
                    name={column.name}
                    value={_.get(data, column.name) || CustomText(data) || ""}
                    placeholder={column.label}
                    onChange={(e) => onTableChange(e, arrayname, data)}
                    className={paramsClass}
                    readOnly={paramsReadOnly}
                    minRows={2}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

StaticTable.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object),
  datas: PropTypes.arrayOf(PropTypes.object),
  arrayname: PropTypes.string,
};

export default StaticTable;
