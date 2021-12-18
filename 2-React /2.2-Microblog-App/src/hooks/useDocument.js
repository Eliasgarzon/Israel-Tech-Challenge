import { onSnapshot, doc } from "@firebase/firestore";
import { projectDb } from "../firebase/config";
import { useEffect, useState } from "react";

export const useDocument = (collectionName, docId) => {
  const [document, setDocument] = useState(null);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    setIsPending(true);
    let ref = doc(projectDb, collectionName, docId);
    const unsubscribe = onSnapshot(
      ref,
      (doc) => {
        setDocument(doc.data());
        setError(null);
        setIsPending(false);
      },
      (error) => {
        console.log(error);
        setIsPending("false");
        setError("could not fetch the document");
      }
    );

    return () => unsubscribe();
  }, [collectionName, docId]);

  return { document, error, isPending };
};
