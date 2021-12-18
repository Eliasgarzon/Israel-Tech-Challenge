import { Alert, Button, LinearProgress } from "@mui/material";
import { Box } from "@mui/system";
import { useCollection } from "../../hooks/useCollection";
import { useState } from "react";
import UserProfile from "../../components/UserProfile";
import { useAuthContext } from "../../hooks/useAuthContext";

export default function UserResults({ searchInput }) {
  const { user } = useAuthContext();
  const [filterCondition] = useState(["displayName", "==", searchInput]);
  const {
    documents: data,
    error,
    isPending,
  } = useCollection("users", filterCondition, null);

  return (
    <Box
      sx={{
        overflow: "scroll",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: 5,
      }}
    >
      {data &&
        data.map((otherUser) => {
          return (
            <UserProfile
              key={otherUser.id}
              otherUser={otherUser}
              userId={user.uid}
            />
          );
        })}

      <Button variant="text">Search results will only show 10</Button>
      {isPending && (
        <LinearProgress
          color="warning"
          sx={{ width: "50%", mx: "auto", my: 1 }}
        />
      )}
      {error && (
        <Alert sx={{ width: "50%", mx: "auto" }} severity="error">
          {error}
        </Alert>
      )}
    </Box>
  );
}
