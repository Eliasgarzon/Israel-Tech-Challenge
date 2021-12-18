import { Alert, Button, LinearProgress } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import TweetList from "../../components/TweetList";
import { useCollection } from "../../hooks/useCollection";

export default function ChirpResults({ searchInput }) {
  const [filterCondition] = useState(["content", "==", searchInput]);
  const [orderCondition] = useState(["date", "desc"]);
  const {
    documents: data,
    error,
    isPending,
  } = useCollection("tweets", filterCondition, orderCondition);

  return (
    <Box sx={{ overflow: "scroll", height: "100vh", mt: 5 }}>
      {data && <TweetList data={data} />}

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
