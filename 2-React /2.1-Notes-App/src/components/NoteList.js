import { Box } from "@mui/system";
import Note from "./Note";

export default function NoteList({
  notesList,
  deleteNote,
  toggleModal,
  setModalNote,
  archiveNote,
}) {
  return (
    <Box>
      {Object.keys(notesList).map((note) => {
        return (
          <Note
            key={note}
            note={notesList[note]}
            deleteNote={deleteNote}
            toggleModal={toggleModal}
            setModalNote={setModalNote}
            archiveNote={archiveNote}
          />
        );
      })}
    </Box>
  );
}
