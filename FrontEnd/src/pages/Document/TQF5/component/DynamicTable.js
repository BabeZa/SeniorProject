import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import TextareaAutosize from "react-textarea-autosize";

function DynamicTable(props) {
  const {
    columns,
    datas,
    arrayname,
    onTableChange,
    onTableAdd,
    onTableRemove,
    paramsClass,
    paramsReadOnly,
    paramsisEdit,
  } = props;
  const renderCell = (data, column) => {
    if (column.content === "addButton") {
      if (paramsReadOnly) return "";
      return (
        <button
          type="button"
          className="btn-plus mytable"
          onClick={(e) => onTableAdd(e, arrayname, data)}
        >
          <i className="fas fa-plus" />
        </button>
      );
    }

    if (column.content === "removeButton") {
      if (paramsReadOnly) return "";
      return 0 !== datas.indexOf(data) ? (
        <button
          type="button"
          className="btn-minus mytable"
          onClick={(e) => onTableRemove(e, arrayname, data)}
        >
          <i className="fas fa-minus" />
        </button>
      ) : (
        ""
      );
    }

    return (
      <TextareaAutosize
        style={{ width: "95%" }}
        className={paramsClass}
        readOnly={paramsReadOnly}
        name={column.name}
        value={_.get(data, column.name) || ""}
        placeholder={column.label}
        onChange={(e) => onTableChange(e, arrayname, data)}
        minRows={2}
      />
    );
  };
  return (
    <>
      <table className="document-textarea-table table-borderless table-hover">
        {/* <colgroup>
          <col style={{ width: 339 }} />
          <col style={{ width: 341 }} />
          <col style={{ width: 30 }} />
          <col style={{ width: 30 }} />
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
                <td key={column.name}>{renderCell(data, column)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

DynamicTable.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object),
  datas: PropTypes.arrayOf(PropTypes.object),
  arrayname: PropTypes.string,
};

export default DynamicTable;
