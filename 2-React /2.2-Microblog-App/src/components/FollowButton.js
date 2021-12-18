import { doc } from "@firebase/firestore";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { projectDb } from "../firebase/config";
import { useFirestore } from "../hooks/useFirestore";

export default function FollowButton({
  userId,
  otherUserId,
  otherUserFollowers,
}) {
  const [isFollowing, setIsFollowing] = useState(false);
  const { updateDocumentArray } = useFirestore("users");

  useEffect(() => {
    (function () {
      otherUserFollowers.forEach((follower) => {
        if (follower.id === userId) {
          setIsFollowing(true);
        } else {
          setIsFollowing(false);
        }
      });
    })();
  }, [otherUserFollowers, userId]);

  const handleFollow = async (e) => {
    e.stopPropagation();
    const follower = doc(projectDb, "users", userId);
    const followed = doc(projectDb, "users", otherUserId);

    if (!isFollowing) {
      updateDocumentArray(userId, "following", {
        type: "PUSH",
        payload: followed,
      });
      updateDocumentArray(otherUserId, "followers", {
        type: "PUSH",
        payload: follower,
      });
    } else if (isFollowing) {
      updateDocumentArray(userId, "following", {
        type: "FILTER",
        payload: followed,
      });
      updateDocumentArray(otherUserId, "followers", {
        type: "FILTER",
        payload: follower,
      });
    }
    setIsFollowing((prev) => !prev);
  };
  return (
    <Button
      variant={isFollowing ? "contained" : "outlined"}
      onClick={handleFollow}
    >
      {isFollowing ? "Unfollow" : "Follow"}
    </Button>
  );
}
