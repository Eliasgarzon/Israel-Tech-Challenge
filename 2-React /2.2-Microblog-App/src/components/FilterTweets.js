import { doc } from "@firebase/firestore";
import {
  Alert,
  LinearProgress,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { useState } from "react";
import { projectDb } from "../firebase/config";
import { useAuthContext } from "../hooks/useAuthContext";
import { useDocument } from "../hooks/useDocument";

export default function FilterTweets({ setTweetFilterCondition, getMoreDocs }) {
  const { user } = useAuthContext();
  const {
    document: userInfo,
    isPending,
    error,
  } = useDocument("users", user.uid);
  const [selected, setSelected] = useState("ALL");
  let myMap;
  if (userInfo) {
    myMap = {
      ALL: null,
      MY_CHIRPS: ["uid", "==", user.uid],
      MY_LIKED_CHIRPS: [
        "likes",
        "array-contains",
        doc(projectDb, "users", user.uid),
      ],
      FOLLOWING: ["createdBy", "in", userInfo.following],
    };
  }

  const handleChange = (e) => {
    if (e.target.value !== selected) {
      getMoreDocs("reset");
      setTweetFilterCondition(myMap[e.target.value]);
      setSelected(e.target.value);
    }
  };

  return (
    <>
      {userInfo && (
        <ToggleButtonGroup
          value={selected}
          exclusive
          onChange={handleChange}
          sx={{ mb: 5 }}
        >
          <ToggleButton value="ALL">All Chirps</ToggleButton>
          <ToggleButton value="MY_CHIRPS">My Chirps</ToggleButton>
          <ToggleButton value="MY_LIKED_CHIRPS">Liked Chirps</ToggleButton>

          <ToggleButton value="FOLLOWING" disabled={!userInfo.following[0]}>
            Following
          </ToggleButton>
        </ToggleButtonGroup>
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
