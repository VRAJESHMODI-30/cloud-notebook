import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const s1 = {
    name: "Vrajesh Modi",
    age: "20",
  };
  const [state, setState] = useState(s1);
  const update = () => {
    setTimeout(() => {
      setState({ name: "Jethala Gada", age: "50" });
    }, 1500);
  };
  return (
    <NoteContext.Provider value={{ state, update }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
