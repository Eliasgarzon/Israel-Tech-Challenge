import { Alert, Avatar, LinearProgress, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useAuthContext } from "../hooks/useAuthContext";
import { useDocument } from "../hooks/useDocument";
import ListModal from "./ListModal";
import FollowButton from "./FollowButton";

export default function OtherUserProfile({ id }) {
  const { user } = useAuthContext();
  const { document: otherUser, isPending, error } = useDocument("users", id);
  return (
    <>
      {otherUser && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            my: 5,
          }}
        >
          <Avatar
            alt={otherUser.displayName}
            src={otherUser.photoURL}
            sx={{ my: 5 }}
          />
          <Box sx={{ display: "flex", gap: 5 }}>
            <ListModal
              userId={user.uid}
              data={otherUser.followers}
              buttonText={otherUser.followers.length + " Followers"}
              errorMessage={
                otherUser.displayName + " has no followers, show him some love"
              }
            />
            <ListModal
              userId={user.uid}
              data={otherUser.following}
              buttonText={otherUser.following.length + " Following"}
              errorMessage={otherUser.displayName + " is not following anyone"}
            />
          </Box>
          <TextField
            disabled
            variant="filled"
            value={otherUser.displayName}
            sx={{ width: "50%", my: 5 }}
          />

          <FollowButton
            userId={user.uid}
            otherUserId={otherUser.uid}
            otherUserFollowers={otherUser.followers}
          />
        </Box>
      )}
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
    </>
  );
}
