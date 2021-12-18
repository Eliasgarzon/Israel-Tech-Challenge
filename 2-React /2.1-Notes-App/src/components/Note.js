import { IconButton, Paper } from "@mui/material";
import { Box } from "@mui/system";
import DeleteIcon from "@mui/icons-material/Delete";
import ArchiveIcon from "@mui/icons-material/Archive";

export default function Note({
  note,
  deleteNote,
  toggleModal,
  setModalNote,
  archiveNote,
}) {
  return (
    <Paper
      elevation={5}
      sx={{
        display: "inline-flex",
        py: 1,
        px: 2,
        m: 1,
        flexDirection: "column",
        justifyContent: "space-between",
        cursor: "pointer",
        maxWidth: 0.33,
        wordWrap: "break-word",

        gap: 1,
      }}
      onClick={() => {
        toggleModal(true);
        setModalNote(note);
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        {note.noteTitle ? <h2>{note.noteTitle}</h2> : ""}
        <Box sx={{ ml: "auto" }}>
          <IconButton
            sx={{ ml: "auto" }}
            aria-label="delete"
            size="small"
            onClick={(event) => {
              archiveNote(note.id);
              event.stopPropagation();
            }}
          >
            <ArchiveIcon fontSize="inherit" />
          </IconButton>
          <IconButton
            sx={{ ml: "auto" }}
            aria-label="delete"
            size="small"
            onClick={(event) => {
              deleteNote(note.id);
              event.stopPropagation();
            }}
          >
            <DeleteIcon fontSize="inherit" />
          </IconButton>
        </Box>
      </Box>
      <Box sx={{ alignSelf: "flex-start", textAlign: "left" }}>
        {note.noteContent}
      </Box>

      {note.createdDate && (
        <Box sx={{ fontWeight: "light", fontSize: "12px" }}>
          Created on: {note.createdDate}
        </Box>
      )}
      {note.updatedDate && (
        <Box sx={{ fontWeight: "light", fontSize: "12px" }}>
          Updated on: {note.updatedDate}
        </Box>
      )}
    </Paper>
  );
}
