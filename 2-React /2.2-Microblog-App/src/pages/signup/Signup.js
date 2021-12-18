import { Alert, Button, CircularProgress, TextField } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import UploadImage from "../../components/UploadImage";
import { useSignup } from "../../hooks/useSignup";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailError, setThumbnailError] = useState(null);

  const { error, isPending, signup } = useSignup();

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(email, password, displayName, thumbnail);
  };

  return (
    <>
      <h1 style={{ color: "white" }}>Sign up</h1>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <TextField
          variant="filled"
          required
          label="Email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          value={email}
          sx={{ width: "50%", my: 5 }}
        />
        <TextField
          variant="filled"
          required
          type="password"
          label="Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          value={password}
          sx={{ width: "50%", my: 5 }}
        />
        <TextField
          variant="filled"
          required
          label="Display Name"
          onChange={(e) => {
            setDisplayName(e.target.value.replace(/\s+/g, ""));
          }}
          value={displayName}
          sx={{ width: "50%", my: 5 }}
          error={displayName.length >= 15}
        />

        <UploadImage
          user={null}
          showPreview={true}
          thumbnail={thumbnail}
          setThumbnail={setThumbnail}
          thumbnailError={thumbnailError}
          setThumbnailError={setThumbnailError}
        />

        <div style={{ display: "flex", alignItems: "center" }}>
          <Button type="submit" variant="contained">
            Sign up
          </Button>
          {isPending && <CircularProgress sx={{ mx: 2 }} />}
        </div>

        {error && (
          <Alert sx={{ my: 5 }} severity="error">
            {error}
          </Alert>
        )}
        <Link to="/login" className="navLink" style={{ padding: 0 }}>
          <Button size="small" variant="text">
            Already a user? Log in
          </Button>
        </Link>
      </form>
    </>
  );
}
