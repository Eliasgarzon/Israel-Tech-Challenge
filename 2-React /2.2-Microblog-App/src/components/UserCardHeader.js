import { Avatar, CardHeader } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router";
import FollowButton from "./FollowButton";

const useStyles = makeStyles((theme) => {
  return {
    tweetHeader: {
      textDecoration: "none",
      "&:hover": {
        backgroundColor: theme.palette.grey[700],
        cursor: "pointer",
      },
    },
  };
});

export default function UserCardHeader({ user, loggedUserId }) {
  const classes = useStyles();
  const navigate = useNavigate();
  const navigateLink = `/profile/${user.uid}`;

  return (
    <CardHeader
      onClick={() => navigate(navigateLink)}
      avatar={<Avatar alt={user.displayName} src={user.photoURL} />}
      className={classes.tweetHeader}
      title={user.displayName}
      sx={{ borderBottom: 1, borderColor: "secondary" }}
      action={
        <>
          {loggedUserId !== user.uid && (
            <FollowButton
              userId={loggedUserId}
              otherUserId={user.uid}
              otherUserFollowers={user.followers}
            />
          )}
        </>
      }
    />
  );
}
