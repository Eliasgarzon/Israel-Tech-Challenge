import { Alert, Card, CircularProgress } from "@mui/material";
import { useDocument } from "../hooks/useDocument";
import UserCardHeader from "./UserCardHeader";

export default function UserProfile({ otherUser, userId }) {
  const {
    document: otherUserInfo,
    isPending,
    error,
  } = useDocument("users", otherUser.id);

  return (
    <>
      <Card
        elevation={5}
        sx={{ width: "50%", mx: "auto", bgcolor: "#343A40" }}
        key={otherUser.id}
      >
        {otherUserInfo && (
          <UserCardHeader user={otherUserInfo} loggedUserId={userId} />
        )}
        {isPending && <CircularProgress />}
        {error && (
          <Alert severity="warning">Cannot retrieve this users data</Alert>
        )}
      </Card>
    </>
  );
}
