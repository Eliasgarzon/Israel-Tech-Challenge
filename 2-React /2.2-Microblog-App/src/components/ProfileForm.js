import { updateProfile } from "@firebase/auth";
import { doc, updateDoc } from "@firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "@firebase/storage";
import { projectDb, projectStorage } from "../firebase/config";
import {
  Alert,
  Button,
  ButtonGroup,
  CircularProgress,
  FormControlLabel,
  Switch,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import UploadImage from "./UploadImage";
import { Box } from "@mui/system";
import ListModal from "./ListModal";
import { useDocument } from "../hooks/useDocument";

export default function ProfileForm() {
  const { user } = useAuthContext();
  const { document: currentUserProfile } = useDocument("users", user.uid);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentUser, setCurrentUser] = useState(user.displayName);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailError, setThumbnailError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsPending(true);
    const userRef = doc(projectDb, "users", user.uid);
    try {
      let uploadPath, imageRef, thumbnailURL;
      if (thumbnail) {
        uploadPath = `thumbnails/${user.uid}/${thumbnail.name}`;
        imageRef = ref(projectStorage, uploadPath);
        await uploadBytes(imageRef, thumbnail);
        thumbnailURL = await getDownloadURL(imageRef);
      }
      await updateProfile(user, {
        displayName: currentUser,
        photoURL: thumbnailURL || user.photoURL,
      });
      await updateDoc(userRef, {
        displayName: currentUser,
        photoURL: thumbnailURL || user.photoURL,
      });

      setIsPending(false);
      window.location.reload();
    } catch (err) {
      console.log(err);
      setIsPending(false);
      setError("Could not update profile. Please try again.");
    }
  };
  const isFormChanged = currentUser !== user.displayName || thumbnail;
  const handleEditModeExit = () => {
    if (isEditMode && isFormChanged) {
      alert("Please save your changes");
      return;
    }
    setIsEditMode(!isEditMode);
    setThumbnailError(null);
  };
  const handleReset = () => {
    setCurrentUser(user.displayName);
    setThumbnail(null);
    setThumbnailError(null);
  };
  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        my: 5,
      }}
    >
      <FormControlLabel
        sx={{
          display: "block",
          mt: 5,
          color: "white",
        }}
        control={
          <Switch
            checked={isEditMode}
            onChange={handleEditModeExit}
            name="edit"
            color="primary"
          />
        }
        label="Edit"
      />

      <UploadImage
        user={user}
        showPreview={isEditMode}
        thumbnail={thumbnail}
        setThumbnail={setThumbnail}
        thumbnailError={thumbnailError}
        setThumbnailError={setThumbnailError}
      />
      {currentUserProfile && (
        <Box sx={{ display: "flex", gap: 5 }}>
          <ListModal
            userId={user.uid}
            data={currentUserProfile.followers}
            buttonText={currentUserProfile.followers.length + " Followers"}
            errorMessage="No followers...get chirping and win some followers!"
          />
          <ListModal
            userId={user.uid}
            data={currentUserProfile.following}
            buttonText={currentUserProfile.following.length + " Following"}
            errorMessage="Not Following anyone... come on be social!"
          />
        </Box>
      )}
      <TextField
        disabled={!isEditMode}
        variant="filled"
        required
        label="Display Name"
        sx={{ width: "50%", my: 5 }}
        onChange={(e) => setCurrentUser(e.target.value.replace(/\s+/g, ""))}
        onKeyDown={(e) => {
          if (e.key === " ") {
            setError("Display name cannot contain spaces!");
          }
          if (e.key !== " ") {
            setError(null);
          }
        }}
        value={currentUser}
      />

      {isEditMode && (
        <ButtonGroup>
          <Button
            disabled={isPending || !isFormChanged}
            variant="contained"
            type="submit"
          >
            SAVE
          </Button>
          <Button
            disabled={isPending || !isFormChanged}
            variant="outlined"
            onClick={handleReset}
          >
            RESET
          </Button>
          {isPending && <CircularProgress />}
        </ButtonGroup>
      )}

      {error && (
        <Alert sx={{ my: 5 }} severity="error">
          {error}
        </Alert>
      )}
    </form>
  );
}
