import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
import AddNote from "./AddNote";

import Noteitem from "./Noteitem";

const Notes = (props) => {
  const context = useContext(noteContext);
  const { notes, getNote, editNote } = context;
  const { showAlert } = props;

  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });

  useEffect(() => {
    getNote();
    // eslint-disable-next-line;
  }, []);
  const refToggle = useRef(null);

  const updateNote = (currNote) => {
    refToggle.current.click();
    setNote({
      id: currNote._id,
      etitle: currNote.title,
      edescription: currNote.description,
      etag: currNote.tag,
    });
  };
  const refClose = useRef(null);
  const handleClick = (e) => {
    e.preventDefault();
    editNote(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click();
    showAlert("success", "Updated successfully");
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <AddNote showAlert={showAlert} />

      <button
        ref={refToggle}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        ...
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    aria-describedby="emailHelp"
                    value={note.etitle}
                    onChange={onChange}
                    autoComplete="off"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    value={note.edescription}
                    onChange={onChange}
                    autoComplete="off"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    value={note.etag}
                    onChange={onChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleClick}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h2>Your notes</h2>
        {notes.map((note) => {
          return (
            <Noteitem
              key={note._id}
              updateNote={updateNote}
              showAlert={showAlert}
              note={note}
            />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
