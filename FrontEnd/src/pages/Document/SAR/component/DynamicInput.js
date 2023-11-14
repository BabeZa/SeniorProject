import React from "react";

const DynamicInput = ({ datas, onChange, onAdd, onRemove }) => {
  const { data, name, arrayname, placeholder } = datas;
  return (
    <>
      {data.map((el, index) => (
        <div style={{ display: "flex" }}>
          <p>{index + 1}</p>
          <input
            type="text"
            className="document-input MyInput input-bordered ww-5"
            name={name}
            placeholder={placeholder}
            value={el[name]}
            onChange={(e) => onChange(e, arrayname, el)}
          />
          <button type="button" onClick={(e) => onAdd(e, arrayname, el)}>
            <i className="fas fa-plus" />
          </button>
          {0 !== index && (
            <button type="button" onClick={(e) => onRemove(e, arrayname, el)}>
              <i className="fas fa-minus" />
            </button>
          )}
        </div>
      ))}
    </>
  );
};

export default DynamicInput;
