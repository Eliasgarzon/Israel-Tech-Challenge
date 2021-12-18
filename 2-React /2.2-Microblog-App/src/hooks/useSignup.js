import { projectAuth, projectStorage } from "../firebase/config";
import { createUserWithEmailAndPassword, updateProfile } from "@firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "@firebase/storage";
import { useEffect, useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useFirestore } from "./useFirestore";

export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();
  const { addDocument } = useFirestore("users");

  const signup = async (email, password, displayName, thumbnail) => {
    setError(null);
    setIsPending(true);
    try {
      if (!thumbnail) {
        throw new Error("Please upload an image");
      }
      const res = await createUserWithEmailAndPassword(
        projectAuth,
        email,
        password
      );

      if (!res) {
        throw new Error("Could not complete signup");
      }
      const uploadPath = `thumbnails/${res.user.uid}/${thumbnail.name}`;
      const imageRef = ref(projectStorage, uploadPath);
      await uploadBytes(imageRef, thumbnail);
      const thumbnailURL = await getDownloadURL(imageRef);
      await updateProfile(res.user, { displayName, photoURL: thumbnailURL });

      dispatch({ type: "LOGIN", payload: res.user });
      addDocument({
        uid: res.user.uid,
        displayName: res.user.displayName,
        email: res.user.email,
        photoURL: res.user.photoURL,
        following: [],
        followers: [],
      });
      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    } catch (err) {
      console.log(err.message);
      if (!isCancelled) {
        setIsPending(false);
        setError(err.message);
      }
    }
  };
  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { error, isPending, signup };
};
