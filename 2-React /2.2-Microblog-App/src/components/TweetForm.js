import { doc } from "@firebase/firestore";
import { Alert, Button, LinearProgress, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { projectDb } from "../firebase/config";
import { useAuthContext } from "../hooks/useAuthContext";
import { useFirestore } from "../hooks/useFirestore";

export default function TweetForm() {
  const { user } = useAuthContext();
  const [content, setContent] = useState("");
  const [isMaxLength, setIsMaxLength] = useState(false);
  const { addDocument, response } = useFirestore("tweets");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const tweet = {
      uid: user.uid,
      createdBy: doc(projectDb, "users", user.uid),
      date: new Date().toISOString(),
      content: content,
      likes: [],
    };
    addDocument(tweet);
  };
  useEffect(() => {
    if (response.success) {
      setContent("");
    }
  }, [response.success]);

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        className="textField"
        error={isMaxLength}
        helperText={
          isMaxLength ? "The chirp can't contain more than 140 chars." : ""
        }
        required
        label="Chirp chirp..."
        onChange={(event) => {
          setContent(event.target.value);
          event.target.value.length === 140
            ? setIsMaxLength(true)
            : setIsMaxLength(false);
        }}
        multiline
        minRows={5}
        value={content}
        sx={{ width: "50%", my: 5 }}
        color={"primary"}
        variant="filled"
        InputProps={{
          endAdornment: (
            <Button
              disabled={response.isPending}
              variant="contained"
              type="submit"
              sx={{ mt: "auto" }}
            >
              Chirp
            </Button>
          ),
        }}
        inputProps={{
          maxLength: 140,
        }}
      />
      {response.error && (
        <Alert severity="warning" sx={{ width: "50%", mx: "auto" }}>
          Tweet was not added to the server
        </Alert>
      )}
      {response.isPending && (
        <LinearProgress sx={{ width: "50%", mx: "auto", mb: 5 }} />
      )}
    </form>
  );
}
