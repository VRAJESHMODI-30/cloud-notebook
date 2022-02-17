import React from "react";

function Alert(props) {
  const capitalize = (word) => {
    if (word === "danger") {
      word = "error";
    }
    const str = word.toLowerCase();
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    //Note:-
    //"props.alert &&" is important because our alert initial 'useState' is 'null'
    //Logic:- if props.alert is null or false it'll not move/process furthur which are "alert css" which is written below
    <>
      <div style={{ height: "2rem" }}>
        {props.alert && (
          <div
            className={`alert alert-${props.alert.type} alert-dismissible fade show`}
            role="alert"
          >
            <strong>{capitalize(props.alert.type)}</strong>: {props.alert.msg}
          </div>
        )}
      </div>
    </>
  );
}

export default Alert;
