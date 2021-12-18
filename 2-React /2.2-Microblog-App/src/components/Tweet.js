import { Alert, AvatarGroup, Card, CircularProgress } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import { useAuthContext } from "../hooks/useAuthContext";
import { Box } from "@mui/system";
import ListModal from "./ListModal";
import { useDocument } from "../hooks/useDocument";
import AvatarGroupItem from "./AvatarGroupItem";
import UserCardHeader from "./UserCardHeader";
import LikeButton from "./LikeButton";

export default function Tweet({ tweet }) {
  const { user } = useAuthContext();
  const {
    document: tweetOwner,
    error,
    isPending,
  } = useDocument("users", tweet.uid);

  const modalButtonDisplay = (
    <AvatarGroup max={4}>
      {tweet.likes.slice(0, 4).map((user) => {
        return <AvatarGroupItem key={user.id} user={user} />;
      })}
      {tweet.likes.slice(4).map((e) => (
        <div key={e} />
      ))}
    </AvatarGroup>
  );

  return (
    <>
      {tweetOwner && (
        <Card
          elevation={5}
          sx={{ width: "50%", mx: "auto", bgcolor: "#343A40" }}
        >
          <UserCardHeader user={tweetOwner} loggedUserId={user.uid} />
          <Box>
            <CardContent>
              <Typography variant="body1" color="text.secondary">
                {tweet.content}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <LikeButton loggedUserId={user.uid} tweet={tweet} />
              <ListModal
                data={tweet.likes}
                buttonText={modalButtonDisplay}
                errorMessage={"No Likes"}
                userId={user.uid}
              />
            </CardActions>
          </Box>
          {isPending && <CircularProgress />}
          {error && (
            <Alert severity="warning">
              Could not retrieve chirp owner info information
            </Alert>
          )}
        </Card>
      )}
    </>
  );
}
