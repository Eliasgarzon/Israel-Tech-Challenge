import { Alert, Button, CircularProgress, TextField } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useLogin } from "../../hooks/useLogin";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isPending, error } = useLogin();

  const handleSubmit = (event) => {
    event.preventDefault();
    login(email, password);
  };
  return (
    <>
      <h1 style={{ color: "white" }}>Welcome back, </h1>
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
        <div style={{ display: "flex", alignItems: "center" }}>
          <Button type="submit" variant="contained">
            Log in
          </Button>
          {isPending && <CircularProgress sx={{ mx: 2 }} />}
        </div>
        {error && (
          <Alert sx={{ my: 5 }} severity="error">
            {error}
          </Alert>
        )}
        <Link to="/signup" className="navLink" style={{ padding: 0 }}>
          <Button size="small" variant="text">
            Not a user? Sign Up
          </Button>
        </Link>
      </form>
    </>
  );
}
