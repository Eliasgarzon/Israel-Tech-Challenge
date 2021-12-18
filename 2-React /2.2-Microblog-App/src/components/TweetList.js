import { Box } from "@mui/system";
import Tweet from "./Tweet";

export default function TweetList({ data }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        gap: "20px",
      }}
    >
      {data &&
        data.map((tweet) => {
          return <Tweet key={tweet.id} tweet={tweet} />;
        })}
    </Box>
  );
}
