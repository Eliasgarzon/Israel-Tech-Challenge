import { Avatar, CircularProgress, Typography } from "@mui/material";
import { useDocument } from "../hooks/useDocument";

export default function AvatarGroupItem({ user }) {
  const {
    document: userProfile,
    isPending,
    error,
  } = useDocument("users", user.id);
  return (
    <>
      {userProfile && (
        <Avatar alt={userProfile.displayName} src={userProfile.photoURL} />
      )}
      {isPending && <CircularProgress />}
      {error && <Typography variant="button"> Pictures not found!</Typography>}
    </>
  );
}
