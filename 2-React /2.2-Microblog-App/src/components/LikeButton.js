import { IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useEffect, useState } from "react";
import { useFirestore } from "../hooks/useFirestore";
import { projectDb } from "../firebase/config";
import { doc } from "@firebase/firestore";

export default function LikeButton({ loggedUserId, tweet }) {
  const [isLiked, setIsliked] = useState(false);

  useEffect(() => {
    (function () {
      tweet.likes.forEach((e) => {
        if (e.id === loggedUserId) {
          setIsliked(true);
        }
      });
    })();
  }, [tweet.likes, loggedUserId]);

  const { updateDocumentArray } = useFirestore("tweets");
  const handleClick = async () => {
    const likedBy = doc(projectDb, "users", loggedUserId);
    if (!isLiked) {
      updateDocumentArray(tweet.id, "likes", {
        type: "PUSH",
        payload: likedBy,
      });
    } else if (isLiked) {
      updateDocumentArray(tweet.id, "likes", {
        type: "FILTER",
        payload: likedBy,
      });
    }
    setIsliked((prev) => !prev);
  };

  return (
    <IconButton aria-label="add to favorites" onClick={handleClick}>
      {tweet.likes.length}
      <FavoriteIcon color={isLiked ? "error" : "default"} />
    </IconButton>
  );
}
