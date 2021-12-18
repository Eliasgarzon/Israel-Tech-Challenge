import { Avatar, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router";

export default function UserAvatar({ user, sx }) {
  const navigate = useNavigate();
  const navigateLink = `/profile/${user.uid}`;
  return (
    <Button
      size="small"
      variant="text"
      sx={{
        display: "flex",
        gap: 1,
        alignItems: "center",
        textTransform: "none",
        ...sx,
      }}
      onClick={() => navigate(navigateLink)}
    >
      <Avatar
        alt={user.displayName}
        src={user.photoURL}
        sx={{ height: "25px", width: "25px" }}
      />
      <Typography variant="subtitle1" component="span" noWrap>
        {user.displayName}
      </Typography>
    </Button>
  );
}
