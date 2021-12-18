import { useEffect, useState } from "react";
import NoteForm from "./NoteForm";
import NoteList from "./NoteList";
import { Modal } from "@mui/material";
import { Box } from "@mui/system";
import Storage from "../utility/Storage";
import localforage from "localforage";

export default function MainNotes(props) {
  const { isNotes } = props;
  const currentStorage = localforage.createInstance({
    name: props.currentStorage,
  });
  const alternativeStorage = localforage.createInstance({
    name: props.alternativeStorage,
  });

  const storage = new Storage(currentStorage);

  const [notesList, setNotesList] = useState({});
  const [open, setOpen] = useState(false);
  const [modalNote, setModalNote] = useState({});

  useEffect(() => {
    let isMounted = true;
    storage.getAllNotes().then((notes) => {
      if (isMounted) setNotesList(notes);
    });
    return () => {
      isMounted = false;
    };
  });

  const addNote = (newElement) => {
    setNotesList((prevElements) => ({ ...prevElements, ...newElement }));
    storage.saveNote(newElement);
  };

  const updateNote = (note) => {
    setNotesList((prevElements) => {
      const key = Object.keys(note)[0];
      prevElements[key] = note[key];
      return prevElements;
    });
    storage.updateNote(note);
    setOpen(false);
    setModalNote({});
  };

  const deleteNote = (id) => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      setNotesList((prevElements) => {
        const newElements = { ...prevElements };
        delete newElements[id];
        return newElements;
      });
      storage.deleteNote(id);
    }
  };

  const archiveNote = (id) => {
    setNotesList((prevElements) => {
      const newElements = { ...prevElements };
      storage.transferToOtherStorage(
        { [id]: newElements[id] },
        alternativeStorage
      );
      delete newElements[id];
      return newElements;
    });
  };

  const handleClose = () => setOpen(false);
  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "white",
    border: "2px solid #000",
    boxShadow: 24,
    display: "flex",
    justifyContent: "center",
    py: 1,
    px: 2,
  };

  return (
    <div style={{ textAlign: "center" }}>
      {isNotes && <NoteForm submitFunction={addNote} />}
      <NoteList
        notesList={notesList}
        deleteNote={deleteNote}
        toggleModal={setOpen}
        setModalNote={setModalNote}
        archiveNote={archiveNote}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <NoteForm
            submitFunction={updateNote}
            title={modalNote.noteTitle}
            content={modalNote.noteContent}
            date={modalNote.createdDate}
            uniqueId={modalNote.id}
            submitButtonText="Update Note"
          />
        </Box>
      </Modal>
    </div>
  );
}
