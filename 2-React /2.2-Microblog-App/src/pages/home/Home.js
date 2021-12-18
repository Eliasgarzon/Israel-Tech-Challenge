import { Alert, Button } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import TweetForm from "../../components/TweetForm";
import TweetList from "../../components/TweetList";
import { useCollection } from "../../hooks/useCollection";
import FilterTweets from "../../components/FilterTweets";

export default function Home() {
  const [tweetFilterCondition, setTweetFilterCondition] = useState(null);
  const [tweetOrderCondition] = useState(["date", "desc"]);
  const {
    documents: data,
    error,
    getMoreDocs,
    docLimitError,
  } = useCollection("tweets", tweetFilterCondition, tweetOrderCondition);

  return (
    <Box
      sx={{ overflow: "scroll", height: "100vh" }}
      onScroll={(e) => {
        if (
          e.target.scrollHeight - e.target.scrollTop ===
            e.target.clientHeight &&
          !docLimitError
        ) {
          getMoreDocs(null);
        }
      }}
    >
      <TweetForm />
      <FilterTweets
        setTweetFilterCondition={setTweetFilterCondition}
        getMoreDocs={getMoreDocs}
      />
      {data && <TweetList data={data} />}
      {docLimitError && <Button variant="text">{docLimitError}</Button>}
      {error && (
        <Alert sx={{ width: "50%", mx: "auto" }} severity="error">
          {error}
        </Alert>
      )}
    </Box>
  );
}
