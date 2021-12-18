import { Button, Paper, TextField } from "@mui/material";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function NoteForm({
  submitFunction,
  content,
  title,
  date,
  uniqueId,
  submitButtonText,
}) {
  const id = uniqueId || uuidv4();
  const createdDate = uniqueId ? date : new Date().toDateString();
  const updatedDate = uniqueId ? new Date().toDateString() : "";
  const [noteContent, setNoteContent] = useState(content || "");
  const [noteTitle, setNoteTitle] = useState(title || "");
  const resetForm = () => {
    setNoteContent("");
    setNoteTitle("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const note = {
      [id]: {
        id: id,
        noteTitle: noteTitle,
        noteContent: noteContent,
        createdDate: createdDate,
        updatedDate: updatedDate,
      },
    };
    submitFunction(note);
    resetForm();
  };
  const formStyle = uniqueId
    ? {}
    : {
        width: 0.4,
        py: 2,
        px: 4,
        my: 4,
        mx: "auto",
      };
  return (
    <Paper className="noteForm" elevation={5} sx={formStyle}>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          multiline
          minRows={1}
          fullWidth
          sx={{ mb: 1 }}
          onChange={(e) => setNoteTitle(e.target.value)}
          value={noteTitle}
        ></TextField>
        <TextField
          label="Your note..."
          multiline
          minRows={8}
          fullWidth
          sx={{ mb: 1 }}
          onChange={(e) => setNoteContent(e.target.value)}
          value={noteContent}
          required
        ></TextField>
        <Button variant="outlined" color="info" sx={{ width: 1 }} type="submit">
          {submitButtonText || "Add Note"}
        </Button>
      </form>
    </Paper>
  );
}
