import { useParams } from "react-router";
import OtherUserProfile from "../../components/OtherUserProfile";
import ProfileForm from "../../components/ProfileForm";
import { useAuthContext } from "../../hooks/useAuthContext";
export default function Profile() {
  const { user } = useAuthContext();
  const { id } = useParams();
  return (
    <>
      {(!id || id === user.uid) && <ProfileForm />}
      {id && id !== user.uid && <OtherUserProfile id={id} />}
    </>
  );
}
