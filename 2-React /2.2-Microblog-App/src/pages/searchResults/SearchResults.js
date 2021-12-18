import { useParams } from "react-router";
import ChirpResults from "./ChirpResults";
import UserResults from "./UserResults";

export default function SearchResults() {
  const { searchFilter, searchInput } = useParams();
  return (
    <>
      {searchFilter === "chirps" && <ChirpResults searchInput={searchInput} />}
      {searchFilter === "users" && <UserResults searchInput={searchInput} />}
    </>
  );
}
